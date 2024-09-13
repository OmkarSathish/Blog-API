import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is mandatory"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is mandatory"],
      trim: true,
      minLength: [6, "Password must be of atleast 6 characters in length"],
      maxLength: [64, "Password can be of atmost 32 characters in length"],
    },
    email: {
      type: String,
      required: [true, "E-Mail is mandatory"],
      unique: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
