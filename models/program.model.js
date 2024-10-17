import mongoose, { model, Schema } from "mongoose";

const programaSchema = new Schema({
  titulo: { type: String, required: true },
  avaliacoes: { type: Array, required: true },
  paciente: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
});

export const Program =
  mongoose.models.programa || model("Program", programaSchema);
