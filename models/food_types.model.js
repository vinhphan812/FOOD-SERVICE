const mongoose = require("mongoose");
const { Schema } = mongoose;

const FoodTypeSchema = new Schema(
	{
		name: String,
		description: String,
		is_delete: Boolean,
		code: String,
	},
	{ versionKey: false }
);

const FoodType = mongoose.model("FOOD_TYPES", FoodTypeSchema, "FOOD_TYPES");

module.exports = FoodType;
