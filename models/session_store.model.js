const { SCHEMA_OPTION } = require("../utils/constant");

const mongoose = require("mongoose");
const { Schema } = mongoose;

const sessionStoreSchema = new Schema(
	{
		data: [{ type: Schema.Types.ObjectId, ref: "FOODS" }],
	},
	SCHEMA_OPTION
);

const SessionStore = mongoose.model("SESSION", sessionStoreSchema, "SESSION");

module.exports = SessionStore;
