import express from 'express';
import { create, deletenote, getnotes, updatenote } from '../controller/note.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, create);
router.get('/getnotes', getnotes);
router.delete('/deletenote/:noteId/:userId', verifyToken, deletenote);
router.put('/updatenote/:noteId/:userId', verifyToken, updatenote);


export default router; 