const mongoose = require("mongoose");

const pacienteSchema = new mongoose.Schema({
    cedula: {
        type: String,
        required: [true, "La cédula es obligatoria."],
        unique: true, 
        validate: {
            validator: function (v) {
                return /^\d{10}$/.test(v); // Exactamente 10 dígitos numéricos
            },
            message: props => `${props.value} no es una cédula válida. Debe contener exactamente 10 dígitos.`
        }
    },
    primer_nombre: {
        type: String,
        required: true,
        maxlength: 80,
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
        maxlength: 80
    },
    correo: {
        type: String,
        required: true,
        match: /^\S+@\S+\.\S+$/
    },
    sexo: {
        type: String,
        required: true,
        enum: ['Masculino', 'Femenino', 'Otro'] 
    },
    raza: {
        type: String,
        required: true,
        enum: ['Mestizo', 'Montubio', 'Afroecuatoriano', 'Indígena', 'Blanco']
    },
    telefono: {
        type: String,
        required: true, 
        validate: {
            validator: function (v) {
                return /^\d{10}$/.test(v);
            },
            message: props => `${props.value} no es un número de teléfono válido. Debe contener exactamente 10 dígitos.`
        }
    },
    contacto_emergencia: {
        type: String,
        required: true,
        validate: {
            validator: function(v){
                return /^\d{10}$/.test(v);
            },
            message: props => `${props.value} no es un número de teléfono válido. Debe contener exactamente 10 dígitos`
        }
    },
    direccion: {
        type: String,
        required: true,
    },
    fecha_nacimiento: {
        type: Date,
        required: true
    },
    ocupacion: String,
    enfermedad_herencia: {
        type: Array,
        required: true
    },
    alergia: {
        type: Array,
        required: true
    },
    antecedentes: String
});

// Configura la cédula como clave primaria
pacienteSchema.index({ cedula: 1 }, { unique: true });

const Paciente = mongoose.model("paciente", pacienteSchema);

module.exports = Paciente;
