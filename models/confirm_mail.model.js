const mongoose = require("mongoose");
const { Schema } = mongoose;

const confirmMailSchema = new Schema({
	user_id: { type: Schema.Types.ObjectId, ref: "USER" },
	code: { type: String, length: 6 },
	expires: Date,
});

const ComfirmMail = mongoose.model(
	"CONFIRM_MAIL",
	confirmMailSchema,
	"CONFIRM_MAIL"
);

module.exports = ComfirmMail;
