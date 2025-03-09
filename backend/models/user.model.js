import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: true,
      validate: {
        validator: (email) => {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        },
      },
      message: "Invalid email format!",
    },
    password: {
      type: String,
      required: true,
    },
    profile: {
      type: String,
      default:
        "https://www.pngkey.com/png/full/115-1150152_default-profile-picture-avatar-png-green.png",
    },
    categories: {
      type: String,
      enum: ["Farmer", "Dealer", "Contractors"],
      default: "Farmer",
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
      trim: true,
      validate: {
        validator: (phone) => {
          return /^[0-9]{10}$/.test(phone.toString());
        },
      },
      message: "Phone number must be exactly 10 digits!",
    },
  },
  { timestamps: true }
);

export const User = new mongoose.model("Users", userSchema);
