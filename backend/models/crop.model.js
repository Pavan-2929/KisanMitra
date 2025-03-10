import mongoose from "mongoose";

const cropSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    dealers: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Users",
      },
    ],
    cropfile: [
      {
        type: String,
        required: true,
      },
    ],
    farmer: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Crops", cropSchema);
