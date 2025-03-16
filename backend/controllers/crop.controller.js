import mongoose from "mongoose";
import Crops from "../models/crop.model.js";
import User from "../models/user.model.js";


export const addNewCrop = async (req, res) => {
	try {
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
			totalQuantity,
			unitOfcrop,
			pricePerUnit,
			negotiable,
			storageType,
			cropImagesUrl,
			userId
		} = req.body;
		// const uploadedImages = req.files.map((file) => ({
		// 	url: file.path,
		// }));


		const newCrop = new Crops({
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
			quantityAvailable: totalQuantity,
			totalQuantity,
			unitOfcrop,
			pricePerUnit,
			negotiable,
			storageType,
			cropImagesUrl: cropImagesUrl,
			farmer: userId,
		});

		await newCrop.save();

		return res.status(201).json({
			success: true,
			message: "Crop added successfully!",
			crop: newCrop,
		});
	} catch (error) {
		console.error("Error adding crop:", error);
		return res.status(500).json({ success: false, message: "Server error" });
	}
};

export const getCrop = async (req, res) => {
	try {
		const { cropId } = req.params;
		const crops = await Crops.findById(cropId).sort({ createdAt: -1 });
		if (!crops) {
			return res.status(404).json({
				success: false,
				message: "crop not found"
			})
		}

		return res.status(200).json({
			success: true,
			message: crops
		})
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Server error"
		});
	}
};

export const getCrops = async (req, res) => {
	try {
		const { id } = req.params;

		const user = await User.findById(id).populate('crops').select("crops");
		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found"
			})
		}
		return res.status(200).json({
			success: true,
			message: user
		})
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			message: "Server error"
		});
	}
};

export const removeCrop = async (req, res) => {
	try {
		const id = req.params.id;
		await Crops.findByIdAndDelete(id);

		return res.status(200).json({
			success: true,
			message: "Crops deleted successfully",
		})

	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			message: "Server error"
		});
	}
};

export const updateCrop = async (req, res) => { };
