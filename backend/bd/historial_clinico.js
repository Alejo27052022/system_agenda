const mongoose = require('mongoose');
const historialSchema = new mongoose.Schema({
    fecha_registro: {
        type: Date,
        required: true
    },
    descripcion_enfermedad: {
        type: String,
        required: true
    },
    signos_vitales: {
        frecuencia_cardiaca: {
            type: Number,
            required: true
        },
        pulso: {
            type: Number,
            required: true
        },
        peso: {
            type: Number,
            required: true
        },
        temperatura: {
            type: Number,
            required: true
        },
        presion: {
            type: String,
            required: true
        },
        estatura: {
            type: Number,
            required: true
        },
    },
    examen_fisico_general: {
        type: String
    },
    siguiente_cita: {
        type: Date
    },
    cedula_paciente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'paciente',
        required: true
    },
    cedula_medico: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'medico',
        required: true
    }

});

historialSchema.pre('save', function (next){
    if (this.signos_vitales.peso && this.signos_vitales.altura){
        const alturaMetros = this.signos_vitales.altura / 100;
        this.signos_vitales.imc = this.signos_vitales.peso / (alturaMetros ** 2);
        this.signos_vitales.pesoIdeal = 22.5 * (alturaMetros ** 2);
    } 
    next();
})

const HistorialClinico = mongoose.model('HistorialClinico', historialSchema);
module.exports = HistorialClinico;