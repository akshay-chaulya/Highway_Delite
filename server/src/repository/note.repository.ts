import { Note } from "../models/note.models";
import { INote, JWTUser } from "../types";

export const createNote = async (data: INote, user: JWTUser) => Note.create({...data, author: { id: user.id, name: user.name }});

export const findNoteById = async (id: string) => Note.findById(id);

export const updateNote = async (id: string, data: Partial<INote>, userId: string) =>
  Note.findOneAndUpdate({ _id: id, "author.id": userId }, data, { new: true });

export const deleteNote = async (id: string, userId: string) =>
  Note.findOneAndDelete({ _id: id, "author.id": userId }, { new: true });

export const getAllNoteByUserId = async (userId: string) => Note.find({ "author.id": userId }).sort({ createdAt: -1 });