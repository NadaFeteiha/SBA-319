import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
    city: {
        type: String,
        required: true
    },
    state: {// not required because not all countries have states
        type: String,
    },
    country: {
        type: String,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Location", locationSchema);