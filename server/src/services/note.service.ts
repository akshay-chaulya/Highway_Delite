import { StatusCodes } from "http-status-codes";
import * as NoteRepo from "../repository/note.repository";
import { JWTUser } from "../types";
import AppError from "../utils/appError";

export const createNoteService = async (data: { title: string; content: string }, user: JWTUser) => {
    if (!data.title || !data.content) {
        throw new AppError("Title and content are required to create a note.", StatusCodes.BAD_REQUEST);
    }
    return await NoteRepo.createNote(data, user);
};

export const deleteNoteService = async (id: string, userId: string) => {
    const note = await NoteRepo.findNoteById(id);
    if (!note) {
        throw new AppError("Note not found", StatusCodes.NOT_FOUND);
    }
    const deletedNote = await NoteRepo.deleteNote(id, userId);
    if (!deletedNote) {
        throw new AppError("You do not have permission to delete this note.", StatusCodes.FORBIDDEN);
    }
};

export const updateNoteService = async (id: string, data: { title?: string; content?: string }, userId: string) => {
    const note = await NoteRepo.findNoteById(id);
    if (!note) {
        throw new AppError("Note not found", StatusCodes.NOT_FOUND);
    }
    if (!data.title && !data.content) {
        throw new AppError("At least one field (title or content) must be provided to update the note.", StatusCodes.BAD_REQUEST);
    }
    const updateNote = await NoteRepo.updateNote(id, data, userId);
    if (!updateNote) {
        throw new AppError("You do not have permission to update this note.", StatusCodes.FORBIDDEN);
    }
    return updateNote;
};

export const getAllNoteByUserId = async (userId: string) => {
    return await NoteRepo.getAllNoteByUserId(userId);
};