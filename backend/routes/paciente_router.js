const express = require("express");
const router = express.Router();
const Paciente = require("./../bd/paciente")

router.get("", async(req, res) => {
    try {
        const pacienteData = await Paciente.find();
        res.json(pacienteData);
    } catch (error) {
        res.status(500).json({
            error: "Error al obtener los datos del Paciente"
        })
    }
})

router.post("", async (req, res) => {
    let model = req.body;

    let paciente = new Paciente({
        cedula: model.cedula,
        primer_nombre: model.primer_nombre,
        segundo_nombre: model.segundo_nombre,
        primer_apellido: model.primer_apellido,
        segundo_apellido: model.segundo_apellido,
        correo: model.correo,
        sexo: model.sexo,
        raza: model.raza,
        telefono: model.telefono,
        direccion: model.direccion,
        fecha_nacimiento: model.fecha_nacimiento,
        ocupacion: model.ocupacion,
        enfermedad_herencia: model.enfermedad_herencia,
        alergia: model.alergia,
        antecedentes: model.antecedentes
    });
    paciente.save();
    res.send(paciente.toObject());
})

module.exports = router;