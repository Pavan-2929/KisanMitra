import mongoose from "mongoose";

const contractorSchema = new mongoose.Schema(
  {
    profile: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
    },
    numberOfLabors: {
      type: Number,
      required: true,
      min: 1,
    },
    pricePerLaborPerDay: {
      type: Number,
      required: true,
      min: 100,
    },
  },
  { timestamps: true }
);

export const Contractor = mongoose.model("Contractor", contractorSchema);
