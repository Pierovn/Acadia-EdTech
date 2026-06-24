const mongoose = require('mongoose');
const MaterialCurso = require('../models/mongodb/material.model');

const TIPOS = ['video', 'pdf', 'quiz'];

const porCurso = async (req, res) => {
  const idCurso = Number(req.params.idCurso);
  if (!Number.isInteger(idCurso) || idCurso < 1) {
    return res.status(400).json({ error: 'id de curso inválido' });
  }

  try {
    const materiales = await MaterialCurso.find({ id_curso: idCurso });
    res.json(materiales);
  } catch (err) {
    console.error('Error al obtener materiales del curso:', err);
    res.status(500).json({ error: 'Error al obtener materiales del curso' });
  }
};

const porLeccion = async (req, res) => {
  const idLeccion = Number(req.params.idLeccion);
  if (!Number.isInteger(idLeccion) || idLeccion < 1) {
    return res.status(400).json({ error: 'id de lección inválido' });
  }

  try {
    const materiales = await MaterialCurso.find({ id_leccion: idLeccion });
    res.json(materiales);
  } catch (err) {
    console.error('Error al obtener materiales de la lección:', err);
    res.status(500).json({ error: 'Error al obtener materiales de la lección' });
  }
};

const crear = async (req, res) => {
  const { id_leccion, id_curso, tipo, titulo, url, duracion_min, preguntas } = req.body;
  if (!id_leccion || !id_curso || !tipo || !titulo) {
    return res.status(400).json({ error: 'id_leccion, id_curso, tipo y titulo son requeridos' });
  }
  if (!TIPOS.includes(tipo)) {
    return res.status(400).json({ error: 'tipo inválido' });
  }

  try {
    const material = await MaterialCurso.create({
      id_leccion,
      id_curso,
      tipo,
      titulo,
      url,
      duracion_min,
      preguntas: preguntas || []
    });
    res.status(201).json(material);
  } catch (err) {
    console.error('Error al crear material:', err);
    res.status(500).json({ error: 'Error al crear material' });
  }
};

const actualizar = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ error: 'id de material inválido' });
  }

  try {
    const material = await MaterialCurso.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!material) return res.status(404).json({ error: 'Material no encontrado' });
    res.json(material);
  } catch (err) {
    console.error('Error al actualizar material:', err);
    res.status(500).json({ error: 'Error al actualizar material' });
  }
};

const eliminar = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ error: 'id de material inválido' });
  }

  try {
    const material = await MaterialCurso.findByIdAndDelete(req.params.id);
    if (!material) return res.status(404).json({ error: 'Material no encontrado' });
    res.json({ mensaje: 'Material eliminado' });
  } catch (err) {
    console.error('Error al eliminar material:', err);
    res.status(500).json({ error: 'Error al eliminar material' });
  }
};

module.exports = { porCurso, porLeccion, crear, actualizar, eliminar };
