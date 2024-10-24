import mongoose, { model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new Schema({
  nome: { type: String, required: true },
  registro: { type: String, unique: true, required: true },
  senha: {
    type: String,
    required: true,
    select: false,
  },
  permissao: {
    type: String,
    required: true,
    default: "usuario",
  },
  imagem: { type: String },
});

userSchema.pre("save", async function (next) {
  const hash = await bcrypt.hash(this.senha, 10);
  this.senha = hash;

  next();
});

export const User = mongoose.models.User || model("User", userSchema);
