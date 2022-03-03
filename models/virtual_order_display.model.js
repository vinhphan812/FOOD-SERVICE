const { SCHEMA_OPTION } = require("../utils/constant");

const mongoose = require("mongoose");
const { Schema } = mongoose;

const virtualOrderDisplaySchema = new Schema(
	{
		order_id: { type: Schema.Types.ObjectId, ref: "ORDER" },
		account_id: { type: Schema.Types.ObjectId, ref: "ACCOUNT" },
	},
	SCHEMA_OPTION
);

const VirtualOrderDisplay = mongoose.model(
	"VIRTUAL_ORDER_DISPLAY",
	virtualOrderDisplaySchema,
	"VIRTUAL_ORDER_DISPLAY"
);

module.exports = VirtualOrderDisplay;
