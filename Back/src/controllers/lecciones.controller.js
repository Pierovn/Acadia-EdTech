const leccionModel = require('../models/oracle/leccion.model');

const porCurso = async (req, res) => {
  const idCurso = Number(req.params.idCurso);
  if (!Number.isInteger(idCurso) || idCurso < 1) {
    return res.status(400).json({ error: 'id de curso inválido' });
  }

  try {
    const lecciones = await leccionModel.findByCurso(idCurso);
    res.json(lecciones);
  } catch (err) {
    console.error('Error al obtener lecciones:', err);
    res.status(500).json({ error: 'Error al obtener lecciones' });
  }
};

const detalle = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ error: 'id de lección inválido' });
  }

  try {
    const leccion = await leccionModel.findById(id);
    if (!leccion) return res.status(404).json({ error: 'Lección no encontrada' });
    res.json(leccion);
  } catch (err) {
    console.error('Error al obtener lección:', err);
    res.status(500).json({ error: 'Error al obtener lección' });
  }
};

const crear = async (req, res) => {
  const { titulo, descripcion, orden, duracion_min, id_curso } = req.body;
  if (!titulo || orden === undefined || !id_curso) {
    return res.status(400).json({ error: 'titulo, orden e id_curso son requeridos' });
  }

  try {
    const id = await leccionModel.create({
      titulo,
      descripcion,
      orden,
      duracionMin: duracion_min,
      idCurso: id_curso
    });
    res.status(201).json({ mensaje: 'Lección creada', id_leccion: id });
  } catch (err) {
    console.error('Error al crear lección:', err);
    res.status(500).json({ error: 'Error al crear lección' });
  }
};

const actualizar = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ error: 'id de lección inválido' });
  }

  const { titulo, descripcion, orden, duracion_min } = req.body;

  try {
    const filas = await leccionModel.update(id, {
      titulo,
      descripcion,
      orden,
      duracionMin: duracion_min
    });
    if (!filas) return res.status(404).json({ error: 'Lección no encontrada' });
    res.json({ mensaje: 'Lección actualizada' });
  } catch (err) {
    console.error('Error al actualizar lección:', err);
    res.status(500).json({ error: 'Error al actualizar lección' });
  }
};

const eliminar = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ error: 'id de lección inválido' });
  }

  try {
    const filas = await leccionModel.remove(id);
    if (!filas) return res.status(404).json({ error: 'Lección no encontrada' });
    res.json({ mensaje: 'Lección eliminada' });
  } catch (err) {
    console.error('Error al eliminar lección:', err);
    res.status(500).json({ error: 'Error al eliminar lección' });
  }
};

module.exports = { porCurso, detalle, crear, actualizar, eliminar };
