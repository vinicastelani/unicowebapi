import { Patient } from "../models/patient.model.js";
import { Evaluation } from "../models/evaluation.model.js";

const createEvaluation = async (req, res) => {
  const evaluationInfo = req.body;
  try {
    const result = await Evaluation.create(evaluationInfo);
    const patient = await Patient.findById(evaluationInfo.patient);
    patient.evaluations.push(result._id);
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

const getEvaluations = async (req, res) => {
  try {
    const results = await Evaluation.find();

    res.send({
      success: true,
      message: "Lista de avaliações recuperada com sucesso.",
      data: results,
    });
  } catch (error) {
    res.send({
      success: false,
      message: "Ocorreu um erro ao tentar recuperar a lista de avaliações.",
      error: error,
    });
  }
};

const getEvaluation = async (req, res) => {
  const { id } = req.params;
  try {
    const results = await Patient.findById(id).populate("evaluations");
    res.send({
      success: true,
      message: "Registros encontrados.",
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

const updateEvaluation = async (req, res) => {
  const id = req.params.id;
  const info = req.body;

  try {
    const results = await Evaluation.findByIdAndUpdate(id, info, { new: true });
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

const deleteEvaluation = async (req, res) => {
  try {
    await Evaluation.findByIdAndDelete(req.params.id);
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

const createPatients = async (req, res) => {
  const patientInfo = req.body;
  const patient = await Patient.findOne({ name: patientInfo.name });

  if (patient) {
    res.send({
      success: false,
      message: "Este paciente já está cadastrado.",
      data: patient,
    });

    return;
  }

  try {
    const result = await Patient.create(patientInfo);

    res.send({
      success: true,
      message: "Paciente cadastrado.",
      data: result,
    });
  } catch (error) {
    res.send({
      success: false,
      message: "Erro.",
      error: error,
    });
  }
};

const getPatients = async (req, res) => {
  try {
    const results = await Patient.find().populate("evaluations");

    res.send({
      success: true,
      message: "Lista de pacientes recuperada com sucesso.",
      data: results.map((res) => {
        const { name, id, evaluations } = res;
        return { name, id, evaluations };
      }),
    });
  } catch (error) {
    res.send({
      success: false,
      message: "Ocorreu um erro ao tentar recuperar a lista de pacientes.",
      error: error,
    });
  }
};

const getPatient = async (req, res) => {
  const id = req.params.id;
  try {
    const results = await Patient.findById(id);
    res.send({
      success: true,
      message: "Paciente encontrado.",
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
const updatePatient = async (req, res) => {
  const id = req.params.id;
  const info = req.body;
  try {
    const results = await Patient.findByIdAndUpdate(id, info, { new: true });
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
const deletePatient = async (req, res) => {
  try {
    await Patient.findByIdAndDelete(req.params.id);
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

export {
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
};
