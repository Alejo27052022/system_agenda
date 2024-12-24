const mongoose = require('mongoose');
const diagnosticoSchema = new mongoose.Schema({
    cie10: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true,
        enum: ['Confirmado', 'Sospechoso', 'Parte del Examen']
    },
    codigo_historial_clinico: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HistorialClinico',
        required: true
    }
})

const diagnostico = mongoose.model('Diagnostico', diagnosticoSchema);
module.exports = diagnostico;