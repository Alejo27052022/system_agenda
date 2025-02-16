const express = require('express');
const router = express.Router();
const authMiddleware = require('../authMiddleware');
const Examen = require('../bd/examenes');

/* Rutas para Exámenes Médicos */

// GET: Obtener todos los exámenes (requiere autenticación)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const examenes = await Examen.find().populate('codigo_historial_clinico');
    res.json(examenes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los exámenes' });
  }
});

// GET: Obtener un examen por ID (requiere autenticación)
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const examen = await Examen.findById(req.params.id).populate('codigo_historial_clinico');
    if (!examen) {
      return res.status(404).json({ message: 'Examen no encontrado' });
    }
    res.json(examen);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el examen' });
  }
});

// POST: Crear un nuevo examen (requiere autenticación)
router.post('/', authMiddleware, async (req, res) => {
  const { tipo_examen, resultado, fecha_examen, observaciones, codigo_historial_clinico } = req.body;

  try {
    const nuevoExamen = new Examen({
      tipo_examen,
      resultado,
      fecha_examen,
      observaciones,
      codigo_historial_clinico
    });

    await nuevoExamen.save();
    res.status(201).json(nuevoExamen);
  } catch (error) {
    console.error('Error al guardar el examen:', error);
    res.status(500).json({ error: 'Error al guardar el examen', details: error.message });
  }
});

// PUT: Actualizar un examen (requiere autenticación)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const examenId = req.params.id;
    const examenActualizado = await Examen.findByIdAndUpdate(
      examenId,
      req.body,
      { new: true, runValidators: true }
    ).populate('codigo_historial_clinico');

    if (!examenActualizado) {
      return res.status(404).json({ message: 'Examen no encontrado' });
    }

    res.json({ message: 'Examen actualizado correctamente', data: examenActualizado });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar el examen', details: err.message });
  }
});

// DELETE: Eliminar un examen (requiere autenticación)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const examen = await Examen.findByIdAndDelete(req.params.id);
    if (!examen) {
      return res.status(404).json({ message: 'Examen no encontrado' });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el examen' });
  }
});

// GET: Buscar exámenes por tipo (requiere autenticación)
router.get('/buscar', authMiddleware, async (req, res) => {
  const tipoExamen = req.query.tipo;
  try {
    const examenes = await Examen.find({ tipo_examen: { $regex: tipoExamen, $options: 'i' } }).populate('codigo_historial_clinico');
    res.json(examenes);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar exámenes por tipo' });
  }
});

module.exports = router;
