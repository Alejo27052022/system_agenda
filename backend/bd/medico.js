const mongoose = require('mongoose');
const medicoSchema = new mongoose.Schema({
    cedula_medico: {
        type: String,
        required: true,
        uniqued: true,
        validate: {
            validator: function(v){
                return /^\d{10}$/.test(v);
            },
            message: props => `${props.value} no es una cédula válida. Debe contener exactamente 10 dígitos.`
        }
    },
    num_unico_medico: {
        type: String,
        required: true,
        uniqued: true
    },
    estado_licencia: {
        type: String,
        required: true
    },
    primer_nombre: {
        type: String,
        required: true,
        maxlength: 80
    },
    segundo_nombre: {
        type: String,
        required: true,
        maxlength: 80
    },
    primer_apellido: {
        type: String,
        required: true,
        maxlength: 80
    },
    segundo_apellido: {
        type: String,
        required: true,
        maxlenght: 80
    },
    correo: {
        type: String,
        required: true,
        match: /^\S+@\S+\.\S+$/
    },
    password: {
        type: String,
        required: true,
        minlength: 8, // Longitud mínima
        validate: {
            validator: function (v) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/.test(v);
            },
            message: props => `La contraseña no es válida. Debe contener al menos una mayúscula, una minúscula, un número y un carácter especial (@$!%*?&), con mínimo 8 caracteres.`
        }
    },
    especialidad: {
        type: Array,
        required: true
    },
})

medicoSchema.index({ cedula_medico: 1}, { unique: true});

const Medico = mongoose.model("medico", medicoSchema)
module.exports = Medico