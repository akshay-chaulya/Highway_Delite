import { Router } from "express";
import * as NoteController from "../controllers/note.controller";
import authMiddleware from "../middleware/auth.middleware";

const router = Router();

router.post("/create", authMiddleware, NoteController.createNote);
router.get("/", authMiddleware, NoteController.getAllNotes);
router.put("/:id", authMiddleware, NoteController.updateNote);
router.delete("/:id", authMiddleware, NoteController.deleteNote);

export default router;
