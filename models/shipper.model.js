const { SCHEMA_OPTION } = require("../utils/constant");

const mongoose = require("mongoose");
const { Schema } = mongoose;

const ShipperSchema = new Schema(
	{
		wallet: Number,
	},
	SCHEMA_OPTION
);

const Shipper = mongoose.model("SHIPPER", ShipperSchema, "ShIPPER");
module.exports = Shipper;
