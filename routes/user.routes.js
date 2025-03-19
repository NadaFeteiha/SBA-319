import { Router } from "express";
import { User } from "../models/Users.js";

export const userRouter = new Router();

// wrap with try-catch block to catch the error
userRouter.get('/', (req, res) => {
    res.status(200).json({ "status": 'ok', "message": 'Welcome to the user route' });
});

userRouter.get("/all", async (req, res) => {
    try {
        let users = await User.find();
        res.status(200).json({
            status: true,
            data: users.map(user => {
                return {
                    id: user._id,
                    userName: user.userName,
                    name: user.name,
                    email: user.email
                }
            })
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
}
);

userRouter.post("/register", async (req, res) => {
    try {
        const { name, email, password, userName } = req.body;

        let user = await User.findOne({ email: email });
        if (user) return res.status(400).json({ error: "Email already exists" });

        user = await User.findOne({ userName: userName });
        if (user) return res.status(400).json({ error: "Username already exists" });

        let result = await User.create({
            userName: userName,
            name: name,
            email: email,
            password: password
        });

        res.status(201).json({
            status: true,
            message: "User registered successfully",
            data: {
                userName: result.userName,
                name: result.name,
                email: result.email
            }
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
});

export default userRouter;
