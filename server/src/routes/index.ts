import { Router } from "express";
import authRouter from "./auth.route";
import noteRouter from "./note.route";

const router = Router();

router.use("/auth", authRouter);
router.use("/notes", noteRouter);

export default router;
