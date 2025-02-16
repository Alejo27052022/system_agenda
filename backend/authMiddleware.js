const jwt = require('jsonwebtoken');
const Admin = require('./bd/admin');
const Medico = require('./bd/medico');
const JWT_SECRET = "pato123"; // Asegúrate de que coincida con el login

async function verifyToken(req, res, next) {
    try {
        const token = req.header('Authorization')?.split(' ')[1];
        console.log("🔑 Token recibido:", token);

        if (!token) {
            return res.status(401).json({ message: "Acceso denegado, token no proporcionado" });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        console.log("✅ Token decodificado:", decoded);

        const { correo } = decoded;

        // Buscar usuario en ambas colecciones
        let usuario = await Admin.findOne({ correo });
        let tipo = 'admin';

        if (!usuario) {
            usuario = await Medico.findOne({ correo });
            tipo = 'medico';
        }

        if (!usuario) {
            return res.status(403).json({ message: "Acceso denegado, usuario no encontrado" });
        }

        // Guardar usuario directamente en `req.user`
        req.user = { tipo, ...usuario.toObject() };
        next();

    } catch (err) {
        console.error("❌ Error al verificar token:", err);
        return res.status(401).json({ message: "Token no válido" });
    }
}


module.exports = verifyToken;


