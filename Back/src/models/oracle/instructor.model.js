const oracledb = require('oracledb');
const { getConnection } = require('../../config/oracle');

const findAll = async () => {
  const conn = await getConnection();
  try {
    const result = await conn.execute(
      `SELECT ID_INSTRUCTOR, NOMBRE, APELLIDO, EMAIL, BIO, FECHA_REGISTRO
       FROM INSTRUCTOR ORDER BY APELLIDO, NOMBRE`,
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
      `SELECT ID_INSTRUCTOR, NOMBRE, APELLIDO, EMAIL, BIO, FECHA_REGISTRO
       FROM INSTRUCTOR WHERE ID_INSTRUCTOR = :id`,
      { id },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    return result.rows[0] || null;
  } finally {
    await conn.close();
  }
};

const create = async ({ nombre, apellido, email, bio }) => {
  const conn = await getConnection();
  try {
    const result = await conn.execute(
      `INSERT INTO INSTRUCTOR (ID_INSTRUCTOR, NOMBRE, APELLIDO, EMAIL, BIO)
       VALUES (SEQ_INSTRUCTOR.NEXTVAL, :nombre, :apellido, :email, :bio)
       RETURNING ID_INSTRUCTOR INTO :id`,
      {
        nombre,
        apellido,
        email,
        bio: bio || null,
        id: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
      },
      { autoCommit: true }
    );
    return result.outBinds.id[0];
  } finally {
    await conn.close();
  }
};

const update = async (id, { nombre, apellido, email, bio }) => {
  const conn = await getConnection();
  try {
    const result = await conn.execute(
      `UPDATE INSTRUCTOR
       SET NOMBRE = COALESCE(:nombre, NOMBRE),
           APELLIDO = COALESCE(:apellido, APELLIDO),
           EMAIL = COALESCE(:email, EMAIL),
           BIO = COALESCE(:bio, BIO)
       WHERE ID_INSTRUCTOR = :id`,
      {
        nombre: nombre ?? null,
        apellido: apellido ?? null,
        email: email ?? null,
        bio: bio ?? null,
        id
      },
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
      `DELETE FROM INSTRUCTOR WHERE ID_INSTRUCTOR = :id`,
      { id },
      { autoCommit: true }
    );
    return result.rowsAffected;
  } finally {
    await conn.close();
  }
};

module.exports = { findAll, findById, create, update, remove };
