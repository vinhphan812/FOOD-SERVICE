const mongoose = require("mongoose");
const { Schema } = mongoose;

const sessionStoreSchema = new Schema(
	{
		data: [{ type: Schema.Types.ObjectId, ref: "FOODS" }],
		// data: [String],
		date: { type: Date, default: new Date() },
	},
	{ versionKey: false }
);

const SessionStore = mongoose.model("SESSION", sessionStoreSchema, "SESSION");

module.exports = SessionStore;
