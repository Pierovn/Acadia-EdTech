const mongoose = require('mongoose');
const ForoHilo = require('../models/mongodb/foro.model');

const hilosPorCurso = async (req, res) => {
  const idCurso = Number(req.params.id);
  if (!Number.isInteger(idCurso) || idCurso < 1) {
    return res.status(400).json({ error: 'id de curso inválido' });
  }

  try {
    const hilos = await ForoHilo.find({ id_curso: idCurso })
      .sort({ fecha_creacion: -1 });
    res.json(hilos);
  } catch (err) {
    console.error('Error al obtener hilos:', err);
    res.status(500).json({ error: 'Error al obtener hilos' });
  }
};

const crearHilo = async (req, res) => {
  const { titulo, contenido, id_curso, etiquetas } = req.body;
  if (!titulo || !contenido || !id_curso) {
    return res.status(400).json({ error: 'titulo, contenido e id_curso son requeridos' });
  }

  try {
    const hilo = await ForoHilo.create({
      titulo,
      contenido,
      id_alumno: req.alumno.id_alumno,
      id_curso,
      etiquetas: etiquetas || [],
      likes: 0,
      fecha_creacion: new Date(),
      respuestas: []
    });
    res.status(201).json(hilo);
  } catch (err) {
    console.error('Error al crear hilo:', err);
    res.status(500).json({ error: 'Error al crear hilo' });
  }
};

const responderHilo = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ error: 'id de hilo inválido' });
  }

  const { contenido } = req.body;
  if (!contenido) return res.status(400).json({ error: 'contenido es requerido' });

  try {
    const hilo = await ForoHilo.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          respuestas: {
            id_alumno: req.alumno.id_alumno,
            contenido,
            likes: 0,
            fecha: new Date()
          }
        }
      },
      { new: true }
    );
    if (!hilo) return res.status(404).json({ error: 'Hilo no encontrado' });
    res.json(hilo);
  } catch (err) {
    console.error('Error al responder hilo:', err);
    res.status(500).json({ error: 'Error al responder hilo' });
  }
};

const actualizarHilo = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ error: 'id de hilo inválido' });
  }

  const { titulo, contenido, etiquetas } = req.body;

  try {
    const update = {};
    if (titulo !== undefined) update.titulo = titulo;
    if (contenido !== undefined) update.contenido = contenido;
    if (etiquetas !== undefined) update.etiquetas = etiquetas;

    const hilo = await ForoHilo.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!hilo) return res.status(404).json({ error: 'Hilo no encontrado' });
    res.json(hilo);
  } catch (err) {
    console.error('Error al actualizar hilo:', err);
    res.status(500).json({ error: 'Error al actualizar hilo' });
  }
};

const eliminarHilo = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ error: 'id de hilo inválido' });
  }

  try {
    const hilo = await ForoHilo.findByIdAndDelete(req.params.id);
    if (!hilo) return res.status(404).json({ error: 'Hilo no encontrado' });
    res.json({ mensaje: 'Hilo eliminado' });
  } catch (err) {
    console.error('Error al eliminar hilo:', err);
    res.status(500).json({ error: 'Error al eliminar hilo' });
  }
};

module.exports = { hilosPorCurso, crearHilo, responderHilo, actualizarHilo, eliminarHilo };
