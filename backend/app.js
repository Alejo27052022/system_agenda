const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const administradorRouter = require("./routes/admin_router");

app.use(express.json());
app.get("/", function (req, res) {
    res.send("Server Running")
});

app.use("/Admin", administradorRouter);

async function connection() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017", {
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

