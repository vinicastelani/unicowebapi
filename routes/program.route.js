import express from "express";
const router = express.Router();

import {
  createProgram,
  updateProgram,
  deleteProgram,
} from "../controllers/program.controller.js";

//Post
router.post("/", createProgram);

//Patch
router.patch("/:id", updateProgram);

//Delete
router.delete("/:id", deleteProgram);

export default router;
