const { SCHEMA_OPTION } = require("../utils/constant");

const mongoose = require("mongoose");
const { Schema } = mongoose;

const FoodSchema = new Schema(
	{
		name: String,
		description: String,
		thumbnail: String,
		price: Number,
		type: [{ type: Schema.Types.ObjectId, ref: "FOOD_TYPE" }],
		is_delete: Boolean,
		code: String,
		is_stock: Boolean,
		average_rating: { type: Number, min: 0, max: 5 },
		rating_count: Number,
		restaurant: { type: Schema.Types.ObjectId, ref: "RESTAURANT" },
	},
	SCHEMA_OPTION
);

const Food = mongoose.model("FOOD", FoodSchema, "FOOD");

module.exports = Food;
