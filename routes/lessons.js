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
      const { newSpaces } = req.body;

      if (newSpaces === undefined || newSpaces === null) {
        return res.status(400).json({message: "Invalid number of spaces"});
      }

      const objectId = new ObjectId(lessonId);
      const result = await lessonsCollection.updateOne(
        { _id: objectId},
        { $set: {spaces: newSpaces}}
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