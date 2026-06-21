const oracledb = require('oracledb');
const { getConnection } = require('../../config/oracle');

const findByAlumno = async (idAlumno) => {
  const conn = await getConnection();
  try {
    const result = await conn.execute(
      `SELECT ID_SUSCRIPCION, PLAN, MONTO, FECHA_INICIO, FECHA_FIN, ESTADO
       FROM SUSCRIPCION WHERE ID_ALUMNO = :idAlumno
       ORDER BY FECHA_INICIO DESC`,
      { idAlumno },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    return result.rows;
  } finally {
    await conn.close();
  }
};

const findActivas = async () => {
  const conn = await getConnection();
  try {
    const result = await conn.execute(
      `SELECT ID_SUSCRIPCION, ALUMNO, EMAIL, PLAN, MONTO, FECHA_INICIO, FECHA_FIN, ESTADO
       FROM VW_SUSCRIPCIONES_ACTIVAS`,
      {},
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    return result.rows;
  } finally {
    await conn.close();
  }
};

module.exports = { findByAlumno, findActivas };
