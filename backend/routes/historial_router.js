const express = require("express")
const router = express.Router();
const Historial = require("../bd/historial_clinico")

/* Método GET */
router.get("", async (req, res) => {
    try {
        const historialData = await Historial.find();
        res.json(historicalData)
    } catch (error) {
        res.status(500).json({
            error: "Error al obtener el historial clínico"
        })
    }
});

/* Método POST*/
router.post("", async (req, res) => {
    let model = req.body;

    let historial = new Historial({
        fecha_registro : model.fecha_registro,
        descripcion_enfermedad : model.descripcion_enfermedad,
        sintomas_regionales: model.sintomas_regionales,
        signos_vitales: model.signos_vitales,
        frecuencia_cardiaca: model.frecuencia_cardiaca,
        pulso: model.frecuencia_cardiaca,
        temperatura: model.temperatura,
        presion: model.presion,
        altura: model.altura,
        imc: model.imc,
        pesoIdeal: model.pesoIdeal,
        examen_fisico_general: model.examen_fisico_general,
        siguiente_cita: model.siguiente_cita,
        cedula_paciente: model.cedula_paciente,
        cedula_medico: model.cedula_medico
    });

    historial.save();
    res.send(historial.toObject());
})

/* Método PUT */
router.put("/:id", async (req, res) => {
    try{
        const id = req.params.id;
        const model = req.body;

        const updateHistorial = await Historial.findOneAndUpdate(
            {_id: id},
            model,
            {new: true}
        );

        if (!updateHistorial){
            return res.status(404).json({
                message: "Historial not found"
            })
        }

        res.json({
            message: "Historial actualizado correctamente",
            data: updateHistorial
        });

    } catch(err){
        res.status(500).json({
            error: "Error al actualizar el historial",
            details: err.message
        })        
    }
})

module.exports = router;