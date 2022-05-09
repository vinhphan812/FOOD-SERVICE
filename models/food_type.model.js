const {
	SCHEMA_OPTION,
	makeQuery,
	ignoreModel,
} = require("../utils/constaints");

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

FoodTypeSchema.static({
	getAll: function () {
		return this.find(makeQuery(), ignoreModel(["description"]));
	},
});

const FoodType = mongoose.model("FOOD_TYPE", FoodTypeSchema, "FOOD_TYPE");

module.exports = FoodType;
