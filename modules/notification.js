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
				if (token) {
					await getMessaging().send({ notification, token });
				}
				resolve({
					success: true,
					message: "CREATE_NOTIFICATION_SUCCESS",
				});
			} catch ({ message }) {
				reject({ success: false, message });
			}
		});
	}
	static forOrder(userId, _id, total, token) {
		return new Promise(async (resolve, reject) => {
			const href = "order/" + _id;

			const title = `Đơn hàng #${_id} đặt thành công`,
				body = `Đơn hàng #${_id} đã được đặt với giá tiền ${total}đ. Vui lòng nhận hàng khi shipper gọi`;
			NotificationFactory.createNotify(
				{ title, body },
				token,
				userId,
				href
			);
		});
	}
};
