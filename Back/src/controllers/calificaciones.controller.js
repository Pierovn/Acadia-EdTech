const calificacionModel = require('../models/oracle/calificacion.model');

const listar = async (req, res) => {
  try {
    const calificaciones = await calificacionModel.findByAlumno(req.alumno.id_alumno);
    res.json(calificaciones);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener calificaciones', detalle: err.message });
  }
};

const registrar = async (req, res) => {
  const { id_matricula, nota, comentario } = req.body;
  if (!id_matricula || nota === undefined) {
    return res.status(400).json({ error: 'id_matricula y nota son requeridos' });
  }

  try {
    const id = await calificacionModel.create({ idMatricula: id_matricula, nota, comentario });
    res.status(201).json({ mensaje: 'Calificación registrada', id_calificacion: id });
  } catch (err) {
    res.status(500).json({ error: 'Error al registrar calificación', detalle: err.message });
  }
};

module.exports = { listar, registrar };
