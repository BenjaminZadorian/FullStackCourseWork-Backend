import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
// import routes
import classesRouter from "./routes/classes.js"
// setup the environmental vars
dotenv.config();

// setup basic app config
const app = express();
app.use(cors());
app.use(express.json())
// connect to test route
app.use(`/api/classes`, classesRouter);

// setup server port
// access the .env file port variable or just use 5000 as default
const port = process.env.PORT || 5000

// create a mongodb instance of the client using the connection string from the .env file
const client = new MongoClient(process.env.MONGODB_URI);

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