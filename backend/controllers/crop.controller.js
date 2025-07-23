import mongoose, { Mongoose } from "mongoose";
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

  const userId = req.headers.userid;
  // Required field validation
  if (
    !name ||
    !description ||
    !totalQuantity ||
    !unitOfcrop ||
    !pricePerUnit ||
    !userId
  ) {
    return res
      .status(400)
      .json({ message: "All required fields must be filled!" });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found!" });
  }

  if (
    user.fullName == "" ||
    user.fullName == null ||
    user.phone == "" ||
    user.phone == null ||
    user.address == "" ||
    user.address == null
  ) {
    return res.status(400).json({
      isCompleteProfile: false,
      message: "Please complete your profile before adding a crop.",
    });
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
      farmer: userId,
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

// Get Single Crop
export const getCrop = async (req, res) => {
  try {
    const cropId = req.params.id;

    const crop = await Crops.findById(cropId).populate(
      "farmer",
      "fullName email profile address phone"
    );
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
    const crops = await Crops.find();
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

export const addInterestedDealer = async (req, res) => {
  try {
    const cropId = req.params.id;
    const { dealerId } = req.body; // Get dealerId from request (or from auth middleware)
    const cropExists = await Crops.findById(cropId);
    if (!cropExists) {
      return res.status(404).json({ message: "Crop not found!" });
    }

    const alreadyInterested = cropExists.interestedDealers.some(
      (dealer) => dealer.user.toString() === dealerId
    );

    if (alreadyInterested) {
      return res
        .status(400)
        .json({ message: "Dealer already registered interest in this crop." });
    }
    const crop = await Crops.findByIdAndUpdate(
      cropId,
      { $addToSet: { interestedDealers: { user: dealerId } } },
      { new: true }
    );
    res.json({ message: "Interest registered", crop });
  } catch (error) {
    res.status(500).json({ message: "Failed to register interest" });
  }
};
