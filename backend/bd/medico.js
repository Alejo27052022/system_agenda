const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const medicoSchema = new mongoose.Schema({
    cedula_medico: {
        type: String,
        required: true,
        unique: true,
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
        unique: true
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
    image: {
        type: String
    },
})

// 🔹 Middleware de Mongoose para validar y encriptar la contraseña antes de guardar
medicoSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    // Validar la contraseña antes de encriptarla
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;
    if (!passwordRegex.test(this.password)) {
        return next(new Error("La contraseña no es válida. Debe contener al menos una mayúscula, una minúscula, un número y un carácter especial (@$!%*?&.), con mínimo 8 caracteres."));
    }

    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

medicoSchema.index({ cedula_medico: 1}, { unique: true});

const Medico = mongoose.model("medico", medicoSchema)
module.exports = Medico