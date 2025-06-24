import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.CLOUD_API_KEY,
	api_secret: process.env.CLOUD_API_SECRET,
});
const profileStorage = new CloudinaryStorage({
	cloudinary,
	params: { folder: "kishanmitra/profiles", format: "jpg jpeg png" },
});
const uploadProfileImage = multer({ storage: profileStorage }).single("profileImage");




// crop storage

const cropStorage = new CloudinaryStorage({
	cloudinary,
	params: { folder: "kishanmitra/crops", format: "jpg jpeg png" },
});
const uploadCropImages = multer({ storage: cropStorage }).array("cropImages", 10);


//farmer verification storage

const documentStorage = new CloudinaryStorage({
	cloudinary,
	params: async (req, file) => {
		return {
			folder: "kishanmitra/verification",
			format: file.mimetype === "application/pdf" ? "pdf" : "jpg",
			resource_type: file.mimetype === "application/pdf" ? "raw" : "image",
		};
	},
});
const uploadFarmerDocument = multer({ storage: documentStorage }).single("verificationDocument");

// const storage = new CloudinaryStorage({ cloudinary, params: { folder: "kishanmitra" } });
// const upload = multer({ storage });
// export const uploadToCloudinary = upload.single("profileImage");
// export const uploadMultiple = upload.array("images", 5);

export { uploadProfileImage, uploadCropImages, uploadFarmerDocument };
