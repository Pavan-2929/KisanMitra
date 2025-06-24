import mongoose from "mongoose";
import Crops from "../models/crop.model.js";
import User from "../models/user.model.js";

// Add New Crop
export const addNewCrop = async (req, res) => {
  // Destructure all required fields from req.body
  const {
    name,
    description,
    cropVariety,
    cropAge,
    harvestDate,
    fertilizerUsed,
    pesticidesUsed,
    soilType,
    moistureContent,
    processingDetails,
    qualityGrade,
    certifications,
    quantityAvailable,
    totalQuantity,
    unitOfcrop,
    pricePerUnit,
    bulkDiscount,
    negotiable,
    storageType,
    deliveryOptions,
  } = req.body;

  // Handle files (images/videos)
  const files = req.files || [];
  const cropImagesUrl = [];
  const cropVideosUrl = [];
  files.forEach((file) => {
    if (file.mimetype.startsWith("image/")) {
      cropImagesUrl.push({ url: file.path });
    } else if (file.mimetype.startsWith("video/")) {
      cropVideosUrl.push({ url: file.path });
    }
  });

  // Required field validation
  if (!name || !description || !totalQuantity || !unitOfcrop || !pricePerUnit) {
    return res
      .status(400)
      .json({ message: "All required fields must be filled!" });
  }

  try {
    // Additional validation
    if (isNaN(totalQuantity) || totalQuantity <= 0) {
      return res
        .status(400)
        .json({ message: "Total Quantity must be a positive number!" });
    }
    if (isNaN(pricePerUnit) || pricePerUnit < 0) {
      return res
        .status(400)
        .json({ message: "Price per unit must be a non-negative number!" });
    }
    if (
      moistureContent &&
      (isNaN(moistureContent) || moistureContent < 0 || moistureContent > 100)
    ) {
      return res
        .status(400)
        .json({ message: "Moisture content must be between 0 and 100!" });
    }

    // Prepare certifications array
    let certificationsArr = [];
    if (certifications) {
      if (Array.isArray(certifications)) {
        certificationsArr = certifications;
      } else {
        certificationsArr = certifications.split(",").map((c) => c.trim());
      }
    }

    const newCrop = new Crops({
      name,
      description,
      cropVariety,
      cropAge: cropAge
        ? typeof cropAge === "object"
          ? cropAge
          : {
              value: req.body["cropAge[value]"],
              unit: req.body["cropAge[unit]"],
            }
        : undefined,
      harvestDate,
      fertilizerUsed,
      pesticidesUsed,
      soilType,
      moistureContent,
      processingDetails,
      qualityGrade,
      certifications: certificationsArr,
      quantityAvailable,
      totalQuantity,
      unitOfcrop,
      pricePerUnit,
      bulkDiscount,
      negotiable,
      storageType,
      deliveryOptions,
      cropImagesUrl,
      cropVideosUrl,
      // Add farmer if you have authentication
      // farmer: req.user?._id,
    });

    console.log(newCrop);
    const savedCrop = await newCrop.save();
    res
      .status(201)
      .json({ message: "Crop added successfully!", crop: savedCrop });
  } catch (error) {
    console.error("Error adding crop:", error);
    res.status(500).json({ message: "Internal server error!" });
  }
};

// Get Single Crop
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

// Get All Crops
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

// Remove Crop
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

// Update Crop
export const updateCrop = async (req, res) => {
  try {
    const cropId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(cropId)) {
      return res.status(400).json({ message: "Invalid crop ID!" });
    }

    const {
      name,
      description,
      cropVariety,
      cropAge,
      harvestDate,
      fertilizerUsed,
      pesticidesUsed,
      soilType,
      moistureContent,
      processingDetails,
      qualityGrade,
      certifications,
      quantityAvailable,
      totalQuantity,
      unitOfcrop,
      pricePerUnit,
      bulkDiscount,
      negotiable,
      storageType,
      deliveryOptions,
    } = req.body;

    // Handle files (images/videos)
    const files = req.files || [];
    const cropImagesUrl = [];
    const cropVideosUrl = [];
    files.forEach((file) => {
      if (file.mimetype.startsWith("image/")) {
        cropImagesUrl.push({ url: file.path });
      } else if (file.mimetype.startsWith("video/")) {
        cropVideosUrl.push({ url: file.path });
      }
    });

    // Prepare certifications array
    let certificationsArr = [];
    if (certifications) {
      if (Array.isArray(certifications)) {
        certificationsArr = certifications;
      } else {
        certificationsArr = certifications.split(",").map((c) => c.trim());
      }
    }

    const updatedCrop = {
      name,
      description,
      cropVariety,
      cropAge: cropAge
        ? typeof cropAge === "object"
          ? cropAge
          : {
              value: req.body["cropAge[value]"],
              unit: req.body["cropAge[unit]"],
            }
        : undefined,
      harvestDate,
      fertilizerUsed,
      pesticidesUsed,
      soilType,
      moistureContent,
      processingDetails,
      qualityGrade,
      certifications: certificationsArr,
      quantityAvailable,
      totalQuantity,
      unitOfcrop,
      pricePerUnit,
      bulkDiscount,
      negotiable,
      storageType,
      deliveryOptions,
      cropImagesUrl,
      cropVideosUrl,
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
