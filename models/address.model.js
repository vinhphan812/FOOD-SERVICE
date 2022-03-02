const mongoose = require("mongoose");
const { Schema } = mongoose;

const addressSchema = new Schema(
	{
		name: String,
		location: String,
		address: String,
	},
	{ versionKey: false }
);

const Address = mongoose.model("ADDRESS", addressSchema, "ADDRESS");

module.exports = Address;
