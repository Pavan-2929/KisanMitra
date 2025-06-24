import mongoose from "mongoose";
import Query from "../models/query.model.js";

export const addQuery = async (req, res) => {
  try {
    const { userId, cropId, question } = req.body;
    if (!userId || !cropId || !question) {
      return res
        .status(400)
        .json({ message: "Please provide all required field!" });
    }

    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(cropId)
    ) {
      return res.status(400).json({ message: "Invalid userId or cropId!" });
    }

    const newQuery = new Query({ user: userId, crop: cropId, question });
    await newQuery.save();

    return res.status(200).json({ message: "Query posted successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

export const queryAnswered = async (req, res) => {
  try {
    const { queryId } = req.params;
    const { userId, answer } = req.body;

    const query = await Query.findById(queryId);
    if (!query) {
      return res.status(404).json({ message: "Query not found!" });
    }

    query.answers.push({ user: userId, answer });
    query.save();
    return res
      .status(200)
      .json({ message: "Query Answer added successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

export const getAllQuery = async (req, res) => {
  try {
    const queries = await Query.find()
      .populate("user", "fullName profile categories")
      .populate("answers.user", "fullName profile categories");

    return res
      .status(200)
      .json({ message: "Queries retreived successfully!", queries });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

export const getQuery = async (req, res) => {
  try {
    const { queryId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(queryId)) {
      return res.status(400).json({ message: "Invalid queryId!" });
    }

    const query = await Query.findById(queryId)
      .populate("user", "fullName profile categories")
      .populate("answers.user", "fullName profile categories");

    if (!query) {
      return res.status(404).json({ message: "Query not found!" });
    }

    return res
      .status(200)
      .json({ message: "Query retreived successfully!", query });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

export const removeQuery = async (req, res) => {
  try {
    const { queryId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(queryId)) {
      return res.status(400).json({ message: "Invalid queryId!" });
    }

    const query = await Query.findById(queryId);
    if (!query) {
      return res.status(404).json({ message: "Query not found!" });
    }

    await Query.findByIdAndDelete(queryId);

    return res.status(200).json({ message: "Query removed successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};
