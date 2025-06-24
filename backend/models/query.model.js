import mongoose from "mongoose";

const querySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    crop: {
      type: mongoose.Types.ObjectId,
      ref: "Crop",
    },
    question: {
      type: String,
      required: true,
    },
    answers: [
      {
        user: {
          type: mongoose.Types.ObjectId,
          ref: "User",
        },
        answer: {
          type: String,
          required: true,
        },
        answeredAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

const Query = mongoose.model("Query", querySchema);
export default Query;
