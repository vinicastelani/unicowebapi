import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config/auth.json" assert { type: "json" };

const generateToken = (params = {}) => {
  return jwt.sign(params, config.secret, { expiresIn: 86400 });
};

const createUser = async (req, res) => {
  const { registro, nome } = req.body;

  try {
    if (await User.findOne({ registro }))
      return res.status(200).send({
        success: false,
        message: "Perfil já cadastrado.",
      });

    const user = await User.create(req.body);
    user.senha = undefined;

    const formatedUser = {
      nome,
      registro,
      token: generateToken({ id: user.id }),
    };

    return res.status(200).send({
      success: true,
      message: "Perfil cadastrado.",
      data: { ...formatedUser },
    });
  } catch (error) {
    return res.status(401).send({
      success: false,
      message: "Erro.",
      error: error,
    });
  }
};
const logIn = async (req, res) => {
  const { registro, senha } = req.body;

  const user = await User.findOne({ registro }).select("+senha");
  if (!user)
    return res.status(200).send({
      success: false,
      message: "Perfil não encontrado.",
    });

  if (!(await bcrypt.compare(senha, user.senha)))
    return res.status(401).send({
      success: false,
      message: "Credênciais inválidas.",
    });

  user.senha = undefined;

  const formatedUser = {
    nome: user.nome,
    _id: user._id,
    registro,
    token: generateToken({ id: user.id }),
    imagem: user.imagem,
    permissao: user.permissao,
  };
  return res.status(200).send({
    success: true,
    message: "Logado com sucesso.",
    data: { ...formatedUser },
  });
};
const updateUser = async (req, res) => {
  const id = req.params.id;
  const info = req.body;
  try {
    const results = await User.findByIdAndUpdate(id, info, { new: true });
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

const listUsers = async (req, res) => {
  const id = req.params.id;
  try {
    const results = await User.findById(id);
    const { permissao } = results;
    if (permissao != "admin") {
      return res.send({
        success: false,
        message: "Voce não tem permissão para acessar este recurso.",
        error: error,
      });
    }
  } catch (error) {
    return res.send({
      success: false,
      message: "Não foi possível validar as credênciais para esta ação.",
      error: error,
    });
  }

  try {
    const results = await User.find();

    return res.send({
      success: true,
      message: "Lista de usuários recuperada com sucesso.",
      data: results,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: "Ocorreu um erro ao tentar recuperar a lista de pacientes.",
      error: error,
    });
  }
};

export { createUser, logIn, updateUser, listUsers };
