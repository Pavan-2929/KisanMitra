import mongoose from "mongoose";

const contractorSchema = new mongoose.Schema(
  {
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
