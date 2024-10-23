import { Patient } from "../models/patient.model.js";
import AWS from "aws-sdk";

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
          arquivos: p.arquivos,
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

const upload = async (req, res) => {
  if (!req.files) {
    return res.send({
      success: false,
      message: "Erro.",
    });
  }

  // Binary data base64
  const { name, data } = req.files.file;
  const { id } = req.body;
  const fileContent = Buffer.from(data, "binary");
  const patient = await Patient.findById(id);

  if (patient.arquivos.find((a) => a.filename === name)) {
    return res.send({
      success: false,
      message: "Já existe um arquivo com este nome.",
    });
  }

  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccesskey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });

  const s3 = new AWS.S3();

  // Setting up S3 upload parameters
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: name,
    Body: fileContent,
  };

  // Uploading files to the bucket
  s3.upload(params, async function (err, data) {
    if (err) {
      return res.send({
        success: false,
        message: "Erro.",
        error: err,
      });
    }

    patient.arquivos.push({ url: data.Location, filename: data.Key });
    await patient.save();
    return res.send({
      success: true,
      message: "Arquivo enviado com sucesso.",
      data: data,
    });
  });
};

export {
  cadastrarPaciente,
  listarPacientes,
  listarPaciente,
  atualizarPaciente,
  excluirPaciente,
  upload,
};
