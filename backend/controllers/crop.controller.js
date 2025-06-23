import mongoose from "mongoose";
import Crops from "../models/crop.model.js";

export const addNewCrop = async (req, res) => {
  const { cropName, description, quantity, cropAge, price } = req.body;
  const files = req.files;
  let fileUrls = [];
  files.forEach((file) => {
    fileUrls.push(file.path);
  });
  if (!cropName || !description || !files || !quantity || !cropAge || !price) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {
    // Validate quantity and cropAge
    if (isNaN(quantity) || quantity <= 0) {
      return res
        .status(400)
        .json({ message: "Quantity must be a positive number!" });
    }

    if (isNaN(cropAge) || cropAge < 0) {
      return res
        .status(400)
        .json({ message: "Crop age must be a non-negative number!" });
    }

    if (isNaN(price) || price < 0) {
      return res
        .status(400)
        .json({ message: "Price must be a non-negative number!" });
    }

    const newCrop = new Crops({
      cropName,
      description,
      file: fileUrls, //It can be image or video URL
      quantity,
      price,
      cropAge,
    });

    const savedCrop = await newCrop.save();
    res
      .status(201)
      .json({ message: "Crop added successfully!", crop: savedCrop });
  } catch (error) {
    console.error("Error adding crop:", error);
    res.status(500).json({ message: "Internal server error!" });
  }
};

export const getCrop = async (req, res) => {
  try {
    const cropId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(cropId)) {
      return res.status(400).json({ message: "Invalid crop ID!" });
    }
    const crop = await Crops.findById(cropId).populate("farmer");
    if (!crop) {
      return res.status(404).json({ message: "Crop not found!" });
    }

    return res.status(200).json(crop);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

export const getCrops = async (req, res) => {
  try {
    const crops = await Crops.find().populate("farmer");
    if (!crops || crops.length === 0) {
      return res.status(404).json({ message: "No crops found!" });
    }

    return res.status(200).json(crops);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

export const removeCrop = async (req, res) => {
  try {
    const cropId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(cropId)) {
      return res.status(400).json({ message: "Invalid crop ID!" });
    }

    const deletedCrop = await Crops.findByIdAndDelete(cropId);
    if (!deletedCrop) {
      return res.status(404).json({ message: "Crop not found!" });
    }
    return res.status(200).json({ message: "Crop deleted successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

export const updateCrop = async (req, res) => {
  try {
    const cropId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(cropId)) {
      return res.status(400).json({ message: "Invalid crop ID!" });
    }
    const { cropName, description, quantity, cropAge, price } = req.body;
    const files = req.files;
    let fileUrls = [];
    if (files && files.length > 0) {
      files.forEach((file) => {
        fileUrls.push(file.path);
      });
    }
    if (!cropName || !description || !quantity || !cropAge || !price) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    // Validate quantity and cropAge
    if (isNaN(quantity) || quantity <= 0) {
      return res
        .status(400)
        .json({ message: "Quantity must be a positive number!" });
    }
    if (isNaN(cropAge) || cropAge < 0) {
      return res
        .status(400)
        .json({ message: "Crop age must be a non-negative number!" });
    }
    if (isNaN(price) || price < 0) {
      return res
        .status(400)
        .json({ message: "Price must be a non-negative number!" });
    }

    const updatedCrop = {
      cropName,
      description,
      file: fileUrls, //It can be image or video URL
      quantity,
      price,
      cropAge,
    };
    const crop = await Crops.findById(cropId);
    if (!crop) {
      return res.status(404).json({ message: "Crop not found!" });
    }

    const updatedCropData = await Crops.findByIdAndUpdate(cropId, updatedCrop, {
      new: true,
    });
    if (!updatedCropData) {
      return res.status(404).json({ message: "Crop not found!" });
    }
    return res
      .status(200)
      .json({ message: "Crop updated successfully!", crop: updatedCropData });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};
