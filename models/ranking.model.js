const { SCHEMA_OPTION } = require("../utils/constaints");

const mongoose = require("mongoose");
const { Schema } = mongoose;

const RankingSchema = new Schema(
	{
		name: {
			type: String,
			enum: ["Thành Viên", "Bạc", "Vàng", "Bạch Kim", "Kim Cương"],
		},
		min_exp: { type: Number, enum: [0, 1800, 7800, 18000, 38000] },
		code: {
			type: String,
			enum: ["NORMAL", "SILVER", "GOLD", "PLATINUM", "DIAMOND"],
		},
	},
	SCHEMA_OPTION
);

const Ranking = mongoose.model("RANKING", RankingSchema, "RANKING");

module.exports = Ranking;
