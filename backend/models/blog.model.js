import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: [
      {
        type: String,
        required: true,
      },
    ],
    likes: {
      type: Number,
      default: 0,
      min: 0,
    },
    comments: [
      {
        user: {
          type: mongoose.Types.ObjectId,
          ref: "Users",
        },
        text: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    author: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  },
  { timestamps: true }
);

export const Blog = new mongoose.model("Blogs", blogSchema);
