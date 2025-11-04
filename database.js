import { MongoClient } from "mongodb";
import PropertiesReader from "properties-reader";
// load db.properties
const properties = PropertiesReader("db.properties");

const mongoUri = properties.get("MONGODB_URI");

// create a mongodb instance of the client using the connection string from the db.properties file
const client = new MongoClient(mongoUri);

let db;

// function to connect to the database
export async function connectDB() {
    try {
        await client.connect();
        db = client.db("FullStackCoursework") // create database from client connection
        console.log("Connected to MongoDB Database");
    } catch (error) {
        console.error("Database connection failed: ", error);
    }
}

// function to get the database for a route to call
export function getDB() {
    if (!db) {
        throw new Error("Error: Database is not connected");
    } else {
        return db;
    }
}