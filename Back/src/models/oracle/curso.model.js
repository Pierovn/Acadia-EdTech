const oracledb = require('oracledb');
const { getConnection } = require('../../config/oracle');

const findAll = async () => {
  const conn = await getConnection();
  try {
    const result = await conn.execute(
      `SELECT ID_CURSO, TITULO, DESCRIPCION, PRECIO, DURACION_HORAS, NIVEL,
              ACTIVO, CATEGORIA, INSTRUCTOR
       FROM VW_CATALOGO_CURSOS WHERE ACTIVO = 1`,
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
      `SELECT ID_CURSO, TITULO, DESCRIPCION, PRECIO, DURACION_HORAS, NIVEL,
              ACTIVO, CATEGORIA, INSTRUCTOR
       FROM VW_CATALOGO_CURSOS WHERE ID_CURSO = :id`,
      { id },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    return result.rows[0] || null;
  } finally {
    await conn.close();
  }
};

const findLeccionesByCurso = async (idCurso) => {
  const conn = await getConnection();
  try {
    const result = await conn.execute(
      `SELECT ID_LECCION, TITULO, DESCRIPCION, ORDEN, DURACION_MIN
       FROM LECCION WHERE ID_CURSO = :idCurso ORDER BY ORDEN`,
      { idCurso },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    return result.rows;
  } finally {
    await conn.close();
  }
};

module.exports = { findAll, findById, findLeccionesByCurso };
