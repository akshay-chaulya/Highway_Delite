import * as NoteService from "../services/note.service";
import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../utils/catchAsync";
import { JWTUser } from "../types";

export const createNote = catchAsync(async (req: Request, res: Response) => {
  if (!req?.body?.title || !req?.body?.content) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: "fail",
      message: "Title and content are required to create a note.",
    });
  }
  console.log(req.user)
  const note = await NoteService.createNoteService(
    req.body,
    req.user as JWTUser
  );
  res.status(StatusCodes.CREATED).json({
    status: "success",
    message: "Note created successfully",
    data: {
      note,
    },
  });
});

export const deleteNote = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await NoteService.deleteNoteService(id, (req.user as JWTUser).id);
  res.status(StatusCodes.OK).json({
    status: "success",
    message: "Note deleted successfully",
  });
});

export const updateNote = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const note = await NoteService.updateNoteService(
    id,
    { title, content },
    (req.user as JWTUser).id
  );
  res.status(StatusCodes.OK).json({
    status: "success",
    message: "Note updated successfully",
    data: {
      note,
    },
  });
});

export const getAllNotes = catchAsync(async (req: Request, res: Response) => {
  const notes = await NoteService.getAllNoteByUserId((req.user as JWTUser).id);
  res.status(StatusCodes.OK).json({
    status: "success",
    message: "Notes fetched successfully",
    data: {
      notes,
    },
  });
});
