import express from "express";
import cors from "cors";
import { connectDB } from "./database.js";
import PropertiesReader from "properties-reader";

// import routes
import lessonsRoutes from "./routes/lessons.js"

// load db.properties
const properties = PropertiesReader("db.properties");

// setup basic app config
const PORT = properties.get("PORT") || 5000;
const app = express();

app.use(cors());
app.use(express.json());



app.get(`/`, (req, res) => {
    res.send('Backend connected');
})

connectDB().then((db) => {

    // Connect routes
    app.use('/lessons', lessonsRoutes(db));

    app.listen(PORT, () => console.log(`Server connected on port ${PORT}`));
}).catch((error) => {
    console.error("Failed to connect to the database: ", error);
})