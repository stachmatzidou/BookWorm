//import Schema from mongoose
import mongoose, {Schema} from "mongoose";

// const {Schema} = mongoose;

//create book Schema
const bookSchema = new Schema({
    cover: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    pages: {
        type: String,
        required: true,
    },
    isRead: {
        type: Boolean,
        required: false,
        default: false,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {timestamps: true});

export default mongoose.model("Book", bookSchema);