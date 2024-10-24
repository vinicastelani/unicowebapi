import express from "express";
const router = express.Router();

import {
  createUser,
  logIn,
  updateUser,
  listUsers,
} from "../controllers/user.controller.js";

//Post
router.post("/register", createUser);
router.post("/auth", logIn);

//Patch
router.patch("/:id", updateUser);

//Get
router.get("/:id", listUsers);

export default router;
