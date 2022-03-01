const mongoose = require("mongoose");
const { Schema } = mongoose;

const FoodSchema = new Schema({
	name: String,
	description: String,
	thumbnail: String,
	price: Number,
	food_type_id: { type: Schema.Types.ObjectId, ref: "FOOD_TYPES" },
	is_delete: Boolean,
	code: String,
});

const Food = mongoose.model("FOODS", FoodSchema, "FOODS");

module.exports = Food;
