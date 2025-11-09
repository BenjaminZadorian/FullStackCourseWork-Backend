import express from "express";
import bcrypt from "bcrypt";

export default function registerRouter(db) {
    const router = express.Router();

    router.post(`/`, async (req, res) => {
        try {
            const { username, email, password, phone } = req.body;

            // if any information is missing, return the error status
            if (!username || !email || !password || !phone) {
                return res.status(400).json({ message: "All fields are required" });
            }

            const userCollections = db.collection("users");

            // check if an existing user exists
            const existingUser = await userCollections.findOne({$or: [{email}, {username}]})
            // if so, return and error status
            if (existingUser) {
                return res.status(409).json({message: "Username / Email already in use.  Please pick another"});
            }

            const hashedPassword = await bcrypt.hash(password, 12);

            // if all checks have passed, insert a new user
            await userCollections.insertOne({
                username: username,
                email: email,
                password: hashedPassword,
                phone: phone,
                createdAt: new Date()
            });

            res.status(201).json({message: "User successfully registered"});

        } catch (error) {
            console.error("Registration failed: ", error);
            res.status(500).json({message: "Registration error"})
        }
    });

    return router;
}