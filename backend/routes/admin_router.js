const express = require("express");
const router = express.Router();
const Admin = require("./../bd/admin")

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