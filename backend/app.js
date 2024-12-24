const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const administradorRouter = require("./routes/admin_router");
const pacienteRouter = require("./routes/paciente_router");
const medicoRouter = require("./routes/medico_router");

app.use(express.json());
app.get("/", function (req, res) {
    res.send("Server Running")
});

app.use("/Admin", administradorRouter);
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

app.listen(port,()=>(
    console.log("Server running on port" + port)
))

