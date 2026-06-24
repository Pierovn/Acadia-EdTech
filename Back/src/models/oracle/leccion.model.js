const oracledb = require('oracledb');
const { getConnection } = require('../../config/oracle');

const findByCurso = async (idCurso) => {
  const conn = await getConnection();
  try {
    const result = await conn.execute(
      `SELECT ID_LECCION, TITULO, DESCRIPCION, ORDEN, DURACION_MIN, ID_CURSO
       FROM LECCION WHERE ID_CURSO = :idCurso ORDER BY ORDEN`,
      { idCurso },
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
      `SELECT ID_LECCION, TITULO, DESCRIPCION, ORDEN, DURACION_MIN, ID_CURSO
       FROM LECCION WHERE ID_LECCION = :id`,
      { id },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    return result.rows[0] || null;
  } finally {
    await conn.close();
  }
};

const create = async ({ titulo, descripcion, orden, duracionMin, idCurso }) => {
  const conn = await getConnection();
  try {
    const result = await conn.execute(
      `INSERT INTO LECCION (ID_LECCION, TITULO, DESCRIPCION, ORDEN, DURACION_MIN, ID_CURSO)
       VALUES (SEQ_LECCION.NEXTVAL, :titulo, :descripcion, :orden, :duracionMin, :idCurso)
       RETURNING ID_LECCION INTO :id`,
      {
        titulo,
        descripcion: descripcion || null,
        orden,
        duracionMin: duracionMin ?? null,
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

const update = async (id, { titulo, descripcion, orden, duracionMin }) => {
  const conn = await getConnection();
  try {
    const result = await conn.execute(
      `UPDATE LECCION
       SET TITULO = COALESCE(:titulo, TITULO),
           DESCRIPCION = COALESCE(:descripcion, DESCRIPCION),
           ORDEN = COALESCE(:orden, ORDEN),
           DURACION_MIN = COALESCE(:duracionMin, DURACION_MIN)
       WHERE ID_LECCION = :id`,
      {
        titulo: titulo ?? null,
        descripcion: descripcion ?? null,
        orden: orden ?? null,
        duracionMin: duracionMin ?? null,
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
      `DELETE FROM LECCION WHERE ID_LECCION = :id`,
      { id },
      { autoCommit: true }
    );
    return result.rowsAffected;
  } finally {
    await conn.close();
  }
};

module.exports = { findByCurso, findById, create, update, remove };
