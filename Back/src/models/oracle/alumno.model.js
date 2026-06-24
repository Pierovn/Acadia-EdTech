const oracledb = require('oracledb');
const { getConnection } = require('../../config/oracle');

const findByEmail = async (email) => {
  const conn = await getConnection();
  try {
    const result = await conn.execute(
      `SELECT ID_ALUMNO, NOMBRE, APELLIDO, EMAIL, PASSWORD_HASH
       FROM ALUMNO WHERE EMAIL = :email AND ACTIVO = 1`,
      { email },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    return result.rows[0] || null;
  } finally {
    await conn.close();
  }
};

const create = async ({ nombre, apellido, email, passwordHash }) => {
  const conn = await getConnection();
  try {
    const result = await conn.execute(
      `INSERT INTO ALUMNO (ID_ALUMNO, NOMBRE, APELLIDO, EMAIL, PASSWORD_HASH)
       VALUES (SEQ_ALUMNO.NEXTVAL, :nombre, :apellido, :email, :passwordHash)
       RETURNING ID_ALUMNO INTO :id`,
      {
        nombre,
        apellido,
        email,
        passwordHash,
        id: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
      },
      { autoCommit: true }
    );
    return result.outBinds.id[0];
  } finally {
    await conn.close();
  }
};

const findAll = async () => {
  const conn = await getConnection();
  try {
    const result = await conn.execute(
      `SELECT ID_ALUMNO, NOMBRE, APELLIDO, EMAIL, FECHA_REGISTRO, ACTIVO
       FROM ALUMNO ORDER BY ID_ALUMNO`,
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
      `SELECT ID_ALUMNO, NOMBRE, APELLIDO, EMAIL, FECHA_REGISTRO, ACTIVO
       FROM ALUMNO WHERE ID_ALUMNO = :id`,
      { id },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    return result.rows[0] || null;
  } finally {
    await conn.close();
  }
};

const update = async (id, { nombre, apellido }) => {
  const conn = await getConnection();
  try {
    const result = await conn.execute(
      `UPDATE ALUMNO
       SET NOMBRE = COALESCE(:nombre, NOMBRE),
           APELLIDO = COALESCE(:apellido, APELLIDO)
       WHERE ID_ALUMNO = :id`,
      { nombre: nombre ?? null, apellido: apellido ?? null, id },
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
      `UPDATE ALUMNO SET ACTIVO = 0 WHERE ID_ALUMNO = :id`,
      { id },
      { autoCommit: true }
    );
    return result.rowsAffected;
  } finally {
    await conn.close();
  }
};

module.exports = { findByEmail, create, findAll, findById, update, remove };
