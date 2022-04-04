const mongoose = require("mongoose");
const { SCHEMA_OPTION } = require("../utils/constant");
const { Schema } = mongoose;

const BranchSchema = new Schema(
	{
		address: String,
		name: String,
		phone: { type: String, default: "0334561242" },
	},
	SCHEMA_OPTION
);

const Branch = mongoose.model("BRANCH", BranchSchema, "BRANCH");

module.exports = Branch;
