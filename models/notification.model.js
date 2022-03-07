const { SCHEMA_OPTION } = require("../utils/constant");

const mongoose = require("mongoose");
const { Schema } = mongoose;

const NotificationSchema = new Schema(
	{
		title: String,
		content: String,
		href: String,
		is_delete: { type: Boolean, default: false },
		type: {
			type: Schema.Types.String,
			enum: ["ORDER", "VOUCHER", "APP", "SHIPPER"],
		},
	},
	SCHEMA_OPTION
);

const Notification = mongoose.model(
	"NOTIFICATION",
	NotificationSchema,
	"NOTIFICATION"
);

module.exports = Notification;
