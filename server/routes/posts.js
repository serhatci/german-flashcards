import express from "express";
import {
  getData,
  addUser,
  updateData,
  deleteUser,
  getMasterData,
} from "../controllers/posts.js";
const router = express.Router();

router.get("/", getMasterData);
router.post("/add-user", addUser);
router.delete("/delete-user", deleteUser);
router.patch("/update-data", updateData);

export default router;
