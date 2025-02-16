const express = require('express');
const router = express.Router();
const authMiddleware = require('../authMiddleware');
const Receta = require('../bd/recetas');

/* Rutas para Recetas Médicas */

// GET: Obtener todas las recetas (requiere autenticación)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const recetas = await Receta.find().populate('codigo_historial_clinico codigo_medicamento');
    res.json(recetas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las recetas' });
  }
});

// GET: Obtener una receta por ID (requiere autenticación)
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const receta = await Receta.findById(req.params.id).populate('codigo_historial_clinico codigo_medicamento');
    if (!receta) {
      return res.status(404).json({ message: 'Receta no encontrada' });
    }
    res.json(receta);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la receta' });
  }
});

// POST: Crear una nueva receta (requiere autenticación)
router.post('/', authMiddleware, async (req, res) => {
  const { indicaciones, recomendaciones, frecuencia, tiempo, codigo_historial_clinico, codigo_medicamento } = req.body;

  try {
    const nuevaReceta = new Receta({
      indicaciones,
      recomendaciones,
      frecuencia,
      tiempo,
      codigo_historial_clinico,
      codigo_medicamento
    });

    await nuevaReceta.save();
    res.status(201).json(nuevaReceta);
  } catch (error) {
    console.error('Error al guardar la receta:', error);
    res.status(500).json({ error: 'Error al guardar la receta', details: error.message });
  }
});

// PUT: Actualizar una receta (requiere autenticación)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const recetaId = req.params.id;
    const recetaActualizada = await Receta.findByIdAndUpdate(
      recetaId,
      req.body,
      { new: true, runValidators: true }
    ).populate('codigo_historial_clinico codigo_medicamento');

    if (!recetaActualizada) {
      return res.status(404).json({ message: 'Receta no encontrada' });
    }

    res.json({ message: 'Receta actualizada correctamente', data: recetaActualizada });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar la receta', details: err.message });
  }
});

// DELETE: Eliminar una receta (requiere autenticación)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const receta = await Receta.findByIdAndDelete(req.params.id);
    if (!receta) {
      return res.status(404).json({ message: 'Receta no encontrada' });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la receta' });
  }
});

// GET: Buscar recetas por nombre de medicamento (requiere autenticación)
router.get('/buscar', authMiddleware, async (req, res) => {
  const nombreMedicamento = req.query.nombre;
  try {
    const recetas = await Receta.find()
      .populate({
        path: 'codigo_medicamento',
        match: { nombre: { $regex: nombreMedicamento, $options: 'i' } }
      });

    const recetasFiltradas = recetas.filter(receta => receta.codigo_medicamento);
    res.json(recetasFiltradas);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar recetas por nombre de medicamento' });
  }
});

module.exports = router;
