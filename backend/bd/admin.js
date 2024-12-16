const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    correo: String,
    password: String,
    telefono: String,
})
const Administrador = mongoose.model("administrador", adminSchema);
module.exports = Administrador