import express from "express";

export default function ordersRouter(db) {
    const router = express.Router();

    // POST: a new order
    router.post(`/`, async (req, res) => {
        try {
            const { userId, userName, userPhone, lessonIds, lessonSpaces} = req.body;

            if (!userName || !userPhone || !lessonIds || !lessonSpaces) {
                return res.status(400).json({ message: "All fields are required" });
            }

            const orderCollections = db.collection("orders");

            await orderCollections.insertOne({
                userId: userId,
                userName: userName,
                userPhone: userPhone,
                lessonIds: lessonIds,
                lessonSpaces: lessonSpaces,
                orderDate: new Date()
            });

            res.status(201).json({message: "Order successfully added"});

        } catch (error) {
            console.error("Order failed: ", error);
            res.status(500).json({message: "Order Error"});
        }
    });
    
    // GET: get all orders for a chosen user
    router.get(`/user/:userId`, async (req, res) => {
        try {
            const { userId } = req.params;

            const orderCollections = db.collection("orders");

            const results = await orderCollections.find({
                userId: userId
            }).toArray();

            return res.json(results);
        } catch (error) {
            console.error("Order retrival failed: ", error);
            res.status(500).json({message: "Retrival Error"});
        }
    })

    return router;

}