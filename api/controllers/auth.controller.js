const md5 = require("md5");
const User = require("../../models/user.model");

module.exports = {
	loginHandle: async (req, res, next) => {
		const { user, pass } = req.body;
		let success = false;

		const { id, type } = await User.findOne({
			$or: [{ user_name: user }, { email: user }, { phone: user }],
			password: md5(pass),
		});

		if (id) {
			success = true;
			res.cookie("userId", id, { signed: true });
			if (type.length) res.cookie("type", type[0], { signed: true });
		}

		res.json({
			success,
			message: success
				? "SUCCESS_AUTHENTICATION"
				: "FAIL_AUTHENTICATION",
		});
	},
	forgotHandle: (req, res, next) => {
		const { email } = req.body;

		//! send mail

		res.json({ success: true, message: "SEND_MAIL_SUCCESS" });
	},
	signUpHandle: async (req, res, next) => {
		const { user } = req.locals;
		await User.create(user);

		//! send mail

		res.json({ success: true, message: "CREATE_ACCOUNT_SUCCESS" });
	},
	logoutHandle: (req, res, next) => {
		res.clearCookie("userId").json({
			success: true,
			message: "LOGOUT_SUCCESS",
		});
	},
	loginAdmin: async (req, res, next) => {
		const { id, type } = await User.findOne({
			user_name: "system_admin",
		});

		if (id) {
			res.cookie("userId", id, { signed: true });
			if (type.length) res.cookie("type", type[0], { signed: true });
		}

		res.json({
			message: "SUCCESS_AUTHENTICATION",
		});
	},
};
