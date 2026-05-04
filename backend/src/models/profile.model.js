import mongoose, { Schema } from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

const profileSchema = Schema({
    userId: {
        type: ObjectId,
        ref: "user",
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    profileImage: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contact: {
        type: Number,
        unique: true
    },
    profession: {
        type: String
    },
    resume: {
        type: String
    },
    skill: [
        {
            category: {
                type: String,
            },
            items: [
                {
                    name: String,
                    icon: String
                }
            ]
        }
    ],
    introduction: {
        type: String
    },
    dob: {
        type: String
    },
    address: {
        street: { type: String },
        pincode: { type: String },
        city: { type: String },
        country: { type: String }
    },
    socialMediaLink: [
        {
            name: {
                type: String,
                unique: true,
            },
            link: {
                type: String,
                unique: true,
            },
            icon: {
                type: String
            }
        }
    ]
},
    { timestamps: true }
);

profileSchema.index({ userId: -1 })

const profileModel = mongoose.model("profile", profileSchema);

export default profileModel;