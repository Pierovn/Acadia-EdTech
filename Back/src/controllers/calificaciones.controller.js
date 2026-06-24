const calificacionModel = require('../models/oracle/calificacion.model');

const notaEnRango = (n) => !Number.isNaN(n) && n >= 0 && n <= 20;

const listar = async (req, res) => {
  try {
    const calificaciones = await calificacionModel.findByAlumno(req.alumno.id_alumno);
    res.json(calificaciones);
  } catch (err) {
    console.error('Error al obtener calificaciones:', err);
    res.status(500).json({ error: 'Error al obtener calificaciones' });
  }
};

const registrar = async (req, res) => {
  const { id_matricula, nota, comentario } = req.body;
  const idMatricula = Number(id_matricula);
  const notaNum = Number(nota);

  if (!Number.isInteger(idMatricula) || idMatricula < 1 || nota === undefined) {
    return res.status(400).json({ error: 'id_matricula y nota son requeridos' });
  }
  if (!notaEnRango(notaNum)) {
    return res.status(400).json({ error: 'nota debe estar entre 0 y 20' });
  }

  try {
    const id = await calificacionModel.create({ idMatricula, nota: notaNum, comentario });
    res.status(201).json({ mensaje: 'Calificación registrada', id_calificacion: id });
  } catch (err) {
    console.error('Error al registrar calificación:', err);
    res.status(500).json({ error: 'Error al registrar calificación' });
  }
};

const detalle = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ error: 'id de calificación inválido' });
  }

  try {
    const calificacion = await calificacionModel.findById(id);
    if (!calificacion) return res.status(404).json({ error: 'Calificación no encontrada' });
    res.json(calificacion);
  } catch (err) {
    console.error('Error al obtener calificación:', err);
    res.status(500).json({ error: 'Error al obtener calificación' });
  }
};

const actualizar = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ error: 'id de calificación inválido' });
  }

  const { nota, comentario } = req.body;
  let notaNum;
  if (nota !== undefined) {
    notaNum = Number(nota);
    if (!notaEnRango(notaNum)) {
      return res.status(400).json({ error: 'nota debe estar entre 0 y 20' });
    }
  }

  try {
    const filas = await calificacionModel.update(id, { nota: notaNum, comentario });
    if (!filas) return res.status(404).json({ error: 'Calificación no encontrada' });
    res.json({ mensaje: 'Calificación actualizada' });
  } catch (err) {
    console.error('Error al actualizar calificación:', err);
    res.status(500).json({ error: 'Error al actualizar calificación' });
  }
};

const eliminar = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ error: 'id de calificación inválido' });
  }

  try {
    const filas = await calificacionModel.remove(id);
    if (!filas) return res.status(404).json({ error: 'Calificación no encontrada' });
    res.json({ mensaje: 'Calificación eliminada' });
  } catch (err) {
    console.error('Error al eliminar calificación:', err);
    res.status(500).json({ error: 'Error al eliminar calificación' });
  }
};

module.exports = { listar, registrar, detalle, actualizar, eliminar };
