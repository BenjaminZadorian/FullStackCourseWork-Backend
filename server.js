import express from "express";
import cors from "cors";
import { connectDB } from "./database.js";
import PropertiesReader from "properties-reader";

// import routes
import lessonsRouter from "./routes/lessons.js";
import registerRouter from "./routes/register.js";

// load db.properties
//const properties = PropertiesReader("db.properties");
// properties.get("PORT") || 

// setup basic app config
const PORT = process.env.PORT || 5000 ;
const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());



app.get(`/`, (req, res) => {
    res.send('Backend connected');
})

connectDB().then((db) => {

    // Connect routes
    app.use('/lessons', lessonsRouter(db));
    app.use('/register', registerRouter(db))

    app.listen(PORT, () => console.log(`Server connected on port ${PORT}`));
}).catch((error) => {
    console.error("Failed to connect to the database: ", error);
})