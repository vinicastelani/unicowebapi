import { Patient } from "../models/patient.model.js";

const cadastrarPaciente = async (req, res) => {
  const patientInfo = req.body;

  const patient = await Patient.findOne({ nome: patientInfo.nome });

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
const listarPacientes = async (req, res) => {
  try {
    const results = await Patient.find().populate("programas");

    res.send({
      success: true,
      message: "Lista de pacientes recuperada com sucesso.",
      data: results.map((p) => {
        return {
          nome: p.nome,
          imagem: p.imagem,
          id: p._id,
          dtNascimento: p.dtNascimento,
          dtAvaliacao: p.dtAvaliacao,
          protocolos: p.protocolos,
          programas: p.programas,
        };
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
const listarPaciente = async (req, res) => {
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
const atualizarPaciente = async (req, res) => {
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
const excluirPaciente = async (req, res) => {
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
  cadastrarPaciente,
  listarPacientes,
  listarPaciente,
  atualizarPaciente,
  excluirPaciente,
};
