import mongoose, { Document, Model } from "mongoose";
import { IUser } from "../types";
import { Schema } from "mongoose";

interface IUserDocument extends IUser, Document {}

const userSchema = new Schema<IUserDocument, Model<IUserDocument>>({
  name: {
    type: String,
    required: true,
    trim: true,            
  },
  dob: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,          
    lowercase: true,     
    trim: true,
  },
  isVerified: {
    type: Boolean,
    default: false,       
  },
  otp: {
    type: String,
    required: function() {
      return !this.isVerified;
    }
  },
  otpExpires: {
    type: Date,
    expires: 600,
  }
}, {
  timestamps: true,       
});

export const User = mongoose.model("User", userSchema);
