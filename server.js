import express from "express";
import cors from "cors";
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

// setup server port
// access the .env file port variable or just use 5000 as default
const port = properties.get("PORT") || 5000;
const mongoUri = properties.get("MONGODB_URI");

// create a mongodb instance of the client using the connection string from the db.properties file
const client = new MongoClient(mongoUri);
let db;

// function to connect to the database
async function connectDB() {
    try {
        await client.connect();
        db = client.db("FullStackCoursework") // create database from client connection
        console.log("Connected to MongoDB Database");
    } catch (error) {
        console.error("Database connection failed: ", error);
    }
}

await connectDB();

// Use Imported Routes

app.use(`/api/classes`, classesRouter(db));

app.get(`/`, (req, res) => {
    res.send("Backend is connected");
});

app.listen(port, () => console.log(`Server running on port ${port}`));
