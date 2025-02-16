const mongoose = require('mongoose');

// Subdocumento para rango_normal
const rangoSchema = new mongoose.Schema({
  min: { type: Number, required: true },
  max: { type: Number, required: true }
});

const types_examenesSchema = new mongoose.Schema({
  nombre_examen: {
    type: String,
    required: true,
    unique: true
  },
  categoria: {
    type: String,
    required: true,
    enum: ['Laboratorio', 'Imagen', 'Otro']
  },
  unidad_medida: {
    type: String,
    required: true,
    enum: ['MG/DL', 'IMAGEN']
  },
  rango_normal: {
    type: rangoSchema, // Subdocumento como tipo
    required: true
  }
});



const TypesExam = mongoose.model('TypesExam', types_examenesSchema);
module.exports = TypesExam;
