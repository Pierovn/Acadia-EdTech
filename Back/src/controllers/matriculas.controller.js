const matriculaModel = require('../models/oracle/matricula.model');

const matricularse = async (req, res) => {
  const { id_curso } = req.body;
  if (!id_curso) return res.status(400).json({ error: 'id_curso es requerido' });

  try {
    const id = await matriculaModel.create({
      idAlumno: req.alumno.id_alumno,
      idCurso: id_curso
    });
    res.status(201).json({ mensaje: 'Matriculado correctamente', id_matricula: id });
  } catch (err) {
    if (err.errorNum === 1) {
      return res.status(409).json({ error: 'Ya estás matriculado en este curso' });
    }
    res.status(500).json({ error: 'Error al matricularse', detalle: err.message });
  }
};

const misCursos = async (req, res) => {
  try {
    const cursos = await matriculaModel.findByAlumno(req.alumno.id_alumno);
    res.json(cursos);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener mis cursos', detalle: err.message });
  }
};

module.exports = { matricularse, misCursos };
