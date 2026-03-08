import mongoose, { Schema } from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

const projectSchema = Schema({
    userId: {
        type: ObjectId,
        ref: "user"
    },
    projectName: {
        type: String,
        required: true
    },
    homeImage: {
        type: String,
        required: true
    },
    technology: [{
        type: String,
        required: true
    }]
    ,
    durationTime: {
        type: Date,
    },
    role: {
        type: String,
        required: true
    },
    shortBrifing: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    section: [
        {
            image: {
                type: String
            },
            description: {
                type: String
            }
        }
    ],
    socialMedia: [{
        name: { String },
        link: { String }
    }],
    status: {
        type: Boolean,
        enum: [true, false],
        default: true
    },
    faviourate:{
        type: Boolean,
        enum:[true, false],
        default: false
    }
},
    { timestamps: true }
);

projectSchema.index({ userId: -1 });

const projectModel = mongoose.model("project", projectSchema);

export default projectModel;