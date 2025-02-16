const express = require("express");
const router = express.Router();
const Medicamentos = require("./../bd/medicamentos")
const Counter = require("./../bd/counter");

/* Método GET */
router.get("", async (req, res) => {
    try {
        const medicamentosData = await Medicamentos.find();
        res.json(medicamentosData);
    } catch (error) {
        res.status(500).json({
            error: "Error al obtener los medicamentos"
        })
    }
})

/* Buscar medicamento */
router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try{
    const medicamento = await Medicamentos.findOne({ _id: id }); 

    if(!medicamento) {
      return res.status(404).json({
        message: "Medicamento no encontrado"
      });
    }

    res.json(medicamento);
  } catch (error) {
    res.status(500).json({
      error: "Error al buscar el medicamento"
    });
  }
})

/* Método POST */
router.post("", async (req, res) => {
    let model = req.body;
  
    try {
      // Obtener el siguiente valor del contador
      const counter = await Counter.findOneAndUpdate(
        { name: "medicamentos" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
  
      // Crear el ID personalizado
      const idPersonalizado = `MED-${String(counter.seq).padStart(2, "0")}`;
  
      let medicamentos = new Medicamentos({
        _id: idPersonalizado,
        nombre_medicamento: model.nombre_medicamento,
        gramos: model.gramos,
        descripcion: model.descripcion,
        composicion: model.composicion,
        tipo_via: model.tipo_via,
        fabricante_medico: model.fabricante_medico,
        cantidad: model.cantidad
      });
  
      await medicamentos.save();
  
      res.status(201).json({
        message: "Medicamento agregado correctamente",
        data: medicamentos.toObject(),
      });
    } catch (error) {
      res.status(500).json({
        error: "Error al guardar el medicamento",
        details: error.message,
      });
    }
});

/* Método PUT */
router.put("/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const model = req.body;
  
      delete model.nombre_medicamento;
      delete model.gramos;
  
      const updateMedicamentos = await Medicamentos.findOneAndUpdate(
        { _id: id },
        { $set: model },
        { new: true }
      );
  
      if (!updateMedicamentos) {
        return res.status(404).json({
          message: "Medicamento no encontrado"
        });
      }
  
      res.status(200).json(updateMedicamentos);
  
    } catch (err) {
      res.status(500).json({
        error: "Error al actualizar el medicamento",
        details: err.message
      });
    }
  });
  

module.exports = router;