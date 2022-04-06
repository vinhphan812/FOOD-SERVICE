const ComfirmMail = require("../../models/confirm_mail.model");

const {
	User,
	VirtualDisplayVoucher,
	Notification,
	Order,
} = require("../../models/require.model");

module.exports = {
	getMe: (req, res, next) => {
		const { user } = res.locals;

		res.json({ success: true, data: user });
	},
	updateMe: async (req, res, next) => {
		const { user } = res.locals;

		const updateUser = await User.updateUser(user.id, req.body);

		res.json({ success: true, data: updateUser });
	},
	getMyVouchers: async (req, res, next) => {
		const { user } = res.locals;

		const myVoucher = await VirtualDisplayVoucher.myVouchers(user.id);

		res.json({ success: true, count: myVoucher.length, data: myVoucher });
	},

	getMyHistoryOrders: async (req, res, next) => {
		const { is_delete } = req.query;
		const { user } = res.locals;

		const myHistoryOrder = await Order.getOrder(user.id, !!is_delete);

		res.json({ success: true, data: myHistoryOrder });
	},

	getMyNotifications: async (req, res, next) => {
		const { is_delete, limit } = req.query;
		const { user } = res.locals;
		const myNotification = await Notification.getMyNotifications(
			user.id,
			!!is_delete,
			limit
		);
		res.json({ success: true, data: myNotification });
	},

	seenNotifications: async (req, res, next) => {
		const { notify_ids, is_seen } = req.body;

		const message = await Notification.seen(notify_ids, !!is_seen);

		res.json({ success: true, message });
	},

	confirmMail: async (req, res, next) => {
		const { code } = req.body,
			{ user } = res.locals;

		if (!code)
			return res.json({
				success: false,
				message: "CONFIRM_CODE_REQUIRED",
			});

		const currentDate = new Date();
		const userConfirmMail = await ComfirmMail.findOne({
			user_id: user._id,
		});
		if (!userConfirmMail)
			return res.json({
				success: false,
				message: "COMFIRM_NOT_FOUND",
			});

		if (userConfirmMail.expires < currentDate)
			return res.json({
				success: false,
				message: "CONFIRM_CODE_EXPIRED",
			});

		if (userConfirmMail.code != code)
			return res.json({ success: false, message: "CONFIRM_FAIL" });

		await User.updateOne(
			{ _id: user._id },
			{ $set: { isVerifyEmail: true } }
		);

		res.json({ success: true, message: "VERIFY_SUCCESS" });
	},
	createOrder: async (req, res) => {
		const { user, sessionId } = res.locals;
		const { branch, note, voucher_ship, voucher_using } = req.body;

		const { success, message, total } = await Order.createOrder(
			sessionId,
			user.id,
			branch,
			note,
			voucher_ship,
			voucher_using
		);

		//TODO: create order success up score => up ranking
		if (success) {
			user.upScore(total);
		}

		res.json({ success, message });
	},
	upScore: async (req, res) => {
		const { user } = res.locals;
		const { total } = req.body;

		await user.upScore(total);

		res.json({ success: true, data: user });
	},
};
