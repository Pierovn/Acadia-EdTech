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

const create = async ({ titulo, descripcion, precio, duracionHoras, nivel, idCategoria, idInstructor }) => {
  const conn = await getConnection();
  try {
    const result = await conn.execute(
      `INSERT INTO CURSO (ID_CURSO, TITULO, DESCRIPCION, PRECIO, DURACION_HORAS, NIVEL, ID_CATEGORIA, ID_INSTRUCTOR)
       VALUES (SEQ_CURSO.NEXTVAL, :titulo, :descripcion, :precio, :duracionHoras,
               COALESCE(:nivel, 'BASICO'), :idCategoria, :idInstructor)
       RETURNING ID_CURSO INTO :id`,
      {
        titulo,
        descripcion: descripcion || null,
        precio,
        duracionHoras: duracionHoras ?? null,
        nivel: nivel || null,
        idCategoria,
        idInstructor,
        id: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
      },
      { autoCommit: true }
    );
    return result.outBinds.id[0];
  } finally {
    await conn.close();
  }
};

const update = async (id, { titulo, descripcion, precio, duracionHoras, nivel, idCategoria, idInstructor, activo }) => {
  const conn = await getConnection();
  try {
    const result = await conn.execute(
      `UPDATE CURSO
       SET TITULO = COALESCE(:titulo, TITULO),
           DESCRIPCION = COALESCE(:descripcion, DESCRIPCION),
           PRECIO = COALESCE(:precio, PRECIO),
           DURACION_HORAS = COALESCE(:duracionHoras, DURACION_HORAS),
           NIVEL = COALESCE(:nivel, NIVEL),
           ID_CATEGORIA = COALESCE(:idCategoria, ID_CATEGORIA),
           ID_INSTRUCTOR = COALESCE(:idInstructor, ID_INSTRUCTOR),
           ACTIVO = COALESCE(:activo, ACTIVO)
       WHERE ID_CURSO = :id`,
      {
        titulo: titulo ?? null,
        descripcion: descripcion ?? null,
        precio: precio ?? null,
        duracionHoras: duracionHoras ?? null,
        nivel: nivel ?? null,
        idCategoria: idCategoria ?? null,
        idInstructor: idInstructor ?? null,
        activo: activo ?? null,
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
      `DELETE FROM CURSO WHERE ID_CURSO = :id`,
      { id },
      { autoCommit: true }
    );
    return result.rowsAffected;
  } finally {
    await conn.close();
  }
};

module.exports = { findAll, findById, findLeccionesByCurso, create, update, remove };
