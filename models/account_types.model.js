const mongoose = require("mongoose");
const { Schema } = mongoose;

const accountTypesSchema = new Schema({
    name: { type: String, enum: ["admin", "manager", "customer", "shipper", "seller"]},
    user_id: Number
});

const AccountTypes = mongoose.model("ACCOUNT_TYPES", accountTypesSchema, "ACCOUNT_TYPES");

module.exports = AccountTypes;