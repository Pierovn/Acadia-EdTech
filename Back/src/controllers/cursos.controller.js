const cursoModel = require('../models/oracle/curso.model');

const listar = async (req, res) => {
  try {
    const cursos = await cursoModel.findAll();
    res.json(cursos);
  } catch (err) {
    console.error('Error al listar cursos:', err);
    res.status(500).json({ error: 'Error al listar cursos' });
  }
};

const detalle = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ error: 'id de curso inválido' });
  }

  try {
    const curso = await cursoModel.findById(id);
    if (!curso) return res.status(404).json({ error: 'Curso no encontrado' });
    const lecciones = await cursoModel.findLeccionesByCurso(id);
    res.json({ ...curso, LECCIONES: lecciones });
  } catch (err) {
    console.error('Error al obtener curso:', err);
    res.status(500).json({ error: 'Error al obtener curso' });
  }
};

const lecciones = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ error: 'id de curso inválido' });
  }

  try {
    const lista = await cursoModel.findLeccionesByCurso(id);
    res.json(lista);
  } catch (err) {
    console.error('Error al obtener lecciones:', err);
    res.status(500).json({ error: 'Error al obtener lecciones' });
  }
};

const crear = async (req, res) => {
  const { titulo, precio, id_categoria, id_instructor, descripcion, duracion_horas, nivel } = req.body;
  if (!titulo || precio === undefined || !id_categoria || !id_instructor) {
    return res.status(400).json({ error: 'titulo, precio, id_categoria e id_instructor son requeridos' });
  }

  try {
    const id = await cursoModel.create({
      titulo,
      descripcion,
      precio,
      duracionHoras: duracion_horas,
      nivel,
      idCategoria: id_categoria,
      idInstructor: id_instructor
    });
    res.status(201).json({ mensaje: 'Curso creado', id_curso: id });
  } catch (err) {
    console.error('Error al crear curso:', err);
    res.status(500).json({ error: 'Error al crear curso' });
  }
};

const actualizar = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ error: 'id de curso inválido' });
  }

  const { titulo, descripcion, precio, duracion_horas, nivel, id_categoria, id_instructor, activo } = req.body;

  try {
    const filas = await cursoModel.update(id, {
      titulo,
      descripcion,
      precio,
      duracionHoras: duracion_horas,
      nivel,
      idCategoria: id_categoria,
      idInstructor: id_instructor,
      activo
    });
    if (!filas) return res.status(404).json({ error: 'Curso no encontrado' });
    res.json({ mensaje: 'Curso actualizado' });
  } catch (err) {
    console.error('Error al actualizar curso:', err);
    res.status(500).json({ error: 'Error al actualizar curso' });
  }
};

const eliminar = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ error: 'id de curso inválido' });
  }

  try {
    const filas = await cursoModel.remove(id);
    if (!filas) return res.status(404).json({ error: 'Curso no encontrado' });
    res.json({ mensaje: 'Curso eliminado' });
  } catch (err) {
    console.error('Error al eliminar curso:', err);
    res.status(500).json({ error: 'Error al eliminar curso' });
  }
};

module.exports = { listar, detalle, lecciones, crear, actualizar, eliminar };
