import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinaryConfig.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let folder = "Kishan_media";
    let resourceType = "image";

    if (file.mimetype.startsWith("video/")) {
      folder = "Kishan_video";
      resourceType = "video";
    }
    console.log("File being uploaded:", file.originalname);
    return {
      folder: folder,
      allowed_formats: ["jpg", "png", "jpeg", "mp4", "avi", "mov", "webp"],
      resource_type: resourceType,
    };
  },
});

const upload = multer({ storage });

export default upload;
