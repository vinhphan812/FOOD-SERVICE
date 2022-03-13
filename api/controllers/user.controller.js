const ComfirmMail = require("../../models/confirm_mail.model");
const User = require("../../models/user.model");

module.exports = {
	getMe: (req, res, next) => {
		const { user } = res.locals;

		res.json({ success: true, data: user });
	},
	changeRole: (req, res, next) => {
		const { user } = res.locals;
		const role = req.body.role.toUpperCase();

		if (user.type.include(role))
			res.json({
				success: true,
				message: "CHANGE_PERMISSION_SUCCESS",
			});
		else res.json({ success: false, message: "USER_NO_PERMISSION" });
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
};
