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
    standed: {
        type: String,
        required: true
    },
    grade: {
        type: String,
        required: true
    },
    start: {
        type: String,
        required: true
    },
    end: {
        type: String,
        required: true
    },
    subject: {
        type: String
    },
    description: {
        type: String
    }
},
    { timestamps: true }
);

educationSchema.index({ userId: 1 });

const educationModel = mongoose.model("education", educationSchema);

export default educationModel;