const mongoose = require('mongoose');
const medicamentosSchema = new mongoose.Schema({
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
    }
})

const medicamentos = mongoose.model('Medicamentos', medicamentosSchema);
module.exports = medicamentos