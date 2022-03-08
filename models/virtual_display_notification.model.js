const { SCHEMA_OPTION } = require("../utils/constant");

const mongoose = require("mongoose");
const { Schema } = mongoose;

const VirtualDisplayNotificationSchema = new Schema(
	{
		notify_id: { type: Schema.Types.ObjectId, ref: "NOTIFICATION" },
		user_id: { type: Schema.Types.ObjectId, ref: "USER" },
		is_delete: { type: Boolean, default: false },
		is_seen: { type: Boolean, default: false },
	},
	SCHEMA_OPTION
);

const VirtualDisplayNotification = mongoose.model(
	"VIRTUAL_DISPLAY_NOTIFICATION",
	VirtualDisplayNotificationSchema,
	"VIRTUAL_DISPLAY_NOTIFICATION"
);

module.exports = VirtualDisplayNotification;







