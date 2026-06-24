const alumnoModel = require('../models/oracle/alumno.model');

const listar = async (req, res) => {
  try {
    const alumnos = await alumnoModel.findAll();
    res.json(alumnos);
  } catch (err) {
    console.error('Error al listar alumnos:', err);
    res.status(500).json({ error: 'Error al listar alumnos' });
  }
};

const detalle = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ error: 'id de alumno inválido' });
  }

  try {
    const alumno = await alumnoModel.findById(id);
    if (!alumno) return res.status(404).json({ error: 'Alumno no encontrado' });
    res.json(alumno);
  } catch (err) {
    console.error('Error al obtener alumno:', err);
    res.status(500).json({ error: 'Error al obtener alumno' });
  }
};

const actualizar = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ error: 'id de alumno inválido' });
  }

  const { nombre, apellido } = req.body;

  try {
    const filas = await alumnoModel.update(id, { nombre, apellido });
    if (!filas) return res.status(404).json({ error: 'Alumno no encontrado' });
    res.json({ mensaje: 'Alumno actualizado' });
  } catch (err) {
    console.error('Error al actualizar alumno:', err);
    res.status(500).json({ error: 'Error al actualizar alumno' });
  }
};

const eliminar = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ error: 'id de alumno inválido' });
  }

  try {
    const filas = await alumnoModel.remove(id);
    if (!filas) return res.status(404).json({ error: 'Alumno no encontrado' });
    res.json({ mensaje: 'Alumno eliminado' });
  } catch (err) {
    console.error('Error al eliminar alumno:', err);
    res.status(500).json({ error: 'Error al eliminar alumno' });
  }
};

module.exports = { listar, detalle, actualizar, eliminar };
