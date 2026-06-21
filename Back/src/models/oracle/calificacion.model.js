const oracledb = require('oracledb');
const { getConnection } = require('../../config/oracle');

const findByAlumno = async (idAlumno) => {
  const conn = await getConnection();
  try {
    const result = await conn.execute(
      `SELECT cal.ID_CALIFICACION, cal.NOTA, cal.COMENTARIO, cal.FECHA,
              c.TITULO AS CURSO,
              CASE
                WHEN cal.NOTA >= 18 THEN 'EXCELENTE'
                WHEN cal.NOTA >= 14 THEN 'APROBADO'
                WHEN cal.NOTA >= 11 THEN 'EN RIESGO'
                ELSE 'DESAPROBADO'
              END AS RENDIMIENTO
       FROM CALIFICACION cal
       JOIN MATRICULA m ON cal.ID_MATRICULA = m.ID_MATRICULA
       JOIN CURSO c     ON m.ID_CURSO = c.ID_CURSO
       WHERE m.ID_ALUMNO = :idAlumno
       ORDER BY cal.FECHA DESC`,
      { idAlumno },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    return result.rows;
  } finally {
    await conn.close();
  }
};

const create = async ({ idMatricula, nota, comentario }) => {
  const conn = await getConnection();
  try {
    const result = await conn.execute(
      `INSERT INTO CALIFICACION (ID_CALIFICACION, ID_MATRICULA, NOTA, COMENTARIO)
       VALUES (SEQ_CALIFICACION.NEXTVAL, :idMatricula, :nota, :comentario)
       RETURNING ID_CALIFICACION INTO :id`,
      {
        idMatricula,
        nota,
        comentario: comentario || null,
        id: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
      },
      { autoCommit: true }
    );
    return result.outBinds.id[0];
  } finally {
    await conn.close();
  }
};

module.exports = { findByAlumno, create };
