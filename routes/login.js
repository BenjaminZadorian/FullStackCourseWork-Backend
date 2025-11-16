import express from "express";
import bcrypt from "bcrypt";

export default function loginRouter(db) {
    const router = express.Router();

    router.post(`/`, async (req, res) => {
        try {
            const { username, password } = req.body;

            if (!username || !password) {
                return res.status(400).json({ message: "All fields are required" });
            }

            const userCollections = db.collection("users");

            // check if user details exists with a current user
            const existingUser = await userCollections.findOne({username})

            // if user does not exist return error
            if (!existingUser) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            const passwordMatch = await bcrypt.compare(password, existingUser.password);

            // return if the passwords do not match
            if (!passwordMatch) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            // return the object of the logged in user
            return res.status(200).json({
                _id: existingUser._id,
                username: existingUser.username,
                email: existingUser.email,
                phone: existingUser.phone,
                password: existingUser.password, 
                createdAt: existingUser.createdAt
            });

        } catch (error) {
            console.error("Login error:", error);
            return res.status(500).json({ message: "Server error" });
        }
    })
    return router;
}