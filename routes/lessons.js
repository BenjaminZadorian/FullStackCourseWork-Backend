import express from "express";

// create a function to export that controls database calls from this route
export default function lessonsRouter(db) {
  const router = express.Router();

  // GET all lessons
  router.get(`/`, async (req, res) => {
    try {
      const lessonsCollection = db.collection("lessons");
      const lessons = await lessonsCollection.find().toArray();
      res.json(lessons);
      
    } catch (error) {
      console.error("Error fetching lessons:", error);
      res.status(500).json({ message: "Error retrieving lessons" });
    }
  });

  return router;
}