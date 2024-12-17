const mongoose = require("mongoose");

const pacienteSchema = new mongoose.Schema({
    cedula: {
        type: String,
        required: [true, "La cédula es obligatoria."],
        unique: true, // Se asegura de que no haya duplicados
        validate: {
            validator: function (v) {
                return /^\d{10}$/.test(v); // Exactamente 10 dígitos numéricos
            },
            message: props => `${props.value} no es una cédula válida. Debe contener exactamente 10 dígitos.`
        }
    },
    primer_nombre: {
        type: String,
        required: [true, "El primer nombre es obligatorio."],
        maxlength: [80, "El primer nombre no debe exceder 80 caracteres."]
    },
    segundo_nombre: {
        type: String,
        maxlength: [80, "El segundo nombre no debe exceder 80 caracteres."]
    },
    primer_apellido: {
        type: String,
        required: [true, "El primer apellido es obligatorio."],
        maxlength: [80, "El primer apellido no debe exceder 80 caracteres."]
    },
    segundo_apellido: {
        type: String,
        maxlength: [80, "El segundo apellido no debe exceder 80 caracteres."]
    },
    correo: {
        type: String,
        required: [true, "El correo electrónico es obligatorio."],
        match: [/^\S+@\S+\.\S+$/, "El correo no es válido."]
    },
    sexo: {
        type: String,
        required: [true, "El sexo es obligatorio."]
    },
    raza: {
        type: String,
        required: [true, "La raza es obligatoria."]
    },
    telefono: {
        type: String,
        required: [true, "El teléfono es obligatorio."],
        validate: {
            validator: function (v) {
                return /^\d{10}$/.test(v);
            },
            message: props => `${props.value} no es un número de teléfono válido. Debe contener exactamente 10 dígitos.`
        }
    },
    direccion: {
        type: String,
        required: [true, "La dirección es obligatoria."]
    },
    fecha_nacimiento: {
        type: Date,
        required: [true, "La fecha de nacimiento es obligatoria."]
    },
    ocupacion: String,
    enfermedad_herencia: {
        type: String,
        required: [true, "La enfermedad hereditaria es obligatoria."]
    },
    alergia: {
        type: String,
        required: [true, "Las alergias son obligatorias."]
    },
    antecedentes: String
});

// Configura la cédula como clave primaria
pacienteSchema.index({ cedula: 1 }, { unique: true });

const Paciente = mongoose.model("Paciente", pacienteSchema);

module.exports = Paciente;
