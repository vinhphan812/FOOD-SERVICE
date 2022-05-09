const { getMessaging } = require("firebase-admin/messaging");

const Notification = require("../models/notification.model");
const Order = require("../models/order.model");

module.exports = class NotificationFactory {
	constructor() {}
	static createNotify(
		notification = { title, body },
		token,
		recipient,
		href
	) {
		return new Promise(async (resolve, reject) => {
			try {
				await Notification.create({
					...notification,
					recipient,
					href,
				});

				getMessaging()
					.send({ notification, token })
					.then((res) => {
						resolve({
							success: true,
							message: "CREATE_NOTIFICATION_SUCCESS",
						});
					})
					.catch((err) => {
						reject({ success: false, message: err.message });
					});
			} catch ({ message }) {
				reject({ success: false, message });
			}
		});
	}
	static forOrder(_id) {
		return new Promise(async (resolve, reject) => {
			const order = await Order.findOne({ _id });

			const title = "";

			Notification.create({});
		});
	}
};
