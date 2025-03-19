import mongoose from "mongoose";

const weatherSchema = new mongoose.Schema({
    location_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Location", required: true
    },
    temp_c: {
        type: Number, required: true
    },
    temp_f: {
        type: Number
    },
});

module.exports = mongoose.model("Weather", weatherSchema);