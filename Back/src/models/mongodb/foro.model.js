const mongoose = require('mongoose');

const respuestaSchema = new mongoose.Schema({
  id_alumno: { type: Number, required: true },
  contenido: { type: String, required: true },
  likes:     { type: Number, default: 0 },
  fecha:     { type: Date,   default: Date.now }
}, { _id: false });

const foroSchema = new mongoose.Schema({
  titulo:         { type: String, required: true },
  contenido:      { type: String, required: true },
  id_alumno:      { type: Number, required: true },
  id_curso:       { type: Number, required: true },
  etiquetas:      [String],
  likes:          { type: Number, default: 0 },
  fecha_creacion: { type: Date,   default: Date.now },
  respuestas:     [respuestaSchema]
});

module.exports = mongoose.model('ForoHilo', foroSchema, 'foro_hilos');
