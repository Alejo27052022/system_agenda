const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        maxlength: 80    
    },
    apellido: {
        type: String, 
        required: true,
        maxlength: 80
    },
    correo: {
        type: String,
        required: true,
        match: /^\S+@\S+\.\S+$/
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        validate: {
            validator: function (v) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/.test(v);
            },
            message: props => `La contraseña no es válida. Debe contener al menos una mayúscula, una minúscula, un número y un carácter especial (@$!%*?&.), con mínimo 8 caracteres.`
        }
    },
    telefono: {
        type: String,
        validate: {
            validator: function (v) {
                return /^\d{10}$/.test(v);
            },
            message: props => `${props.value} no es un número de teléfono válido. Debe contener exactamente 10 dígitos.`
        }
    },
})

const Administrador = mongoose.model("administrador", adminSchema);
module.exports = Administrador