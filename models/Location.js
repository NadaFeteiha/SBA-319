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
    }
});

export const Location = mongoose.model('Location', locationSchema);