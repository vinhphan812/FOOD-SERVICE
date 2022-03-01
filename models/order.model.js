const mongoose = require("mongoose");
const { Schema } = mongoose;

const FoodSchema = new Schema();

const Food = mongoose.model("FOODS", FoodSchema, "FOODS");

module.exports = Food;
