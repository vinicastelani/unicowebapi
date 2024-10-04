import mongoose, { model, Schema } from "mongoose";

const patientSchema = new Schema({
  name: { type: String, required: true },
  evaluations: [
    {
      type: Schema.Types.ObjectId,
      ref: "Evaluation",
      default: [],
    },
  ],
});

export const Patient =
  mongoose.models.Patient || model("Patient", patientSchema);
