const mongoose = require('mongoose');
const citamedicaSchema = new mongoose.Schema({
    fecha_cita: {
        type: Date,
        required: true
    },
    hora_inicio: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v);
            },
            message: props => `${props.value} no es un formato de hora válido (hh:mm).`
        }
    },
    hora_finalizacion: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v); // Valida formato hh:mm
            },
            message: props => `${props.value} no es un formato de hora válido (hh:mm).`
        }
    },
    estado: {
        type: String,
        required: true,
        enum: ['Pendiente', 'Completada', 'Cancelada']
    },
    motivo: {
        type: String,
        required: true
    },

    cedula_paciente: {type: mongoose.Schema.Types.ObjectId, ref: 'paciente', required: true},
    cedula_medico: {type: mongoose.Schema.Types.ObjectId, ref: 'medico', required: true}
});

const CitaMedica = mongoose.model("citamedica", citamedicaSchema);
module.exports = CitaMedica;

