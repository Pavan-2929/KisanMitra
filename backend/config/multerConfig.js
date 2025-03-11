import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinaryConfig.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    if (!file) {
      return;
    }

    let folder = "blog_media";
    if (file.mimetype.startsWith("video/")) {
      folder = "blog_video";
    }

    return {
      folder: folder,
      allowed_formats: ["jpg", "png", "jpeg", "mp4"],
    };
  },
});

const upload = multer({ storage });

export default upload;
