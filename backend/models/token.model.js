import mongoose from "mongoose";
const tokenSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	token: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
		expires: 5 * 60,
	},
});


export default mongoose.model("Token", tokenSchema);
