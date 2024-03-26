import express from "express";
import multer from "multer";
import {
  addPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../controllers/post.js";

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", upload.single("file"), addPost);
router.delete("/:id", deletePost);
router.put("/:id", upload.single("file"), updatePost);

export default router;
