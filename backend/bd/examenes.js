const mongoose = require('mongoose');
const examenesSchema = new mongoose.Schema({
    fecha_examen: {
        type: Date,
        required: true
    },
    resultado: {
        type: String,
    },
    descripcion: {
        type: String,
        required: true
    },
    estado_examen: {
        type: String,
        required: true,
        enum: ['Pendiente', 'Completado', 'Cancelado']
    },
    codigo_historial_clinico: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HistorialClinico',
        required: true
    },
    codigo_type_examen: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TypesExam',
        required: true,
    }
})

const Examn = mongoose.model('Examen', examenesSchema);
module.exports = Examn;