import express from "express";
import { signOut, signin } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signin", signin);
router.get("/signout", signOut);

export default router;
