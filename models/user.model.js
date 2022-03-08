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
				enum: ["ADMIN", "MANAGER", "CUSTOMER", "SHIPPER", "SELLER"],
			},
		],
		first_name: String,
		last_name: String,
		avatar: { type: String, default: "" },
		current_ranking: {
			type: Schema.Types.ObjectId,
			default: "6220f056e746d247310976e4",
		},
		score: { type: Number, default: 0 },
		verify_code: { type: String, length: 4 },
		isVerifyMail: { type: Boolean, default: false },
		shipper_id: { type: Schema.Types.ObjectId, ref: "SHIPPER" },
		restaurant_id: { type: Schema.Types.ObjectId, ref: "RESTAURANT" },
	},
	SCHEMA_OPTION
);

const User = mongoose.model("USER", userScheme, "USER");

module.exports = User;
