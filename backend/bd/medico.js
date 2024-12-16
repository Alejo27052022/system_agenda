const mongoose = require('mongoose');
const medicoSchema = new mongoose.Schema({
    cedula_medico: Int16Array(10),
    primer_nombre: String(80),
    segundo_nombre: String(80),
    primer_apellido: String(80),
    segundo_apellido: String(80),
    correo: String(255),
    password: String,
    especialidad: String,
})

const Medico = mongoose.model("medico", medicoSchema)
module.exports = Medico