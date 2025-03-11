import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinaryConfig.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let folder = "blog_media";
    let resourceType = "image";

    if (file.mimetype.startsWith("video/")) {
      folder = "blog_video";
      resourceType = "video";
    }

    return {
      folder: folder,
      resource_type: resourceType,
      allowed_formats: ["jpg", "png", "jpeg", "mp4", "avi"],
    };
  },
});

const upload = multer({ storage });

export default upload;
