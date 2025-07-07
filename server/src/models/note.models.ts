import mongoose, { Document, Schema } from "mongoose";
import { INote } from "../types";

interface INoteDocument extends INote, Document {
  author: {
    id: mongoose.Types.ObjectId;
    name: string;
  };
}

const noteSchema = new Schema<INoteDocument>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
}, {
  timestamps: true,
});

export const Note = mongoose.model<INoteDocument>("Note", noteSchema);