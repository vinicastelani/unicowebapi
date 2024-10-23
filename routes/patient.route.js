import express from "express";
const router = express.Router();
import { middleware } from "../middlewares/auth.js";
import {
  cadastrarPaciente,
  listarPacientes,
  listarPaciente,
  atualizarPaciente,
  excluirPaciente,
  upload,
} from "../controllers/patient.controller.js";

//middleware
router.use(middleware);

//Rotas que recebem parametros devem sempre ficar ao final

//Get
router.get("/", listarPacientes);
router.get("/:id", listarPaciente);

//Post
router.post("/", cadastrarPaciente);
router.post("/upload", upload);

//Patch
router.patch("/:id", atualizarPaciente);

//Delete
router.delete("/:id", excluirPaciente);

export default router;
