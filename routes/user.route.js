import express from "express";
const router = express.Router();

import {
  createUser,
  logIn,
  updateUser,
} from "../controllers/user.controller.js";

//Post
router.post("/register", createUser);
router.post("/auth", logIn);

//Patch
router.patch("/:id", updateUser);

export default router;
