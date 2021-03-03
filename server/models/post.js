import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  userID: String,
  userName: String,
  email: String,
  topics: Array,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export const User = mongoose.model("user", userSchema);
