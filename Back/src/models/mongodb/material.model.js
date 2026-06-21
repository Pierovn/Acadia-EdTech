const mongoose = require('mongoose');

const preguntaSchema = new mongoose.Schema({
  pregunta:           String,
  opciones:           [String],
  respuesta_correcta: Number
}, { _id: false });

const materialSchema = new mongoose.Schema({
  id_leccion:   { type: Number, required: true },
  id_curso:     { type: Number, required: true },
  tipo:         { type: String, required: true },
  titulo:       { type: String, required: true },
  url:          String,
  duracion_min: Number,
  preguntas:    [preguntaSchema]
});

module.exports = mongoose.model('MaterialCurso', materialSchema, 'materiales_curso');
