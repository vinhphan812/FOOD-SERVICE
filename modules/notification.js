const Notification = require("../models/notification.model");
const Order = require("../models/order.model");

module.exports = class NotificationFactory {
	constructor() {}
	static createNotify(data = { title, content, href, recipient }) {
		return new Promise(async (resolve, reject) => {
			try {
				const notification = await Notification.create(data);
				resolve({
					success: true,
					message: "CREATE_NOTIFICATION_SUCCESS",
				});
			} catch ({ message }) {
				reject({ success: false, message });
			}
		});
	}
	static forOrder(_id) {
		return new Promise(async (resolve, reject) => {
			const order = await Order.findOne({ _id });


			const title = ""

			Notification.create({})
		});
	}
};
