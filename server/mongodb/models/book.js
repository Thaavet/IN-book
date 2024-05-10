
import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    _id : {
        type: String,
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
});

export default mongoose.model("Book", bookSchema)

