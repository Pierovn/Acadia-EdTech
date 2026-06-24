const matriculaModel = require('../models/oracle/matricula.model');

const ESTADOS = ['ACTIVO', 'COMPLETADO', 'CANCELADO'];

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
    console.error('Error al matricularse:', err);
    res.status(500).json({ error: 'Error al matricularse' });
  }
};

const misCursos = async (req, res) => {
  try {
    const cursos = await matriculaModel.findByAlumno(req.alumno.id_alumno);
    res.json(cursos);
  } catch (err) {
    console.error('Error al obtener mis cursos:', err);
    res.status(500).json({ error: 'Error al obtener mis cursos' });
  }
};

const listar = async (req, res) => {
  try {
    const matriculas = await matriculaModel.findAll();
    res.json(matriculas);
  } catch (err) {
    console.error('Error al listar matrículas:', err);
    res.status(500).json({ error: 'Error al listar matrículas' });
  }
};

const detalle = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ error: 'id de matrícula inválido' });
  }

  try {
    const matricula = await matriculaModel.findById(id);
    if (!matricula) return res.status(404).json({ error: 'Matrícula no encontrada' });
    res.json(matricula);
  } catch (err) {
    console.error('Error al obtener matrícula:', err);
    res.status(500).json({ error: 'Error al obtener matrícula' });
  }
};

const actualizarEstado = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ error: 'id de matrícula inválido' });
  }

  const { estado } = req.body;
  if (!estado || !ESTADOS.includes(estado)) {
    return res.status(400).json({ error: 'estado inválido' });
  }

  try {
    const filas = await matriculaModel.updateEstado(id, estado);
    if (!filas) return res.status(404).json({ error: 'Matrícula no encontrada' });
    res.json({ mensaje: 'Estado de matrícula actualizado' });
  } catch (err) {
    console.error('Error al actualizar matrícula:', err);
    res.status(500).json({ error: 'Error al actualizar matrícula' });
  }
};

const eliminar = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ error: 'id de matrícula inválido' });
  }

  try {
    const filas = await matriculaModel.remove(id);
    if (!filas) return res.status(404).json({ error: 'Matrícula no encontrada' });
    res.json({ mensaje: 'Matrícula eliminada' });
  } catch (err) {
    console.error('Error al eliminar matrícula:', err);
    res.status(500).json({ error: 'Error al eliminar matrícula' });
  }
};

module.exports = { matricularse, misCursos, listar, detalle, actualizarEstado, eliminar };
