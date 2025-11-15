import express from "express";
import { ObjectId } from "mongodb";

// create a function to export that controls database calls from this route
export default function lessonsRouter(db) {
  const router = express.Router();
  const lessonsCollection = db.collection("lessons");

  // GET all lessons
  router.get(`/`, async (req, res) => {
    try {
      const lessons = await lessonsCollection.find().toArray();
      res.json(lessons);
      
    } catch (error) {
      console.error("Error fetching lessons:", error);
      res.status(500).json({ message: "Error retrieving lessons" });
    }
  });

  // PUT: update spaces after an order is confirmed
  router.put(`/:id`, async (req, res) => {
    try {

      const lessonId = req.params.id;
      const { spaces } = req.body;

      if (!spaces) {
        return res.status(400).json({message: "Invalid number of spaces"});
      }

      const objectId = newObjectId(lessonId);
      const result = await lessonsCollection.updateOne(
        { _id: objectId},
        { $set: {spaces: spaces}}
      );

      if (result.matchedCount === 0) {
        return res.status(404).json({message: "lesson not found"});
      }

      res.json({ message: "Lesson updated successfully" });

    } catch (error) {
      console.error("Error updating lessons:", error);
      res.status(500).json({ message: "Error updating lessons" });
    }
  })


  return router;
}