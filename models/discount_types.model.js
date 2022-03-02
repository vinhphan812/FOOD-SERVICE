const mongoose = require("mongoose");
const { Schema } = mongoose;

const discountTypesSchema = new Schema({
    name: { type: String, enum: ["money", "percent"]}
});

const DiscountType = mongoose.model("DISCOUNT_TYPES", discountTypesSchema, "DISCOUNT_TYPES");

module.exports = DiscountType;