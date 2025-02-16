const express = require("express")
const router = express.Router();
const TipoExamen = require("../bd/tipos_examenes")

/* Método GET*/
router.get("", async (req, res) => {
    try {
        const tipo_examenData = await TipoExamen.find();
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
    console.log(req.body);
  
    try {
      let tipo_examen = new TipoExamen({
        nombre_examen: model.nombre_examen,
        categoria: model.categoria,
        unidad_medida: model.unidad_medida,
        rango_normal: {
          min: model.rango_normal.min,
          max: model.rango_normal.max
        }
      });
  
      await tipo_examen.save(); // Importante usar await para esperar la operación
      res.status(201).json({
        message: "Tipo de examen agregado correctamente",
        data: tipo_examen
      });
    } catch (error) {
      if (error.code === 11000) {
        res.status(400).json({ code: 11000, message: "El nombre del examen ya existe" });
      } else {
        res.status(500).json({ message: "Error al agregar el tipo de examen" });
      }
    }
  });
  

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