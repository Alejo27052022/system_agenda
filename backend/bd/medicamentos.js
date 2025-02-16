const mongoose = require('mongoose');
const medicamentosSchema = new mongoose.Schema({
    _id: { 
        type: String,
        required: true 
    }, 
    nombre_medicamento: {
        type: String,
        required: true
    },
    gramos: {
        type: Number,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    composicion: {
        type: String,
        required: true
    },
    tipo_via: {
        type: String,
        required: true,
        enum: ['Via Oral', 'Intravenosa']
    },
    fabricante_medico: {
        type: String,
    },
    cantidad: {
        type: Number,
        required: true
    }
})

medicamentosSchema.index({ nombre_medicamento: 1, gramos: 1 }, { unique: true });

const medicamentos = mongoose.model('Medicamentos', medicamentosSchema);
module.exports = medicamentos