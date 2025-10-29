import express from "express";
const router = express.Router();

router.get("/", async (req, res) => {
  res.json([
    { id: 1, subject: "Math", price: 10 },
    { id: 2, subject: "Science", price: 15 },
  ]);
});

export default router