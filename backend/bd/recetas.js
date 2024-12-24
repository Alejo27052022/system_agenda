const mongoose = require('mongoose');
const recetaSchema = new mongoose.Schema({
    indicaciones: {
        type: Array,
        required: true
    },
    recomendaciones: {
        type: Array,
        required: true
    },
    frecuencia: {
        type: String, 
        required: true
    },
    tiempo: {
        type: String,
        required: true
    },
    codigo_historial_clinico: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HistorialClinico',
        required: true
    },
    codigo_medicamento: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Medicamento',
        required: true
    }
})

const receta = mongoose.model('Receta', recetaSchema);
module.exports = receta;