const mongoose = require("mongoose");
const { Schema } = mongoose;

const virtualOrderDisplaySchema = new Schema(
	{
		order_id: { type: Schema.Types.ObjectId, ref: "ORDER" },
		account_id: { type: Schema.Types.ObjectId, ref: "ACCOUNT" },
	},
	{ versionKey: false }
);

const VirtualOrderDisplay = mongoose.model(
	"VIRTUAL_ORDER_DISPLAY",
	virtualOrderDisplaySchema,
	"VIRTUAL_ORDER_DISPLAY"
);

module.exports = VirtualOrderDisplay;
