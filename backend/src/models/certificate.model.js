import mongoose, { Schema } from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

const certificateSchema = Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    date: {
        type: Date
    },
    status: {
        type: Boolean,
        default: true,
        enum: [true, false]
    }
},
    { timeStamps: true }
);

const certificateModel = mongoose.model('certificate', certificateSchema);

export default certificateModel;