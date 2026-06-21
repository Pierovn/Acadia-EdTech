const cursoModel = require('../models/oracle/curso.model');

const listar = async (req, res) => {
  try {
    const cursos = await cursoModel.findAll();
    res.json(cursos);
  } catch (err) {
    res.status(500).json({ error: 'Error al listar cursos', detalle: err.message });
  }
};

const detalle = async (req, res) => {
  try {
    const curso = await cursoModel.findById(Number(req.params.id));
    if (!curso) return res.status(404).json({ error: 'Curso no encontrado' });
    res.json(curso);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener curso', detalle: err.message });
  }
};

const lecciones = async (req, res) => {
  try {
    const lista = await cursoModel.findLeccionesByCurso(Number(req.params.id));
    res.json(lista);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener lecciones', detalle: err.message });
  }
};

module.exports = { listar, detalle, lecciones };
