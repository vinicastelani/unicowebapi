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

export { createProgram };
