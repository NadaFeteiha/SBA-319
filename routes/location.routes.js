import { Router } from "express";
import { Location } from "../models/Location.js";

export const locationRouter = new Router();

locationRouter.get('/', (req, res) => {
    res.status(200).json({
        "status": 'ok',
        "message": 'Welcome to the location route'
    });
});

locationRouter.get("/cities", async (req, res) => {
    try {

        let locations = await Location.find();

        res.status(200).json({
            status: true,
            data: locations.map(location => {
                return {
                    id: location._id,
                    city: location.city,
                    state: location.state,
                    country: location.country
                }
            }
            )
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
}
);

locationRouter.post("/", async (req, res) => {
    try {
        const { city, state, country } = req.body;

        let location = await Location.findOne({ city: city, country: country });
        if (location) return res.status(400).json({
            status: false,
            message: "City already exists"
        });

        let result = await Location.create({
            city: city,
            state: state,
            country: country
        });

        res.status(201).json({
            status: true,
            message: "City added successfully",
            data: {
                city: result.city,
                state: result.state,
                country: result.country
            }
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
});



export default locationRouter;
