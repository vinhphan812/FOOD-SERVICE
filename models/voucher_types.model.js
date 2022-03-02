const mongoose = require("mongoose");
const { Schema } = mongoose;

const voucherTypesSchema = new Schema({
    name: { type: String, enum: ["seller", "shipper", "app", "food"]}
});

const VoucherTypes = mongoose.model("VOUCHER_TYPES", voucherTypesSchema, "VOUCHER_TYPES");

module.exports = VoucherTypes;