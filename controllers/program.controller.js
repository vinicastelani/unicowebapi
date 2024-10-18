import { Patient } from "../models/patient.model.js";
import { Program } from "../models/program.model.js";

const createProgram = async (req, res) => {
  const programInfo = req.body;
  try {
    const result = await Program.create(programInfo);
    const patient = await Patient.findById(programInfo.paciente);
    patient.programas.push(result._id);
    await patient.save();
    res.send({
      success: true,
      message: "Avaliação registrada.",
      data: result,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "Erro.",
      error: error,
    });
  }
};
const updateProgram = async (req, res) => {
  const id = req.params.id;
  const info = req.body;
  try {
    const results = await Program.findByIdAndUpdate(id, info, { new: true });
    res.send({
      success: true,
      message: "Registro atualizado.",
      data: results,
    });
  } catch (error) {
    res.send({
      success: false,
      message: "Erro.",
      error: error,
    });
  }
};

const deleteProgram = async (req, res) => {
  try {
    await Program.findByIdAndDelete(req.params.id);
    res.send({
      success: true,
      message: "Registro removido.",
    });
  } catch (error) {
    res.send({
      success: false,
      message: "Erro.",
      error: error,
    });
  }
};
export { createProgram, updateProgram, deleteProgram };
