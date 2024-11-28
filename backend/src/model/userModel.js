import { model, Schema } from "mongoose";

// Data schema
const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: false },
    timestamps: true,
  }
);

export const userModel = model("userData", userSchema);
