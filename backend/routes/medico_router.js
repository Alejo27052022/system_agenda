const express = require("express");
const router = express.Router();
const Medico = require("./../bd/medico")

/* Método GET */
router.get("", async(req, res) => {
    try {
        const medicoData = await Medico.find();
        res.json(medicoData);
    } catch (error) {
        res.status(500).json({
            error: "Error al obtener los datos del medico"
        })
    }
})

/* Método POST*/
router.post("", async(req, res) => {
    let model = req.body;

    let medico = new Medico({
        cedula_medico: model.cedula_medico,
        primer_nombre: model.primer_nombre,
        segundo_nombre: model.segundo_nombre,
        primer_apellido: model.primer_apellido,
        segundo_apellido: model.segundo_apellido,
        correo: model.correo,
        password: model.password,
        especialidad: model.especialidad
    })
    medico.save();
    res.send(medico.toObject());
})

/* Método PUT*/
router.put("/:cedula_medico", async(req, res) => {
    try {
        const cedula_medico = req.params.cedula_medico;
        const model = req.body;

        const updateMedico = await Medico.findOneAndUpdate(
            {cedula_medico: cedula_medico},
            model,
            {new: true}
        );

        if (!updateMedico) {
            return res.status(404).json({ message: "Medico no encontrado"});
        }

        res.json({message: "Médico actualizado correctamente", data: updateMedico});
    }
    catch (err) {
        res.status(500).json({error: "Error al actualizar el médico", details: err.message});
    }
})

module.exports = router;