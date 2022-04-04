const { SCHEMA_OPTION } = require("../utils/constant");

const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
	{
		username: String,
		password: String,
		email: String,
		phone: String,
		first_name: String,
		last_name: String,
		avatar: { type: String, default: "" },
		current_ranking: {
			type: Schema.Types.ObjectId,
			default: "6220f056e746d247310976e4",
			ref: "RANKING",
		},
		score: { type: Number, default: 0 },
		verify_code: { type: String, length: 4 },
		isVerifyMail: { type: Boolean, default: false },
	},
	SCHEMA_OPTION
);

userSchema.static({
	get: async function (id) {
		return await this.findOne({ id }).populate(["current_ranking"]);
	},
	updateUser: async function (userId, $set) {
		await this.updateOne({ id: userId }, { $set });
		return this.get(userId);
	},
});

const User = mongoose.model("USER", userSchema, "USER");

module.exports = User;
