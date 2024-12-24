const mongoose = require('mongoose');
const types_examenesSchema = new mongoose.Schema({
    nombre_examen: {
        type: String,
        required: true
    },
    categoria: {
        type: String,
        required: true
    },
    unidad_medida: {
        type: String,
        required: true,
        enum: ['MG/DL', "IMAGEN"]
    },
    rango_normal: {
        min: {
            type: Number,
            required: true
        },
        max: {
            type: Number,
            required: true
        }
    }
})

const TypesExam = mongoose.model('TypesExam', types_examenesSchema);
module.exports = TypesExam;