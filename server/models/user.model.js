import mongoose from "mongoose";
const { Schema, model } = mongoose;

const UserSchema = new Schema({
	email: {
		type: String,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	isVerified: {
		type: Boolean,
		default: false,
	},
	verificationLink: {
		type: String,
	},
});

export default model("User", UserSchema);
