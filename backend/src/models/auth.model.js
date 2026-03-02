import mongoose, { Schema } from "mongoose";

const authSchema = Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
},
    { timestamps: true }
);

authSchema.index({email:-1});

const authModel = mongoose.model("user", authSchema);

export default authModel;




