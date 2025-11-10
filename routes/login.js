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
            if (!user) {
                res.status(401).json({ message: "Invalid credentials" });
            }

            const passwordMatch = await bcrypt.compare(password, existingUser.password);

            // return if the passwords do not match
            if (!passwordMatch) {
                res.status(401).json({ message: "Invalid credentials" });
            }

            const loggedInUser = {
                _id: user._id,
                username: user.username,
                email: user.email,
                phone: user.phone,
                password: user.password, 
                createdAt: user.createdAt
            }

            return res.json({message: "Login Successful", user: loggedInUser});
        } catch (error) {
            console.error("Login error:", error);
            return res.status(500).json({ message: "Server error" });
        }
    })
    return router;
}