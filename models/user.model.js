const mongoose = require("mongoose");
const { Schema } = mongoose;

const userScheme = new Schema(
	{
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
	},
	{ versionKey: false }
);

const User = mongoose.model("USER", userScheme, "USER");

module.exports = User;
