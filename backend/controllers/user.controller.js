import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import mongoose from "mongoose";
import dotenv from "dotenv";
import mailSender from "../utils/mailSender.js";
import Token from "../models/token.model.js"
dotenv.config();

export const register = (req, res) => { };

export const login = async (req, res) => {

	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.status(404).json({
				success: false,
				error: "Provide full credentials"
			})
		}
		const user = await User.findOne({ email: email });
		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			return res.status(401).json({
				success: false,
				message: "Invalid credentials",
			});
		}

		if (!user) {
			return res.status(404).json({
				success: false,
				message: "user not found"
			})
		}
		if (!user.isVerified) {
			return res.status(500).json({
				success: false,
				message: "user is not verified"
			});
		}

		req.login(user, (err) => {
			if (err) {
				console.error("Session login error:", err);
				return res.status(500).json({ error: "Login failed" });
			}
			return res.redirect("/api/auth/hii"); // Redirect to success page
		});

	} catch (error) {
		console.log(error)
		return res.status(500).json({
			success: false,
			error: error.message || "internal server error"
		})
	}
};

export const logout = async (req, res) => {
	req.logout((err) => {
		if (err) return res.status(500).json({ error: err.message });
		req.session.destroy();
		res.json({ message: "Logged out" });
	});
};

export const getUser = (req, res) => { };

export const getUsers = (req, res) => { };

export const updateUser = (req, res) => { };


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
		await User.findOneAndUpdate({ email: tokenDetails.email },
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
