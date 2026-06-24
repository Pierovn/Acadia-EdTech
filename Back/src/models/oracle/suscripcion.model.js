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

const findById = async (id) => {
  const conn = await getConnection();
  try {
    const result = await conn.execute(
      `SELECT ID_SUSCRIPCION, ID_ALUMNO, PLAN, MONTO, FECHA_INICIO, FECHA_FIN, ESTADO
       FROM SUSCRIPCION WHERE ID_SUSCRIPCION = :id`,
      { id },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    return result.rows[0] || null;
  } finally {
    await conn.close();
  }
};

const create = async ({ idAlumno, plan, monto }) => {
  const conn = await getConnection();
  try {
    const result = await conn.execute(
      `INSERT INTO SUSCRIPCION (ID_SUSCRIPCION, ID_ALUMNO, PLAN, MONTO, FECHA_FIN, ESTADO)
       VALUES (SEQ_SUSCRIPCION.NEXTVAL, :idAlumno, :plan, :monto,
               CASE :plan
                 WHEN 'MENSUAL' THEN ADD_MONTHS(SYSDATE, 1)
                 WHEN 'ANUAL'   THEN ADD_MONTHS(SYSDATE, 12)
                 ELSE NULL
               END,
               'ACTIVO')
       RETURNING ID_SUSCRIPCION INTO :id`,
      {
        idAlumno,
        plan,
        monto,
        id: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
      },
      { autoCommit: true }
    );
    return result.outBinds.id[0];
  } finally {
    await conn.close();
  }
};

const updateEstado = async (id, estado) => {
  const conn = await getConnection();
  try {
    const result = await conn.execute(
      `UPDATE SUSCRIPCION SET ESTADO = :estado WHERE ID_SUSCRIPCION = :id`,
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
      `DELETE FROM SUSCRIPCION WHERE ID_SUSCRIPCION = :id`,
      { id },
      { autoCommit: true }
    );
    return result.rowsAffected;
  } finally {
    await conn.close();
  }
};

module.exports = { findByAlumno, findActivas, findById, create, updateEstado, remove };
