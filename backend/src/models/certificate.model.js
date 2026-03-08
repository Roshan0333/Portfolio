import mongoose, { Schema } from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

const certificateSchema = Schema({
    userId:{
        type: ObjectId,
        ref:"user"
    },
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
    description:{
        type: String,
        required: true
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