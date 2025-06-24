import mongoose from "mongoose";

const cropSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    cropVariety: { type: String },
    cropAge: {
      value: Number,
      unit: { type: String, enum: ["days", "weeks", "months"] },
    },
    harvestDate: { type: Date },
    fertilizerUsed: { type: String, default: "No" },
    pesticidesUsed: { type: String, default: "No" }, //The type of chemicals or natural substances used to protect the crop from pests (insects, fungi, etc.).
    soilType: { type: String },
    moistureContent: { type: Number, min: 0, max: 100 },
    processingDetails: {
      type: String,
      enum: ["Raw", "Semi-processed", "Packaged"],
    },
    qualityGrade: { type: String, enum: ["A", "B", "C", "Organic Certified"] },
    certifications: { type: [String] },
    quantityAvailable: { type: Number },
    totalQuantity: { type: Number, required: true },
    unitOfcrop: {
      type: String,
      required: true,
      enum: ["kg", "quintal", "ton"],
    },
    pricePerUnit: { type: Number, required: true },
    bulkDiscount: { type: String },
    negotiable: { type: Boolean, default: true },
    storageType: { type: String },
    deliveryOptions: { type: String, enum: ["Pickup", "Delivery", "Both"] },
    interestedDealers: [
      {
        user: { type: mongoose.Types.ObjectId, ref: "Users" },
        markDone: { type: Boolean, default: false },
      },
    ],
    cropImagesUrl: [{ url: String }],
    cropVideosUrl: [{ url: String }],
    farmer: { type: mongoose.Types.ObjectId, ref: "Users" },
    deals: [{ type: mongoose.Types.ObjectId, ref: "Deals" }],
    farmerVerificationStatus: { type: Boolean, default: false },
    ratings: { type: Number, min: 0, max: 5 },
    reviews: [{ user: mongoose.Types.ObjectId, comment: String }],
    previousSalesCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Crop = mongoose.model("Crop", cropSchema);
export default Crop;
