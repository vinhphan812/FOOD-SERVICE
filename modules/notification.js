const Notification = require("../models/notification.model");
const VirtualDisplayNotification = require("../models/virtual_display_notification.model");

module.exports = {
	createNotification: (
		displayIds,
		data = { title, content, href },
		referenceId
	) => {
		return new Promise(async (resolve, reject) => {
			try {
				const notification = await Notification.create(data);
				for (const user_id of displayIds) {
					await VirtualDisplayNotification.create({
						user_id,
						notify_id: notification.id,
					});
				}
				resolve({
					success: true,
					message: "CREATE_NOTIFICATION_SUCCESS",
				});
			} catch ({ message }) {
				reject({ success: false, message });
			}
		});
	},
};
