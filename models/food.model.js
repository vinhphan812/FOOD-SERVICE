const { SCHEMA_OPTION } = require("../utils/constant");

const mongoose = require("mongoose");
const { Schema } = mongoose;

const FoodSchema = new Schema(
	{
		name: String,
		description: String,
		thumbnail: String,
		price: Number,
		food_type_id: { type: Schema.Types.ObjectId, ref: "FOOD_TYPES" },
		is_delete: Boolean,
		code: String,
		is_stock: Boolean,
		restaurant: { type: Schema.Types.ObjectId, ref: "RESTAURANT" },
	},
	SCHEMA_OPTION
);

const Food = mongoose.model("FOOD", FoodSchema, "FOOD");

module.exports = Food;
