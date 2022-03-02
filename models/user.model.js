const mongoose = require("mongoose");
const { Schema } = mongoose;

const userScheme = new Schema({
    type: { type: Schema.Types.ObjectId, ref: "ACCOUNT_TYPES"},
    first_name: String,
    last_name: String,
    avatar: String,
    current_ranking: Number,
    score: Number,
    isVerifyMail: Boolean
});

const User = mongoose.model("USER", userScheme, "USER");

module.exports = User;