import mongoose, { model, Schema } from "mongoose";

const patientSchema = new Schema({
  nome: { type: String, required: true },
  dtNascimento: { type: Date },
  dtAvaliacao: { type: Date },
  protocolos: { type: Array },
  arquivos: { type: Array },
  imagem: { type: String },
  programas: [
    {
      type: Schema.Types.ObjectId,
      ref: "Program",
      default: [],
    },
  ],
});

export const Patient =
  mongoose.models.Patient || model("Patient", patientSchema);
