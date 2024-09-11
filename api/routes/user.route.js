import express from "express";
import {
  deleteUser,
  updateUser,
  getUser,
  createUser,
} from "../controllers/user.controller.js";

const router = express.Router();


router.post("/", createUser);
router.get("/:id",  getUser);
router.post("/update/:id",  updateUser);
router.delete("/delete/:id",  deleteUser);




export default router;