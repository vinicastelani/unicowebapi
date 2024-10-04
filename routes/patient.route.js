import express from "express";
const router = express.Router();
import {
  createPatients,
  getPatients,
  getPatient,
  updatePatient,
  deletePatient,
  createEvaluation,
  getEvaluations,
  getEvaluation,
  updateEvaluation,
  deleteEvaluation,
} from "../controllers/patient.controller.js";

//Rotas que recebem parametros devem sempre ficar ao final

//Get
router.get("/evaluation", getEvaluations);
router.get("/", getPatients);
router.get("/:id", getPatient);
router.get("/evaluation/:id", getEvaluation);

//Post
router.post("/", createPatients);
router.post("/evaluation", createEvaluation);

//Patch
router.patch("/:id", updatePatient);
router.patch("/evaluation/:id", updateEvaluation);

//Delete
router.delete("/:id", deletePatient);
router.delete("/evaluation/:id", deleteEvaluation);

export default router;
