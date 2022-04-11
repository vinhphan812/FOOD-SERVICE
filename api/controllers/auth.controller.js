const md5 = require("md5");
const User = require("../../models/user.model");
const ConfirmMail = require("../../models/confirm_mail.model");
const Mailer = require("../../modules/mailer");
const createVerifyCode = require("../../utils/verify_code");

module.exports = {
	loginHandle: async (req, res, next) => {
		const { user, pass } = req.body;
		let success = false;

		const userData = await User.findOne({
			$or: [{ username: user }, { email: user }, { phone: user }],
			password: md5(pass),
		});

		if (!userData) success = false;
		else {
			success = true;
			res.cookie("userId", userData.id, { signed: true });
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
		const { user } = res.locals;

		user.password = md5(user.password);

		await User.create(user);

		//! create verify code
		// const code = createVerifyCode();
		const expires = new Date();

		// expires = currentTime + 2 minutes
		expires.setMinutes(expires.getMinutes() + 2);

		// ConfirmMail.create({ user_id: user.id, code, expires });
		//! send mail

		const mailer = await Mailer.init();
		await mailer.sendMail([user.email]);

		res.json({ success: true, message: "CREATE_ACCOUNT_SUCCESS" });
	},
	logoutHandle: (req, res, next) => {
		res.clearCookie("userId").json({
			success: true,
			message: "LOGOUT_SUCCESS",
		});
	},
};
