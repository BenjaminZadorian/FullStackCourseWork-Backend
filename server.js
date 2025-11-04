import express from "express";
import cors from "cors";
import { connectDB } from "./database.js";
import PropertiesReader from "properties-reader";
// import routes
import classesRouter from "./routes/classes.js"

// setup basic app config
const port = properties.get("PORT") || 5000;
const app = express();

app.use(cors());
app.use(express.json());

connectDB().then(() => {
    app.listen(port, () => console.log(`Server connected on port ${PORT}`));
})