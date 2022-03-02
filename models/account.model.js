const mongoose = require("mongoose");
const { Schema } = mongoose;

const accountSchema = new Schema({
    user_name: String,
    password: String,
    email: String,
    phone: String
});

const Account = mongoose.model("ACCOUNT", accountSchema, "ACCOUNT");

module.exports = Account;