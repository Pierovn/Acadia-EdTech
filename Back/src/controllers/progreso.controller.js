const ProgresoAlumno = require('../models/mongodb/progreso.model');

const obtener = async (req, res) => {
  try {
    const progreso = await ProgresoAlumno.findOne({
      id_alumno: req.alumno.id_alumno,
      id_curso: Number(req.params.id_curso)
    });
    if (!progreso) return res.status(404).json({ error: 'Sin progreso registrado para este curso' });
    res.json(progreso);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener progreso', detalle: err.message });
  }
};

const actualizar = async (req, res) => {
  const { porcentaje_completado, lecciones_completadas } = req.body;

  try {
    const progreso = await ProgresoAlumno.findOneAndUpdate(
      { id_alumno: req.alumno.id_alumno, id_curso: Number(req.params.id_curso) },
      {
        porcentaje_completado,
        lecciones_completadas,
        ultima_vez_visto: new Date()
      },
      { new: true, upsert: true }
    );
    res.json(progreso);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar progreso', detalle: err.message });
  }
};

module.exports = { obtener, actualizar };
