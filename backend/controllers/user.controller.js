import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import mongoose from "mongoose";
import dotenv from "dotenv";
import mailSender from "../utils/mailSender.js";
import Token from "../models/token.model.js";
import cloudinary from "cloudinary";
import passport from "passport";
dotenv.config();
const address = {
  formattedAddress: "Nariman Point, Mumbai, Maharashtra, India",
  city: "Mumbai",
  state: "Maharashtra",
  country: "India",
  pincode: "400021",
  location: {
    type: "Point",
    coordinates: [72.8258, 18.925],
  },
  placeId: "ChIJwe1EZjDG5zsRaYxkjY_tpF0",
};

export const register = async (req, res) => {
  const { email, password, fullName } = req.body;
  console.log("Registering user:");
  if (!email || !password || !fullName) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const existingUser = await User.find({ email: email });
    if (existingUser.length > 0) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      email: email,
      password: hashPassword,
      fullName: fullName,
    });
    console.log("New User:", newUser);
    await newUser.save();
    return res.status(200).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({
      success: false,
      error: error.message || "Internal Server Error",
    });
  }
};

export const magiclinkRegistrationController = async (req, res, next) => {
  passport.authenticate(
    "magiclink",
    { action: "requestToken", passReqToCallback: true },
    async (err, user, info) => {
      // console.log("Passport callback executed", err, user, info);

      if (err) {
        console.error("Error in authentication:", err);
        return res
          .status(500)
          .json({ success: false, error: "Internal Server Error" });
      }

      console.log("User Info:", user, info);

      if (!user) {
        return res
          .status(400)
          .json({ success: false, message: "Failed to send magic link" });
      }

      return res
        .status(200)
        .json({ success: true, message: "Magic link sent successfully", user });
    }
  )(req, res, next);

  // console.log("req.res.json", req.res)
  // return res.status(200).json({ success: true, message: "Magic link sent successfully" });
};
export const magiclinkCallbackRegistrationController = async (
  req,
  res,
  next
) => {
  (req, res, next) => {
    passport.authenticate("magiclink", (err, user, info) => {
      // console.log("user : " + user)

      if (!user?.success) {
        return res.status(400).json({ error: "Invalid or expired magic link" });
      }

      // console.log("User authenticated successfully:", user);
      req.login(user.user, (err) => {
        if (err) {
          console.error("Session login error:", err);
          return res.status(500).json({ error: "Login failed" });
        }
        return res.redirect("/api/auth/hii"); // Redirect to success page
      });
    })(req, res, next);
  };
};

// export const login = async (req, res, next) => {
//   passport.authenticate("local", (err, user, info) => {
//     if (err) return next(err);
//     if (!user)
//       return res.status(401).json({ success: false, message: info.message });

//     req.login(user, (err) => {
//       if (err) return next(err);

//       // Send success response
//       return res.status(200).json({
//         success: true,
//         message: "Logged in successfully",
//         user: user, // Only send necessary user data
//       });
//     });
//   })(req, res, next);
// };

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  console.log("Login attempt with email:", email);
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      userId: user._id,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const logout = async (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ error: err.message });
    req.session.destroy();
    res.json({ message: "Logged out" });
  });
};

export const completeUserProfile = async (req, res) => {
  try {
    const { address, mobileNumber, profileUrl, userId } = req.body;
    if (profileUrl) {
      const cloud = await cloudinary.v2.uploader.upload(
        profileUrl,
        {
          folder: process.env.FOLDER_NAME,
        },
        (err, result) => {
          if (err)
            return res.status(500).json({
              success: false,
              message: err.message,
            });
        }
      );
    }
    const user = await User.findByIdAndUpdate(
      { _id: userId },
      {
        address: {
          formattedAddress: address.formattedAddress,
          city: address.city,
          state: address.state,
          country: address.country,
          pincode: address.pincode,
          location: address.location,
        },
        phone: mobileNumber,
        // profile: {
        // 	url: cloud.secure_url,
        // 	filepath: cloud.public_id
        // }
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "profile updeted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message || "internal server error",
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).select(
      "-password -__v -createdAt -updatedAt"
    );
    console.log(user);
    return res.status(200).send({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message || "internal server error",
    });
  }
};

export const getUsers = (req, res) => {};

export const updateUser = (req, res) => {
  try {
    const userId = req.params.id;
    console.log("Updating user with ID:", userId);
    const { fullName, phone, address, category } = req.body;
    const { profile } = req.files || {};

    if (!fullName || !phone || !address || !category) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = User.findByIdAndUpdate(
      userId,
      {
        fullName: fullName,
        phone: phone,
        address: {
          formattedAddress: address.formattedAddress,
          city: address.city,
          state: address.state,
          country: address.country,
          pincode: address.pincode,
          profile: {
            url: profile ? profile[0].secure_url : "",
            filepath: profile ? profile[0].public_id : "",
          },
        },
        categories: category,
      },
      { new: true } // Return the updated user
    ).select("-password -__v -createdAt -updatedAt");

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message || "Internal server error",
    });
  }
};

//resetPassword token
export const resetPasswordToken = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const token = crypto.randomBytes(20).toString("hex");
    const saveToken = await Token.findOneAndUpdate(email, { token: token });

    //create url

    const url = `${process.env.FRONTEND_URL}/update-password/${token}`;
    await mailSender(
      email,
      "password reset link",
      `password reset link : ${url}`
    );

    return res.status(200).json({
      success: true,
      message: "email sent successfully please change password",
    });
  } catch (error) {
    console.log("resetpaassword ganarate error: " + error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

//resetPassword
export const forgotPassword = async (req, res) => {
  try {
    //data fetch
    const { password, confirmPassword, token } = req.body;
    // console.log(token);
    if (password !== confirmPassword) {
      return res.status(403).json({
        success: false,
        message: "password is not matching",
      });
    }
    // let objecttoken = new mongoose.Types.ObjectId(token);
    // console.log(objecttoken);

    const tokenDetails = await Token.findOne({ token: token });
    console.log(tokenDetails);
    if (!tokenDetails) {
      return res.status(403).json({
        success: false,
        message: "token is invalid",
      });
    }
    //hash password
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const hashPassword = await bcrypt.hash(password, salt);
    await User.findOneAndUpdate(
      { email: tokenDetails.email },
      {
        password: hashPassword,
      },
      { new: true }
    );
    await tokenDetails.deleteOne();
    return res.status(200).json({
      success: true,
      message: "password reset successfully",
    });
  } catch (error) {
    console.log("resetpaassword error: " + error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
