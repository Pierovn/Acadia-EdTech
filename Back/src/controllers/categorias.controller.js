const categoriaModel = require('../models/oracle/categoria.model');

const listar = async (req, res) => {
  try {
    const categorias = await categoriaModel.findAll();
    res.json(categorias);
  } catch (err) {
    console.error('Error al listar categorías:', err);
    res.status(500).json({ error: 'Error al listar categorías' });
  }
};

const detalle = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ error: 'id de categoría inválido' });
  }

  try {
    const categoria = await categoriaModel.findById(id);
    if (!categoria) return res.status(404).json({ error: 'Categoría no encontrada' });
    res.json(categoria);
  } catch (err) {
    console.error('Error al obtener categoría:', err);
    res.status(500).json({ error: 'Error al obtener categoría' });
  }
};

const crear = async (req, res) => {
  const { nombre, descripcion } = req.body;
  if (!nombre) return res.status(400).json({ error: 'nombre es requerido' });

  try {
    const id = await categoriaModel.create({ nombre, descripcion });
    res.status(201).json({ mensaje: 'Categoría creada', id_categoria: id });
  } catch (err) {
    console.error('Error al crear categoría:', err);
    res.status(500).json({ error: 'Error al crear categoría' });
  }
};

const actualizar = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ error: 'id de categoría inválido' });
  }

  const { nombre, descripcion } = req.body;

  try {
    const filas = await categoriaModel.update(id, { nombre, descripcion });
    if (!filas) return res.status(404).json({ error: 'Categoría no encontrada' });
    res.json({ mensaje: 'Categoría actualizada' });
  } catch (err) {
    console.error('Error al actualizar categoría:', err);
    res.status(500).json({ error: 'Error al actualizar categoría' });
  }
};

const eliminar = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ error: 'id de categoría inválido' });
  }

  try {
    const filas = await categoriaModel.remove(id);
    if (!filas) return res.status(404).json({ error: 'Categoría no encontrada' });
    res.json({ mensaje: 'Categoría eliminada' });
  } catch (err) {
    console.error('Error al eliminar categoría:', err);
    res.status(500).json({ error: 'Error al eliminar categoría' });
  }
};

module.exports = { listar, detalle, crear, actualizar, eliminar };
