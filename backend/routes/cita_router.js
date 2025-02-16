const express = require('express');
const router = express.Router();
const authMiddleware = require('../authMiddleware');
const Cita = require('./../bd/cita_medica');
const Paciente = require('./../bd/paciente');
const Medico = require('./../bd/medico');
const mongoose = require('mongoose');  // Asegúrate de importar mongoose

/* Rutas para Citas Medicas */

// GET: Obtener citas según el rol del usuario
router.get("/", authMiddleware, async (req, res) => {
  try {
      if (req.user.tipo === 'admin') {
          // Si es un administrador, puede ver todas las citas
          const citas = await Cita.find()
              .populate('cedula_paciente', 'cedula primer_nombre primer_apellido sexo telefono direccion fecha_nacimiento enfermedad_herencia alergia')
              .populate('cedula_medico', 'primer_nombre primer_apellido');
          return res.json(citas);
      }

      if (req.user.tipo === 'medico') {
          // Si es un médico, solo puede ver sus propias citas
          const citas = await Cita.find({ cedula_medico: req.user._id })
              .populate('cedula_paciente', 'cedula primer_nombre primer_apellido sexo telefono direccion fecha_nacimiento enfermedad_herencia alergia')
              .populate('cedula_medico', 'primer_nombre primer_apellido');
          return res.json(citas);
      }

      return res.status(403).json({ message: "Acceso denegado." });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error interno del servidor." });
  }
});


// GET: Obtener una cita por ID (requiere autenticación)
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const cita = await Cita.findById(req.params.id).populate('cedula_paciente cedula_medico');
    
    // Verifica si la cita pertenece al médico que la solicita
    if (req.user.rol === 'medico' && cita.cedula_medico.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'No tienes permiso para acceder a esta cita' });
    }
    
    if (!cita) {
      return res.status(404).json({ message: 'Cita no encontrada' });
    }
    
    res.json(cita);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la cita' });
  }
});


// POST: Crear una nueva cita (requiere autenticación de médico)
router.post('/', authMiddleware, async (req, res) => {
  try {
    console.log("📥 Datos recibidos en backend:", req.body);
    console.log("👤 Usuario autenticado:", req.user);

    const { fecha_cita, hora_inicio, estado, motivo, cedula_paciente } = req.body;
    const cedula_medico = req.user.cedula_medico; // Extraído del token

    if (!fecha_cita || !hora_inicio || !estado || !motivo || !cedula_paciente) {
      console.error("⚠️ Falta información en la solicitud");
      return res.status(400).json({ error: "Faltan datos requeridos" });
    }

    // 🔎 Buscar el ID del paciente en la base de datos usando la cédula
    const paciente = await Paciente.findOne({ cedula: cedula_paciente });
    if (!paciente) {
      console.error("🚫 Paciente no encontrado");
      return res.status(404).json({ error: "Paciente no encontrado" });
    }

    // 🔎 Buscar el ID del médico en la base de datos usando la cédula
    console.log("🔎 Buscando médico con cédula:", cedula_medico);
    const medico = await Medico.findOne({ cedula_medico: String(cedula_medico).trim() });
    console.log("📌 Resultado de la búsqueda:", medico);
    if (!medico) {
      console.error("🚫 Médico no encontrado");
      return res.status(404).json({ error: "Médico no encontrado" });
    }

    // Crear la nueva cita con los IDs correctos
    const nuevaCita = new Cita({
      fecha_cita,
      hora_inicio,
      estado,
      motivo,
      cedula_paciente: paciente._id, // ✅ Asignar el ObjectId real del paciente
      cedula_medico: medico._id // ✅ Asignar el ObjectId real del médico
    });

    await nuevaCita.save();
    console.log("✅ Cita guardada correctamente");
    res.status(201).json(nuevaCita);

  } catch (error) {
    console.error("❌ Error al guardar la cita:", error);
    res.status(500).json({ error: "Error interno del servidor", details: error.message });
  }
});



// PUT: Actualizar una cita (requiere autenticación de médico o administrador)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const citaId = req.params.id;
    const updateCita = await Cita.findByIdAndUpdate(
      citaId,
      req.body,
      { new: true, runValidators: true }
    ).populate('cedula_paciente cedula_medico');

    if (!updateCita) {
      return res.status(404).json({ message: 'Cita no encontrada' });
    }

    res.json({ message: 'Cita actualizada correctamente', data: updateCita });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar la cita', details: err.message });
  }
});

// DELETE: Eliminar una cita (requiere autenticación de administrador)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const cita = await Cita.findByIdAndDelete(req.params.id);
    if (!cita) {
      return res.status(404).json({ message: 'Cita no encontrada' });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la cita' });
  }
});

// Método GET para obtener las citas de un médico
router.get('/medico/:id', authMiddleware, async (req, res) => {
  try {
    const citasMedico = await Cita.find({ cedula_medico: req.params.id }).populate('cedula_paciente').populate('cedula_medico');
    res.json(citasMedico);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las citas del médico' });
  }
});


module.exports = router;
