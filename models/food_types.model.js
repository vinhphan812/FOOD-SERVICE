
const mongoose, { Schema } = require("mongoose");

const FoodTypeSchema = new Schema({
    name: String,
    description: String,
    is_delete: Boolean,
    code: String,
});

const FoodType = mongoose.model("FOOD_TYPES", FoodTypeSchema, "FOOD_TYPES");
 
module.exports = FoodType;