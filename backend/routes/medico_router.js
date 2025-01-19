const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require("express");
const router = express.Router();
const Medico = require("./../bd/medico")
const verifyToken = require("../authMiddleware")

/* Ruta protegida */
router.get('/protected', verifyToken, (req,res) => {
    res.json({
        message: 'Ruta protegida accedida con éxito',
        user: req.user
    })
})

/* SECRET KEY PARA JWT */
const JWT_SECRET = "pato123"

/* Método GET */
router.get("", async(req, res) => {
    try {
        const medicoData = await Medico.find();
        res.json(medicoData);
    } catch (error) {
        res.status(500).json({
            error: "Error al obtener los medicos"
        })
    }
})

/* Método POST*/
router.post("", async(req, res) => {
    const { cedula_medico, num_unico_medico, estado_licencia, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, correo, password, especialidad} = req.body;
    try {
        console.log("Datos recibidos para registro", req.body);
        const hashedPassword = await bcrypt.hash(password, 10);

        const medico = new Medico({
            cedula_medico,
            num_unico_medico,
            estado_licencia,
            primer_nombre,
            segundo_nombre,
            primer_apellido,
            segundo_apellido,
            correo,
            password: hashedPassword,
            especialidad
        });

        console.log("Datos procesados para guardar", medico);
        await medico.save();
        res.json(medico.toObject());

    } catch (error){
        console.error("Error al guardar el médico", error);
        res.status(500).json({
            error: "Error al guardar el médico"
        })
    }

})

/* Método POST para Login */
router.post("/login", async (req, res) => {
    const {correo, password} = req.body;
    try {
        console.log("Intento de login con correo: ", correo);
        const medico = await Medico.findOne({correo});
        if (!medico) {
            console.log("Medico no encontrado para el correo: ", correo)
            return res.status(404).json({
                message: "Médico no encontrado"
            })
        }

        console.log("Validando contraseña para usuario: ", medico.correo);
        const isPasswordValid = await bcrypt.compare(password, medico.password);
        if (!isPasswordValid) {
            console.log("Contraseña incorrecta para médico: ", medico.correo);
            return res.status(401).json({
                message: "Contraseña incorrecta"
            });
        }
        
        const token = jwt.sign({
            cedula_medico: medico.cedula_medico,
            correo: medico.correo },
            JWT_SECRET, {
                expiresIn: "1h"
            }
        );
        res.json({
            message: "Login Exitoso", token, name: medico.primer_nombre + " " + medico.primer_apellido
        })

    } catch (error) {
        console.error("Error en el servidor durante login: ", error);
        res.status(500).json({
            error: "Error en el servidor",
            details: error.message
        })
    }
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