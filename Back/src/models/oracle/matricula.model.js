const oracledb = require('oracledb');
const { getConnection } = require('../../config/oracle');

const create = async ({ idAlumno, idCurso }) => {
  const conn = await getConnection();
  try {
    const result = await conn.execute(
      `INSERT INTO MATRICULA (ID_MATRICULA, ID_ALUMNO, ID_CURSO)
       VALUES (SEQ_MATRICULA.NEXTVAL, :idAlumno, :idCurso)
       RETURNING ID_MATRICULA INTO :id`,
      {
        idAlumno,
        idCurso,
        id: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
      },
      { autoCommit: true }
    );
    return result.outBinds.id[0];
  } finally {
    await conn.close();
  }
};

const findByAlumno = async (idAlumno) => {
  const conn = await getConnection();
  try {
    const result = await conn.execute(
      `SELECT m.ID_MATRICULA, m.FECHA_MATRICULA, m.ESTADO,
              c.ID_CURSO, c.TITULO AS CURSO, c.NIVEL, c.PRECIO
       FROM MATRICULA m
       JOIN CURSO c ON m.ID_CURSO = c.ID_CURSO
       WHERE m.ID_ALUMNO = :idAlumno
       ORDER BY m.FECHA_MATRICULA DESC`,
      { idAlumno },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    return result.rows;
  } finally {
    await conn.close();
  }
};

module.exports = { create, findByAlumno };
