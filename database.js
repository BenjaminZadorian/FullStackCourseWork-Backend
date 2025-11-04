import { MongoClient } from "mongodb";
import PropertiesReader from "properties-reader";
// load db.properties
//const properties = PropertiesReader("db.properties");

const mongoUri = properties.get("MONGODB_URI") || process.env.MONGODB_URI;

// create a mongodb instance of the client using the connection string from the db.properties file
const client = new MongoClient(mongoUri);

let db;

// function to connect to the database
export async function connectDB() {

    // return existing database if already connected
    if (db) return db;

    try {

        await client.connect();
        db = client.db("FullStackCoursework") // create database from client connection
        console.log("Connected to MongoDB Database");
        return db

    } catch (error) {
        console.error("Database connection failed: ", error);
        throw error;
    }
}