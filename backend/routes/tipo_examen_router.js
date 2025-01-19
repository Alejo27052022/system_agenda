const express = require("express")
const router = express.Router();
const TipoExamen = require("../bd/tipos_examenes")

/* Método GET*/
router.get("", async (req, res) => {
    try {
        const tipo_examenData = await TipoExamen.findById();
        res.json(tipo_examenData);
    } catch (error) {
        res.status(500).json({
            error: "Error al obtener el tipo de examen"
        })
    }
})

/* Método POST*/
router.post("", async (req, res) => {
    let model = req.body;

    let tipo_examen = new TipoExamen({
        nombre_examen: model.nombre_examen,
        categoria: model.categoria,
        unidad_medida: model.unidad_medida,
        rango_normal: model.rango_normal,
        min: model.min,
        max: model.max
    });

    tipo_examen.save();
    res.send(tipo_examen.toObject());
})

/* Método PUT */
router.put("/:id", async(req, res) => {
    try{
        const id = req.params.id;
        const model = req.body;

        const updateTipoExamen = await TipoExamen.findOneAndUpdate(
            {_id: id},
            model,
            {new: true}
        );

        if(!updateTipoExamen){
            return res.status(404).json({
                message: "Tipo de Examen not found"
            })
        }

        res.json({
            message: "Tipo de Examen actualizado correctamente",
            data: updateTipoExamen
        });
        
    } catch(err){
        res.status(500).json({
            error: "Error al actualizar el tipo de Examen",
            details: err.message
        })
    }
})

module.exports = router;