import Note from "../models/note.model.js";
import { errorHandler } from "../utils/error.js";
import mongoose from "mongoose";
// Create Note
export const create = async (req, res, next) => {
    if (!req.body.content) {
        return next(errorHandler(400, 'Please provide all required fields'));
    }
    const title = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
    const newNote = new Note({
        ...req.body,
        title,
        userId: req.user.id,
    });
    try {
        const savedNote = await newNote.save();
        res.status(201).json(savedNote);
    } catch (error) {
        next(error);
    }
};

// Get Notes
export const getnotes = async (req, res, next) => {
    try {

        const startIndex = parseInt(req.query.startIndex) || 0;
        const sortDirection = req.query.order === 'asc' ? 1 : -1;

        // Construct the query object
        const query = {
            ...(req.query.userId && { userId: req.query.userId }),  // Filter by userId if provided
            ...(req.query.title && { title: req.query.title }),      // Filter by title if provided
        };

        // Add noteId to query only if it's a valid ObjectId
        if (req.query.noteId && mongoose.Types.ObjectId.isValid(req.query.noteId)) {
            query._id = req.query.noteId;
        }

        // Fetch notes from the database
        const notes = await Note.find(query)
            .sort({ updatedAt: sortDirection })
            .skip(startIndex);

        // Respond with the fetched notes
        res.status(200).json({
            success: true,
            notes,
        });
    } catch (error) {
        next(error);
    }
};

// Delete Note
export const deletenote = async (req, res, next) => {
    const { noteId, userId } = req.params;


    if (!noteId || !mongoose.Types.ObjectId.isValid(noteId)) {
        return next(errorHandler(400, 'Invalid note ID'));
    }

    if (req.user.id !== userId) {
        console.log('Unauthorized: User ID mismatch');
        return next(errorHandler(403, 'You are not allowed to delete this note'));
    }

    try {
        const deletedNote = await Note.findByIdAndDelete(noteId);
        if (!deletedNote) {
            console.log('Note not found for ID:', noteId);
            return next(errorHandler(404, 'Note not found'));
        }
        res.status(200).json('The note has been deleted');
    } catch (error) {
        next(error);
    }
};

export const updatenote = async (req, res, next) => {
    const { noteId, userId } = req.params;

    // Validate noteId
    if (!mongoose.Types.ObjectId.isValid(noteId)) {
        return next(errorHandler(400, 'Invalid note ID'));
    }

    // Validate userId (if necessary)
    if (req.user.id !== userId) {
        return next(errorHandler(403, 'You are not allowed to update this note'));
    }

    try {
        const updatedNote = await Note.findByIdAndUpdate(
            noteId,
            {
                $set: { content: req.body.content },
            },
            { new: true }
        );

        // Check if note was found and updated
        if (!updatedNote) {
            return next(errorHandler(404, 'Note not found'));
        }

        res.status(200).json(updatedNote);
    } catch (error) { 
        next(error);
    }
};

  
