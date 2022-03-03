const { SCHEMA_OPTION } = require("../utils/constant");

const mongoose = require("mongoose");
const { Schema } = mongoose;

const RestaurantSchema = new Schema(
	{
		name: String,
		wallet: Number,
		open: Date,
		close: Date,
	},
	SCHEMA_OPTION
);

const Restaurant = mongoose.model("RESTAURANT", RestaurantSchema, "RESTAURANT");
module.exports = Restaurant;
