const express = require("express");
const router = express.Router();
const Admin = require("./../bd/admin")

router.get("", async (req, res) => {
    try {
        const adminData = await Admin.find();
        res.json(adminData);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener administradores." });
    }
});

router.post("", async (req, res) => {
    let model = req.body;

    let admin = new Admin({
        nombre: model.nombre,
        apellido: model.apellido,
        correo: model.correo,
        password: model.correo,
        telefono: model.telefono
    });
    admin.save();
    res.send(admin.toObject());
})

module.exports = router;