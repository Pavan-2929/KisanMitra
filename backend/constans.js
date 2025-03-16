const registration = {
	"email": "lodhakrunal464@gmail.com",
	"categories": "Dealer",
	"fullName": "Lodha Krunal",
	"address": {
		"formattedAddress": "Nariman Point, Mumbai, Maharashtra, India",
		"city": "Mumbai",
		"state": "Maharashtra",
		"country": "India",
		"pincode": "400021",
		"location": {
			"type": "Point",
			"coordinates": [72.8258, 18.9250]
		},
		"placeId": "ChIJwe1EZjDG5zsRaYxkjY_tpF0"
	},
	"userIp": "168.1.1.1"
}


import axios from "axios";

const loginUser = async (email, password) => {
	try {
		const response = await axios.post(
			"http://localhost:5000/api/auth/login",
			{ email, password },
			{ withCredentials: true } // Ensures cookies are sent
		);

		console.log("✅ Login Success:", response.data);
		return response.data;
	} catch (error) {
		console.error("❌ Login Error:", error.response?.data || error.message);
		return error.response?.data || { success: false, message: "Login failed" };
	}
};

const cropdata = [
	{
		"name": "Rice",
		"description": "Premium quality basmati rice, organically grown.",
		"cropVariety": "Basmati",
		"cropAge": {
			"value": 5,
			"unit": "months"
		},
		"harvestDate": "2025-02-20T00:00:00.000Z",
		"fertilizerUsed": "Natural manure",
		"pesticidesUsed": "None",
		"soilType": "Clay",
		"moistureContent": 14,
		"processingDetails": "Semi-processed",
		"quantityAvailable": 800,
		"unitOfcrop": "kg",
		"pricePerUnit": 40,
		"negotiable": false,
		"storageType": "Cold storage",
		"userId": "67d2dfb7cf1e4a34a9696b7e",
		"cropImagesUrl": [
			{
				"url": "https://res.cloudinary.com/dkzp8h6xw/image/upload/v1741873622/crops-growing-in-thailand_itn9lg.jpg"
			},
			{
				"url": "https://res.cloudinary.com/dkzp8h6xw/image/upload/v1741873622/crops-growing-in-thailand_itn9lg.jpg"
			}
		]
	},
	{
		"name": "Maize",
		"description": "High-yield hybrid maize with excellent quality.",
		"cropVariety": "Hybrid",
		"cropAge": {
			"value": 3,
			"unit": "months"
		},
		"harvestDate": "2025-03-05T00:00:00.000Z",
		"fertilizerUsed": "Urea, DAP",
		"pesticidesUsed": "Mancozeb",
		"soilType": "Sandy loam",
		"moistureContent": 10,
		"processingDetails": "Raw",
		"quantityAvailable": 600,
		"unitOfcrop": "quintal",
		"pricePerUnit": 22,
		"negotiable": true,
		"storageType": "Open-air barn",
		"userId": "67cf41c07a9cbdcd24d7ff02",
		"cropImagesUrl": [
			{
				"url": "https://res.cloudinary.com/dkzp8h6xw/image/upload/v1741873622/crops-growing-in-thailand_itn9lg.jpg"
			},
			{
				"url": "https://res.cloudinary.com/dkzp8h6xw/image/upload/v1741873622/crops-growing-in-thailand_itn9lg.jpg"
			}
		]
	},
	{
		"name": "Tomato",
		"description": "Fresh, organic tomatoes with rich taste and color.",
		"cropVariety": "Cherry Tomato",
		"cropAge": {
			"value": 6,
			"unit": "weeks"
		},
		"harvestDate": "2025-03-10T00:00:00.000Z",
		"fertilizerUsed": "Vermicompost",
		"pesticidesUsed": "Neem oil",
		"soilType": "Silty loam",
		"moistureContent": 18,
		"processingDetails": "Packaged",
		"quantityAvailable": 400,
		"unitOfcrop": "kg",
		"pricePerUnit": 35,
		"negotiable": true,
		"storageType": "Refrigerated storage",
		"userId": "67d2dfb7cf1e4a34a9696b7e",
		"cropImagesUrl": [
			{
				"url": "https://res.cloudinary.com/dkzp8h6xw/image/upload/v1741873622/crops-growing-in-thailand_itn9lg.jpg"
			},
			{
				"url": "https://res.cloudinary.com/dkzp8h6xw/image/upload/v1741873622/crops-growing-in-thailand_itn9lg.jpg"
			}
		]
	},
	{
		"name": "Sugarcane",
		"description": "High-sucrose sugarcane, grown using sustainable methods.",
		"cropVariety": "Co-0238",
		"cropAge": {
			"value": 8,
			"unit": "months"
		},
		"harvestDate": "2025-01-25T00:00:00.000Z",
		"fertilizerUsed": "NPK mix",
		"pesticidesUsed": "No chemicals used",
		"soilType": "Clayey loam",
		"moistureContent": 20,
		"processingDetails": "Raw",
		"quantityAvailable": 1000,
		"unitOfcrop": "ton",
		"pricePerUnit": 3000,
		"negotiable": false,
		"storageType": "Covered storage",
		"userId": "67cf41c07a9cbdcd24d7ff02",
		"cropImagesUrl": [
			{
				"url": "https://res.cloudinary.com/dkzp8h6xw/image/upload/v1741873622/crops-growing-in-thailand_itn9lg.jpg"
			},
			{
				"url": "https://res.cloudinary.com/dkzp8h6xw/image/upload/v1741873622/crops-growing-in-thailand_itn9lg.jpg"
			}
		]
	},
	{
		"name": "Soybean",
		"description": "Non-GMO, high-protein soybean ideal for food processing.",
		"cropVariety": "JS 335",
		"cropAge": {
			"value": 4,
			"unit": "months"
		},
		"harvestDate": "2025-02-15T00:00:00.000Z",
		"fertilizerUsed": "Phosphate-based",
		"pesticidesUsed": "Organic spray",
		"soilType": "Sandy",
		"moistureContent": 13,
		"processingDetails": "Semi-processed",
		"quantityAvailable": 700,
		"unitOfcrop": "quintal",
		"pricePerUnit": 50,
		"negotiable": true,
		"storageType": "Warehouse storage",
		"userId": "67d2dfb7cf1e4a34a9696b7e",
		"cropImagesUrl": [
			{
				"url": "https://res.cloudinary.com/dkzp8h6xw/image/upload/v1741873622/crops-growing-in-thailand_itn9lg.jpg"
			},
			{
				"url": "https://res.cloudinary.com/dkzp8h6xw/image/upload/v1741873622/crops-growing-in-thailand_itn9lg.jpg"
			}
		]
	}
]


const completeUserProfile = async () => {
	try {
		cropdata.map(async (cropData) => {

			const response = await axios.post(
				"http://localhost:5000/api/crops/add-new-crop",
				cropData,
			);
		});

		// console.log("", response.data);
	} catch (error) {
		console.error("❌ Profile Update Error:", error.response?.data || error.message);
		return error.response?.data || { success: false, message: "Profile update failed" };
	}
};

// Example Usage:
const profileData = {
	address: {
		formattedAddress: "123 Street, City",
		city: "City Name",
		state: "State Name",
		country: "Country Name",
		pincode: "123456",
		location: { lat: 12.34, lng: 56.78 }
	},
	mobileNumber: "+1234567890",
	profileUrl: null,// Base64 image string
};

// loginUser("lodhakrunal464@gmail.com", "1234");
// completeUserProfile();

