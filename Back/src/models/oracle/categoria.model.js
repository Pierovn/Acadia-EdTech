const oracledb = require('oracledb');
const { getConnection } = require('../../config/oracle');

const findAll = async () => {
  const conn = await getConnection();
  try {
    const result = await conn.execute(
      `SELECT ID_CATEGORIA, NOMBRE, DESCRIPCION FROM CATEGORIA ORDER BY NOMBRE`,
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
      `SELECT ID_CATEGORIA, NOMBRE, DESCRIPCION FROM CATEGORIA WHERE ID_CATEGORIA = :id`,
      { id },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    return result.rows[0] || null;
  } finally {
    await conn.close();
  }
};

const create = async ({ nombre, descripcion }) => {
  const conn = await getConnection();
  try {
    const result = await conn.execute(
      `INSERT INTO CATEGORIA (ID_CATEGORIA, NOMBRE, DESCRIPCION)
       VALUES (SEQ_CATEGORIA.NEXTVAL, :nombre, :descripcion)
       RETURNING ID_CATEGORIA INTO :id`,
      {
        nombre,
        descripcion: descripcion || null,
        id: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
      },
      { autoCommit: true }
    );
    return result.outBinds.id[0];
  } finally {
    await conn.close();
  }
};

const update = async (id, { nombre, descripcion }) => {
  const conn = await getConnection();
  try {
    const result = await conn.execute(
      `UPDATE CATEGORIA
       SET NOMBRE = COALESCE(:nombre, NOMBRE),
           DESCRIPCION = COALESCE(:descripcion, DESCRIPCION)
       WHERE ID_CATEGORIA = :id`,
      { nombre: nombre ?? null, descripcion: descripcion ?? null, id },
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
      `DELETE FROM CATEGORIA WHERE ID_CATEGORIA = :id`,
      { id },
      { autoCommit: true }
    );
    return result.rowsAffected;
  } finally {
    await conn.close();
  }
};

module.exports = { findAll, findById, create, update, remove };
