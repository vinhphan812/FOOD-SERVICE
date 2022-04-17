const { SCHEMA_OPTION, ignoreModel } = require("../utils/constant");
const Ranking = require("./ranking.model");

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
		return await this.findOne({ id }, ignoreModel(["password"])).populate(
			["current_ranking"]
		);
	},
	updateUser: async function (userId, $set) {
		await this.updateOne({ id: userId }, { $set });
		return this.get(userId);
	},
});

userSchema.method({
	upScore: async function (total) {
		const score = this.score + total * 0.001;
		await this.updateOne({ score });
		this.score = score;

		const rankingList = await Ranking.find({});

		for (const ranking of rankingList.reverse())
			if (
				this.score >= ranking.min_exp &&
				ranking.id != this.current_ranking.id
			) {
				await this.updateOne({ current_ranking: ranking.id });

				this.current_ranking = ranking;

				//TODO: create Notification

				break;
			}
	},
});

const User = mongoose.model("USER", userSchema, "USER");

module.exports = User;
