import express from "express";

export default function ordersRouter(db) {
    const router = express.Router();

    router.post(`/`, async (req, res) => {
        try {
            const { userName, userId, lessonId, lessonTopic, lessonDate, lessonLocation} = req.body;

            if (!userName || !userId || !lessonId || !lessonTopic || !lessonDate || !lessonLocation) {
                return res.status(400).json({ message: "All fields are required" });
            }

            const orderCollections = db.collection("orders");

            await orderCollections.insertOne({
                userName: userName,
                userId: userId,
                lessonId: lessonId,
                lessonTopic: lessonTopic,
                lessonDate: lessonDate,
                lessonLocation: lessonLocation,
                orderDate: new Date()
            });

            res.status(201).json({message: "Order successfully added"});

        } catch (error) {
            console.error("Order failed: ", error);
            res.status(500).json({message: "Order Error"});
        }
    });

    return router;

}