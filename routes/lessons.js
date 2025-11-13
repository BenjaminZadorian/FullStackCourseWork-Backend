import express from "express";

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
  router.put(`/:id`, async(req, res) => {
    try {

      const lessonId = req.params.id;
      const updateData = req.body;

      if (!ObjectId.isValid(lessonId)) {
        return res.status(400).json({message: "Invalid lesson iD"});
      }

      if (!updateData || Object.keys(updateData).length === 0) {
        return res.status(400).json({ message: "No update data provided" });
      }

            let query;
            if (ObjectId.isValid(lessonId)) {
              query = { _id: new ObjectId(lessonId) };
            } else {
              query = { _id: lessonId };
            }

      const data = await lessonsCollection.updateOne(
        { _id: new ObjectId(lessonId) },
        { $set: updateData }
      );

      if (data.matchedCount === 0) {
        return res.status(404).json({ message: "Lesson not found" });
      }

      res.status(200).json({ message: "Lesson updated" });

    } catch (error) {
      console.error("Error fetching lessons:", error);
      res.status(500).json({ message: "Error retrieving lessons" });
    }
  })

  return router;
}