import mongoose, {Schema} from "mongoose";

const inquireSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
      type: String,
      required: true,  
    },
    contact:{
        type: String,
        required: true
    },
    message:{
        type: String,
        default: null
    },
    status:{
        type: String,
        enum:["Applied", "UnApplied"],
        default: "UnApplied"
    }
}, {timestamps: true});

const inquireModel = mongoose.model("Inquire", inquireSchema);

export default inquireModel;