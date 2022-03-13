const { SCHEMA_OPTION } = require("../utils/constant");

const mongoose = require("mongoose");
const { Schema } = mongoose;

const addressSchema = new Schema(
	{
		location: String,
		address: String,
		user_id: { type: Schema.Types.ObjectId, ref: "USER" },
		is_default: { type: Schema.Types.Boolean, default: false },
		is_delete: { type: Schema.Types.Boolean, default: false },
	},
	SCHEMA_OPTION
);

const Address = mongoose.model("ADDRESS", addressSchema, "ADDRESS");

module.exports = Address;
