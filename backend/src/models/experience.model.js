import mongoose, { Schema } from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

const experienceSchema = Schema({
    userId:{
        type: ObjectId,
        ref:"user"
    },
    companyName: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    joiningDate: {
        type: String,
        required: true
    },
    leavingDate: {
        type: String,
        default: "Present"
    },
    description: {
        type: String,
        required: String
    },
    status:{
        type: Boolean,
        enum:[true, false],
        default: true
    }
},
    { timestamps: true }
);

experienceSchema.index({userId: -1});

const experienceModel = mongoose.model("experience", experienceSchema);

export default experienceModel