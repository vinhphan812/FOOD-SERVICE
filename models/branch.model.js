const mongoose = require("mongoose");
const { SCHEMA_OPTION } = require("../utils/constaints");
const { Schema } = mongoose;

const BranchSchema = new Schema(
	{
		address: String,
		name: String,
		latLng: {
			latitude: Number,
			longitude: Number,
		},
		phone: { type: String, default: "0334561242" },
	},
	SCHEMA_OPTION
);

const Branch = mongoose.model("BRANCH", BranchSchema, "BRANCH");

module.exports = Branch;
