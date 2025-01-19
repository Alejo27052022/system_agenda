const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const Admin = require("./../bd/admin")
const verifyToken = require("../authMiddleware")

// Ejemplo de Ruta Protegida
router.get('/protected', verifyToken, (req, res) => {
    res.json({
        message: 'Ruta protegida accedida con éxito',
        user: req.user
    });
});

/* Secret key para JWT (usa una variable de entorno en producción) */
const JWT_SECRET = "pato123"

/* Método GET */
router.get("", async (req, res) => {
    try {
        const adminData = await Admin.find();
        res.json(adminData);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener administradores." });
    }
});

/* Método POST */
router.post("", async (req, res) => {
    const { nombre, apellido, correo, password, telefono } = req.body;
    try {
        console.log("Datos recibidos para registro:", req.body); // <-- Aquí
        const hashedPassword = await bcrypt.hash(password, 10);
        const admin = new Admin({
            nombre,
            apellido,
            correo,
            password: hashedPassword,
            telefono,
        });

        console.log("Datos procesados para guardar:", admin); // <-- Aquí
        await admin.save();
        res.json(admin.toObject());
    } catch (error) {
        console.error("Error al guardar administrador:", error); // <-- Aquí
        res.status(500).json({ error: "Error al guardar el administrador", details: error.message });
    }
});


/* Método POST para Login */
router.post("/login", async (req, res) => {
    const { correo, password } = req.body;
    try {
        console.log("Intento de login con correo:", correo); // <-- Aquí
        const admin = await Admin.findOne({ correo });
        if (!admin) {
            console.log("Usuario no encontrado para el correo:", correo); // <-- Aquí
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        console.log("Validando contraseña para usuario:", admin.correo); // <-- Aquí
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            console.log("Contraseña incorrecta para usuario:", admin.correo); // <-- Aquí
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }

        const token = jwt.sign({ id: admin._id, correo: admin.correo }, JWT_SECRET, { expiresIn: "1h" });
        res.json({ 
            message: "Login Exitoso", token, name: admin.nombre + " " + admin.apellido
        });
    } catch (err) {
        console.error("Error en el servidor durante login:", err); // <-- Aquí
        res.status(500).json({ error: "Error en el servidor", details: err.message });
    }
});


/* Método PUT */
router.put("/:id", async (req, res) => {
    try{
        const id = req.params.id;
        const model = req.body;

        const updateAdmin = await Admin.findOneAndUpdate(
            {_id: id},
            model,
            {new: true}
        );

        if (!updateAdmin) {
            return res.status(404).json({ message: "Admin no encontrado"});
        }

        res.json({message: "Admin actualizado correctamente", data:updateAdmin});
    }
    catch (err) {
        res.status(500).json({error: "Error al actualizar el administrador", details: err.message});
    }
})


module.exports = router;