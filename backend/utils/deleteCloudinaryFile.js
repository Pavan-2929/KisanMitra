import cloudinary from "../config/cloudinaryConfig.js";

const deleteCloudinaryFile = async (fileUrl) => {
  try {
    const urlParts = fileUrl.split("/");
    const fileNameWithExtention = urlParts[urlParts.length - 1];

    const fileName = decodeURIComponent(
      fileNameWithExtention.split(".").slice(0, -1).join(".")
    );
    const folder = urlParts[urlParts.length - 2];
    const publicId = `${folder}/${fileName}`;

    const isVideo = fileUrl.includes("/video/upload/");

    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: isVideo ? "video" : "image",
    });

    if (result.result !== "ok") throw new Error("Failed to delete file");

    console.log("File deleted successfully!");
  } catch (error) {
    console.log(error.message);
  }
};

export default deleteCloudinaryFile;
