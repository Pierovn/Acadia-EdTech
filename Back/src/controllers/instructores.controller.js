const instructorModel = require('../models/oracle/instructor.model');

const listar = async (req, res) => {
  try {
    const instructores = await instructorModel.findAll();
    res.json(instructores);
  } catch (err) {
    console.error('Error al listar instructores:', err);
    res.status(500).json({ error: 'Error al listar instructores' });
  }
};

const detalle = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ error: 'id de instructor inválido' });
  }

  try {
    const instructor = await instructorModel.findById(id);
    if (!instructor) return res.status(404).json({ error: 'Instructor no encontrado' });
    res.json(instructor);
  } catch (err) {
    console.error('Error al obtener instructor:', err);
    res.status(500).json({ error: 'Error al obtener instructor' });
  }
};

const crear = async (req, res) => {
  const { nombre, apellido, email, bio } = req.body;
  if (!nombre || !apellido || !email) {
    return res.status(400).json({ error: 'nombre, apellido y email son requeridos' });
  }

  try {
    const id = await instructorModel.create({ nombre, apellido, email, bio });
    res.status(201).json({ mensaje: 'Instructor creado', id_instructor: id });
  } catch (err) {
    console.error('Error al crear instructor:', err);
    res.status(500).json({ error: 'Error al crear instructor' });
  }
};

const actualizar = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ error: 'id de instructor inválido' });
  }

  const { nombre, apellido, email, bio } = req.body;

  try {
    const filas = await instructorModel.update(id, { nombre, apellido, email, bio });
    if (!filas) return res.status(404).json({ error: 'Instructor no encontrado' });
    res.json({ mensaje: 'Instructor actualizado' });
  } catch (err) {
    console.error('Error al actualizar instructor:', err);
    res.status(500).json({ error: 'Error al actualizar instructor' });
  }
};

const eliminar = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ error: 'id de instructor inválido' });
  }

  try {
    const filas = await instructorModel.remove(id);
    if (!filas) return res.status(404).json({ error: 'Instructor no encontrado' });
    res.json({ mensaje: 'Instructor eliminado' });
  } catch (err) {
    console.error('Error al eliminar instructor:', err);
    res.status(500).json({ error: 'Error al eliminar instructor' });
  }
};

module.exports = { listar, detalle, crear, actualizar, eliminar };
