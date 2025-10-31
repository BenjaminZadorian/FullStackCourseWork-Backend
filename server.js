import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
// import routes
import classesRouter from "./routes/classes.js"
import PropertiesReader from "properties-reader";

// load db.properties
const properties = PropertiesReader("db.properties");

// setup basic app config
const app = express();
app.use(cors());
app.use(express.json())
// connect to test route
app.use(`/api/classes`, classesRouter);

// setup server port
// access the .env file port variable or just use 5000 as default
const port = properties.get("PORT") || 5000;
const mongoUri = properties.get("MONGODB_URI");

// create a mongodb instance of the client using the connection string from the .env file
const client = new MongoClient(mongoUri);

// function to connect to the database
async function connectDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB Database");
    } catch (error) {
        console.error("Database connection failed: ", error);
    }
}

connectDB();

// test route
app.get(`/`, (req, res) => {
    res.send("Backend is connected");
});

app.listen(port, () => console.log(`Server running on port ${port}`));
