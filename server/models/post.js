import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  UserID: String,
  userName: String,
  email: String,
  topics: Array,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export const User = mongoose.model("user", userSchema);
