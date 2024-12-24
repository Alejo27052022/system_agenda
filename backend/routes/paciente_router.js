const express = require("express");
const router = express.Router();
const Paciente = require("./../bd/paciente")

/* Metodo GET */

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

/* Metodo POST */

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

/* Metodo PUT */
router.put("/:cedula", async(req, res) => {
    try {
        const cedula = req.params.cedula;
        const model = req.body;

        const updatePaciente = await Paciente.findOneAndUpdate(
            {cedula: cedula},
            model, 
            {new: true}
        );
        
        if (!updatePaciente){
            return res.status(404).json({ message: "Paciente no encontrado"});
        }

        res.json({message: "Paciente actualizado correctamente", data: updatePaciente});
    }
    catch (err) {
        res.status(500).json({ error: "Error al actualizar el paciente", details: err.message });
    }
})


/* Método DELETE */



module.exports = router;