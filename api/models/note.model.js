import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        unique: true,
    }
},{timestamps: true});

const Note = mongoose.model('Note', noteSchema);

export default Note;