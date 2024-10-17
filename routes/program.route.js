import express from "express";
const router = express.Router();

import {
  createProgram,
  updateProgram,
} from "../controllers/program.controller.js";

//Post
router.post("/", createProgram);

//Patch
router.patch("/:id", updateProgram);

export default router;
