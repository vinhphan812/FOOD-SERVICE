const {
	SCHEMA_OPTION,
	ignoreModel,
	makeQuery,
} = require("../utils/constaints");

const mongoose = require("mongoose");
const { Schema } = mongoose;

const NotificationSchema = new Schema(
	{
		title: String,
		body: String,
		href: String,
		is_delete: { type: Boolean, default: false },
		recipient: { type: Schema.Types.ObjectId, ref: "USER" },
		is_seen: { type: Boolean, default: false },
		date: { type: Date, default: new Date() },
	},
	SCHEMA_OPTION
);

NotificationSchema.static({
	getMyNotifications: function (recipient, is_delete, limit) {
		const query = this.find(
			makeQuery({ recipient }, is_delete),
			ignoreModel(["recipient"])
		);
		return query.sort({date: -1});
	},
	seen: async function (_id, is_seen = true) {
		await this.updateMany(_id ? { _id } : {}, { $set: { is_seen } });

		return _id ? "SEEN_SUCCESSFUL" : "SEEN_ALL_SUCCESSFUL";
	},
});

const Notification = mongoose.model(
	"NOTIFICATION",
	NotificationSchema,
	"NOTIFICATION"
);
module.exports = Notification;
