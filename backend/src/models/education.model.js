import mongoose, { Schema } from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

const educationSchema = Schema({
    userId: {
        type: ObjectId,
        ref: "user"
    },
    schoolName: {
        type: String,
        required: true
    },
    class: {
        type: String,
        required: true
    },
    grade: {
        type: String,
        required: true
    },
    subject: {
        type: String
    }
},
    { timestamps: true }
);

const educationModel = mongoose.model("education", educationSchema);

export default educationModel;