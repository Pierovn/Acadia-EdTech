const ForoHilo = require('../models/mongodb/foro.model');

const hilosPorCurso = async (req, res) => {
  try {
    const hilos = await ForoHilo.find({ id_curso: Number(req.params.id) })
      .sort({ fecha_creacion: -1 });
    res.json(hilos);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener hilos', detalle: err.message });
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
    res.status(500).json({ error: 'Error al crear hilo', detalle: err.message });
  }
};

const responderHilo = async (req, res) => {
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
    res.status(500).json({ error: 'Error al responder hilo', detalle: err.message });
  }
};

module.exports = { hilosPorCurso, crearHilo, responderHilo };
