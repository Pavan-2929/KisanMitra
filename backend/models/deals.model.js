import mongoose from "mongoose";
const dealsSchema = new mongoose.Schema({
	crop: {
		type: mongoose.Types.ObjectId, ref: "Crops",
		required: true,
	},
	dealer: {
		type: mongoose.Types.ObjectId, ref: "Users",
		required: true,
	},
	farmer: {
		type: mongoose.Types.ObjectId, ref: "Users",
		required: true,
	},
	totalQuantity: { type: Number, required: true },
	pricePerUnit: { type: Number, required: true },
}, { timestamps: true });


export default mongoose.model("Deals", dealsSchema);
