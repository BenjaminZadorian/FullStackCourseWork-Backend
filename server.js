import express from "express";
import cors from "cors";
import { connectDB } from "./database.js";
import PropertiesReader from "properties-reader";
import logger from "./middleware/logger.js";
import returnImages from "./middleware/returnImages.js"
import path from "path";
import fs from "fs";

// import routes
import lessonsRouter from "./routes/lessons.js";
import registerRouter from "./routes/register.js";
import loginRouter from "./routes/login.js"
import ordersRouter from "./routes/orders.js";

// load db.properties
//const properties = PropertiesReader("db.properties");
// properties.get("PORT") || 

// setup basic app config
const PORT = process.env.PORT || 5000 ;
const app = express();
// get the path from the current working directory to the icons
const iconPath = path.join(process.cwd(), `images/icons`);

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
// add logger to the backend to print out all routes when used
app.use(logger);

// add the backend to return the icons for the lessonList
app.use(`/icons`, express.static(iconPath));

// return an error if the file that the frontend is searching for cannot be found
app.use(`/icons`, (req, res) => {
  const fileToCheck = path.join(iconPath, req.path);

  if (!fs.existsSync(fileToCheck)) {}
  return res.status(404).json({error: "Icon not found"});
})


app.get(`/`, (req, res) => {
    res.send('Backend connected');
})


const start = async () => {
  try {
    const db = await connectDB();
    console.log("Database connected");

    app.use("/lessons", lessonsRouter(db));
    app.use("/register", registerRouter(db));
    app.use("/login", loginRouter(db));
    app.use("/orders", ordersRouter(db));

    // error handler
    app.use((req, res) => {
      console.log(`404 - ${req.method} ${req.url}`);
      res.status(404).json({ error: "Not found" });
    });

    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );

  } catch (err) {
    console.error("Failed to connect to the database:", err);
  }
};

start();