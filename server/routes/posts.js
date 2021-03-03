import express from "express";
import {
  getUserFlashcards,
  addUser,
  updateData,
  deleteUser,
} from "../controllers/posts.js";
const router = express.Router();

router.post("/", getUserFlashcards);
router.post("/add-user", addUser);
router.post("/delete-user", deleteUser);
router.put("/update-data", updateData);

export default router;
