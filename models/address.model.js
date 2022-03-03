const { SCHEMA_OPTION } = require("../utils/constant");

const mongoose = require("mongoose");
const { Schema } = mongoose;

const addressSchema = new Schema(
	{
		name: String,
		location: String,
		address: String,
	},
	SCHEMA_OPTION
);

const Address = mongoose.model("ADDRESS", addressSchema, "ADDRESS");

module.exports = Address;
