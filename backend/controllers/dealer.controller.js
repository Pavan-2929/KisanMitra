import Crop from "../models/crop.model.js";
import User from "../models/user.model.js"
import Deals from "../models/deals.model.js"

export const createProposal = async (req, res) => {
	try {
		const { cropId, userId } = req.body;

		const cropDetails = await Crop.findById(cropId);
		if (!cropDetails) {
			return res.status(404).json({
				success: false,
				message: "Crop not found"
			});
		}

		cropDetails.interestedDealers.push({
			user: userId,
		});
		await cropDetails.save();

		return res.status(200).json({
			success: true,
			message: "your proposal was successfully created"
		})

	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
}

export const getNearByCrops = async (req, res) => {
	try {
		const { userId } = req.body;

		// Fetch user details along with location
		const user = await User.findById(userId);
		if (!user || !user.address || !user.address.location || !user.address.location.coordinates) {
			return res.status(404).json({
				success: false,
				message: "User location not found"
			});
		}

		const userLocation = user.address.location.coordinates; // [longitude, latitude]

		// console.log(user.address.formattedAddress)


		// Find nearby crops using $geoNear
		// await User.collection.createIndex({ "address.location": "2dsphere" });
		const nearByUsers = await User.find({
			"address.location": {
				$near: {
					$geometry: { type: "Point", coordinates: userLocation },
					$maxDistance: 50000 // 50km range
				}
			},
			categories: "Farmer",
			crops: { $exists: true, $ne: [] }
		}).populate({
			path: "crops"
		}).select("crops profile.url fullName address");

		// console.log(nearByUsers.map((user) => { return user.address.formattedAddress }));


		return res.json({ success: true, message: nearByUsers });

	} catch (error) {
		console.error("Error finding nearby crops:", error);
		res.status(500).json({
			success: false,
			message: "Server error"
		});
	}
};

export const getDetailsOfInterestedDealers = async (req, res) => {
	try {
		const { userId } = req.body;
		const user = await Crop.find({ farmer: userId }).populate({
			path: "interestedDealers.user",
			// match: { "interestedDealers.markDone": false },
			select: "fullName address email phone categories profile.url"

		}).select("interestedDealers");
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
		console.log(error);
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
}

export const createDeal = async (req, res) => {
	try {
		const { isDefaultValues = false, farmerId, cropId, dealerId, cropQuantity, pricePerUnit } = req.body;
		const cropDetails = await Crop.findById(cropId);
		if (!cropDetails) {
			return res.status(404).json({
				success: false,
				message: "Crop details not found"
			})
		}
		if (isDefaultValues == false && (!cropQuantity || !pricePerUnit)) {
			return res.status(404).json({
				success: false,
				message: "please provide a purchase details"
			})
		}

		const deal = new Deals({
			farmer: farmerId,
			dealer: dealerId,
			pricePerUnit: isDefaultValues === true ? cropDetails.pricePerUnit : pricePerUnit,
			crop: cropId,
			totalQuantity: isDefaultValues === true ? cropDetails.totalQuantity : cropQuantity,
		});

		cropDetails.quantityAvailable = isDefaultValues === true ? 0 : cropDetails.totalQuantity - cropQuantity;
		cropDetails.previousSalesCount++;
		cropDetails.deals.push(deal.id);
		await cropDetails.save();
		await deal.save();


		return res.status(200).json({
			success: true,
			message: "Details saved successfully"
		})
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
}