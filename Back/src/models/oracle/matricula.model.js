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
              c.ID_CURSO, c.TITULO AS CURSO, c.NIVEL, c.PRECIO,
              cat.NOMBRE AS CATEGORIA
       FROM MATRICULA m
       JOIN CURSO c       ON m.ID_CURSO = c.ID_CURSO
       JOIN CATEGORIA cat ON c.ID_CATEGORIA = cat.ID_CATEGORIA
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

const findAll = async () => {
  const conn = await getConnection();
  try {
    const result = await conn.execute(
      `SELECT ID_MATRICULA, FECHA_MATRICULA, ESTADO, ALUMNO, EMAIL, CURSO
       FROM VW_MATRICULAS ORDER BY FECHA_MATRICULA DESC`,
      {},
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    return result.rows;
  } finally {
    await conn.close();
  }
};

const findById = async (id) => {
  const conn = await getConnection();
  try {
    const result = await conn.execute(
      `SELECT ID_MATRICULA, ID_ALUMNO, ID_CURSO, FECHA_MATRICULA, ESTADO
       FROM MATRICULA WHERE ID_MATRICULA = :id`,
      { id },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    return result.rows[0] || null;
  } finally {
    await conn.close();
  }
};

const updateEstado = async (id, estado) => {
  const conn = await getConnection();
  try {
    const result = await conn.execute(
      `UPDATE MATRICULA SET ESTADO = :estado WHERE ID_MATRICULA = :id`,
      { estado, id },
      { autoCommit: true }
    );
    return result.rowsAffected;
  } finally {
    await conn.close();
  }
};

const remove = async (id) => {
  const conn = await getConnection();
  try {
    const result = await conn.execute(
      `DELETE FROM MATRICULA WHERE ID_MATRICULA = :id`,
      { id },
      { autoCommit: true }
    );
    return result.rowsAffected;
  } finally {
    await conn.close();
  }
};

module.exports = { create, findByAlumno, findAll, findById, updateEstado, remove };
