const { SCHEMA_OPTION } = require("../utils/constant");

const mongoose = require("mongoose");
const { Schema } = mongoose;

const userScheme = new Schema(
	{
		user_name: String,
		password: String,
		email: String,
		phone: String,
		type: [
			{
				type: String,
				enum: ["admin", "manager", "customer", "shipper", "seller"],
			},
		],
		first_name: String,
		last_name: String,
		avatar: String,
		current_ranking: Number,
		score: Number,
		isVerifyMail: Boolean,
		shipper_id: { type: Schema.Types.ObjectId, ref: "SHIPPER" },
		restaurant_id: { type: Schema.Types.ObjectId, ref: "RESTAURANT" },
	},
	SCHEMA_OPTION
);

const User = mongoose.model("USER", userScheme, "USER");

module.exports = User;
