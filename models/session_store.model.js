const mongoose = require("mongoose");
const { Schema } = mongoose;

const sessionStoreSchema = new Schema({
    data: String
});

const SessionStore = mongoose.model("SESSION_STORE", sessionStoreSchema, "SESSION_STORE");

module.exports = SessionStore;