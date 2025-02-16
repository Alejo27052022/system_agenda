const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Importa cors
const app = express();
const port = 3000;
const administradorRouter = require("./routes/admin_router");
const pacienteRouter = require("./routes/paciente_router");
const medicoRouter = require("./routes/medico_router");
const medicamentoRouter = require("./routes/medicamentos_router");
const tipoexamenesRouter = require("./routes/tipo_examen_router");
const citaRouter = require("./routes/cita_router")
const historiaRouter = require("./routes/historial_router")
const examenRouter = require("./routes/examenes_router")

// Configurar CORS
app.use(cors({
    origin: 'http://localhost:4200', // Permitir solo solicitudes desde el frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'] // Encabezados permitidos
}));

app.use(express.json());

app.get("/", function (req, res) {
    res.send("Server Running");
});

app.use("/Admin", administradorRouter);
app.use("/Admin/Medicamentos", medicamentoRouter);
app.use("/Admin/TipoExamenes", tipoexamenesRouter);
app.use("/Medico/Cita", citaRouter);
app.use("/Medico/Historial", historiaRouter);
app.use("/Medico/Examen", examenRouter);
app.use("/Paciente", pacienteRouter);
app.use("/Medico", medicoRouter);

async function connection() {
    try {
        await mongoose.connect("mongodb+srv://aleedev:YjsjfY18t3zWiXfc@sistemaagenda.v64qu.mongodb.net/?retryWrites=true&w=majority&appName=SistemaAgenda", {
            dbName: "sistema_medico"
        });
        console.log("Connection to MongoDB started");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

connection();

app.listen(port, () => {
    console.log("Server running on port " + port);
});


