import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
  formattedAddress: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String, default: "india" },
  pincode: { type: String },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number],
    },
  },
  placeId: { type: String },
});

AddressSchema.index({ location: "2dsphere" });

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      // required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      // required: true,
      validate: {
        validator: (email) => {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        },
      },
      message: "Invalid email format!",
    },
    password: {
      type: String,
      // required: true,
    },
    profile: {
      url: {
        type: String,
        default:
          "https://www.pngkey.com/png/full/115-1150152_default-profile-picture-avatar-png-green.png",
      },
      filepath: { type: String, default: "" },
    },
    googleId: {
      type: String,
    },
    userId: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    categories: {
      type: String,
      enum: ["Farmer", "Dealer", "Contractors"],
      default: "Farmer",
    },
    address: AddressSchema,
    crops: [{ type: mongoose.Types.ObjectId, ref: "Crops" }],
    phone: {
      type: Number,
      // required: true,
      trim: true,
      validate: {
        validator: (phone) => {
          return /^[0-9]{10}$/.test(phone.toString());
        },
      },
      message: "Phone number must be exactly 10 digits!",
    },
    blogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
