import express from "express";
const router = express.Router();

import { createProgram } from "../controllers/program.controller.js";

//Post
router.post("/", createProgram);

export default router;
