import express from "express";

// create a function to export that controls database calls from this route
export default function classesRouter(db) {
  const router = express.Router();

  // GET all classes
  router.get(`/`, async (req, res) => {
    try {
      const classesCollection = db.collection("classes");
      const classes = await classesCollection.find().toArray();
      res.json(classes);
    } catch (error) {
      console.error("Error fetching classes:", error);
      res.status(500).json({ message: "Error retrieving classes" });
    }
  })

  return router;
}