import { Router } from "express";
import { User } from "../models/Users.js";
import { Location } from "../models/Location.js";
import { cache } from "react";

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

userRouter
    .get("/:username", async (req, res) => {
        try {
            const user = await User.findOne({ userName: req.params.username });
            if (!user) return res.status(404).json({ error: "User not found" });

            res.status(200).json({
                status: true,
                data: {
                    id: user.id,
                    userName: user.userName,
                    name: user.name,
                    email: user.email
                }
            });

        } catch (error) {
            res.status(500).json({
                status: false,
                message: error.message
            });
        }
    })
    .patch("/:username", async (req, res) => {
        try {

            // user can update only the name ,email
            let updatedUser = await User.findOneAndUpdate(
                { userName: req.params.username },
                {
                    name: req.body.name,
                    email: req.body.email
                },
                { new: true }
            );

            res.status(200).json({
                status: true,
                message: "User updated!",
                data: {
                    userName: updatedUser.userName,
                    name: updatedUser.name,
                    email: updatedUser.email
                }
            });
        } catch (error) {
            res.status(500).json({
                status: false,
                message: error.message
            });
        }
    })
    .delete("/:username", async (req, res) => {
        try {
            const user = await
                User.findOneAndDelete({ userName: req.params.username });

            if (!user) return res.status(404).json({ error: "User not found" });

            res.status(200).json({
                status: true,
                message: "User deleted!"
            });

        } catch (error) {
            res.status(500).json({
                status: false,
                message: error.message
            });
        }
    });



userRouter.post("/:userId/add-city", async (req, res) => {
    try {
        const { city, state, country } = req.body;

        let location = await getOrAddCity(city, state, country);
        console.log(`Location ===> ${location}`);

        let user = await User.findById(req.params.userId);
        console.log(`User ===> ${user}`);

        // if (user.locations.includes(location.id))
        //     return res.status(400).json({
        //         status: false,
        //         message: "City already added"
        //     });

        // user.locations.push(location.id);
        // let result = await user.save();

        let result = await User.findByIdAndUpdate(
            req.params.userId,
            { $addToSet: { locations: location.id } },
            { new: true }
        );

        res.status(201).json({
            status: true,
            message: "City added successfully",
            data: {
                userName: result.userName,
                name: result.name,
                email: result.email,
                locations: result.locations
            }
        })

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
});

export default userRouter;



// Helper Function
async function getOrAddCity(city, state, country) {
    let location = await Location.findOne({ city: city });
    if (!location) {
        location = await Location.create({ city: city, state: state, country: country });
    }
    return location;
}