import mongoose from "mongoose"
import { Schema } from "mongoose"
import { ObjectId } from "mongodb";

const userSchema = new Schema({
    userId: {
        type: ObjectId
    },
    userType: {
        type: String,
        enum: ['patient', 'doctor'],
        required: true
    },
});

const User = mongoose.models.AppUser || mongoose.model('AppUser', userSchema);
module.exports = User;
