//import Schema from mongoose
import mongoose, {Schema} from "mongoose";

// const {Schema} = mongoose;

//create user Schema
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
}, {timestamps: true});

export default mongoose.model("User", userSchema);