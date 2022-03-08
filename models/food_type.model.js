const { SCHEMA_OPTION } = require("../utils/constant");

const mongoose = require("mongoose");
const { Schema } = mongoose;

const FoodTypeSchema = new Schema(
	{
		name: String,
		description: String,
		is_delete: Boolean,
		code: String,
	},
	SCHEMA_OPTION
);

const FoodType = mongoose.model("FOOD_TYPE", FoodTypeSchema, "FOOD_TYPE");

module.exports = FoodType;
