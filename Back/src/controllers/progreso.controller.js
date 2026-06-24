const ProgresoAlumno = require('../models/mongodb/progreso.model');

const obtener = async (req, res) => {
  const idCurso = Number(req.params.id_curso);
  if (!Number.isInteger(idCurso) || idCurso < 1) {
    return res.status(400).json({ error: 'id de curso inválido' });
  }

  try {
    const progreso = await ProgresoAlumno.findOne({
      id_alumno: req.alumno.id_alumno,
      id_curso: idCurso
    });
    if (!progreso) return res.status(404).json({ error: 'Sin progreso registrado para este curso' });
    res.json(progreso);
  } catch (err) {
    console.error('Error al obtener progreso:', err);
    res.status(500).json({ error: 'Error al obtener progreso' });
  }
};

const actualizar = async (req, res) => {
  const idCurso = Number(req.params.id_curso);
  if (!Number.isInteger(idCurso) || idCurso < 1) {
    return res.status(400).json({ error: 'id de curso inválido' });
  }

  const { porcentaje_completado, lecciones_completadas } = req.body;

  try {
    const progreso = await ProgresoAlumno.findOneAndUpdate(
      { id_alumno: req.alumno.id_alumno, id_curso: idCurso },
      {
        porcentaje_completado,
        lecciones_completadas,
        ultima_vez_visto: new Date()
      },
      { new: true, upsert: true }
    );
    res.json(progreso);
  } catch (err) {
    console.error('Error al actualizar progreso:', err);
    res.status(500).json({ error: 'Error al actualizar progreso' });
  }
};

module.exports = { obtener, actualizar };
