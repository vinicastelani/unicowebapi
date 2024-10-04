import mongoose, { model, Schema } from "mongoose";

const evaluationSchema = new Schema({
  data: { type: Date, required: true },
  program: { type: String, required: true },
  attempt: { type: Array, required: true },
  patient: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
});

export const Evaluation =
  mongoose.models.evaluation || model("Evaluation", evaluationSchema);
