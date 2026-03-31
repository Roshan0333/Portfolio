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
    resume:{
        type: String
    },
    skill:[String],
    introduction: {
        type: String
    },
    dob: {
        type: Date
    },
    address: {
        street: { String },
        pincode: { Number },
        city: { String },
        country: { String }
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
            }
        }
    ]
},
    { timestamps: true }
);

profileSchema.index({userId:-1})

const profileModel = mongoose.model("profile", profileSchema);

export default profileModel;