import express from "express";
import cors from "cors";
import { connectDB } from "./database.js";
import PropertiesReader from "properties-reader";

// import routes
import lessonsRouter from "./routes/lessons.js"

// load db.properties
const properties = PropertiesReader("db.properties");

// setup basic app config
const PORT = properties.get("PORT") || 5000;
const app = express();

app.use(cors());
app.use(express.json());

connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server connected on port ${PORT}`));
})