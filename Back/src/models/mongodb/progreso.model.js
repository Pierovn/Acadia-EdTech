const mongoose = require('mongoose');

const leccionSchema = new mongoose.Schema({
  id_leccion:       { type: Number,  required: true },
  completada:       { type: Boolean, default: false },
  fecha_completada: { type: Date,    default: null },
  apuntes:          { type: String,  default: '' }
}, { _id: false });

const progresoSchema = new mongoose.Schema({
  id_alumno:             { type: Number, required: true },
  id_curso:              { type: Number, required: true },
  porcentaje_completado: { type: Number, default: 0 },
  ultima_vez_visto:      { type: Date,   default: Date.now },
  lecciones_completadas: [leccionSchema]
});

module.exports = mongoose.model('ProgresoAlumno', progresoSchema, 'progreso_alumno');
