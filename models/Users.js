import mongoose from "mongoose";
/*
    to make the field unique for the DB
    unique: true,
*/
const locationID = new mongoose.Schema({
    locationId: {
        type: mongoose.ObjectId,
        ref: "Location",
        unique: true
    }
});

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    locations: [{
        type: mongoose.ObjectId,
        ref: "Location",
    }]  //[locationID]
}, {
    // For createdAt and updatedAt fields will be added to the schema
    timestamps: true,
});

// this will create an index for the userName and email
// can make it 1 or -1 to make it ascending or descending
// userSchema.index({ userName: 1 });
// userSchema.index({ email: 1 });

export const User = mongoose.model('User', userSchema);