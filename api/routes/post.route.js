import express from "express";
import {
  createPost,
  updatePost,
  deletePost,
  singlePost,
  getAllPosts,
  getNumberPosts,
} from "../controllers/post.controller.js";

const router = express.Router();

router.get("/count", getNumberPosts);
router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.get("/:id", singlePost);
router.get("/", getAllPosts);

export default router;
