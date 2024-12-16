const mongoose = require("mongoose");
const pacienteSchema = new mongoose.Schema({
    cedula: Int16Array(10),
    primer_nombre: String(80),
    segundo_nombre: String(80),
    primer_apellido: String(80),
    segundo_apellido: String(80),
    correo: String(255),
    sexo: String,
    raza: String,
    telefono: Int16Array(10),
    direccion: String,
    fecha_nacimiento: Date,
    ocupacion: String,
    enfermedad_herencia: String,
    alergia: String,
    antecedentes: String
})

const Paciente = mongoose.model("paciente", pacienteSchema)
module.exports = Paciente