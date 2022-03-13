const User = require("../../models/user.model");

module.exports = {
	signUpValidate: async (req, res, next) => {
		const { user_name, password, first_name, last_name, email, phone } =
			req.body;

		if (
			!user_name ||
			!password ||
			!first_name ||
			!last_name ||
			!email ||
			!phone
		)
			return res.json({ success: false, message: "INVALID_INFO" });

		const emailRegistedCheck = await User.findOne({ email });
		const phoneRegistedCheck = await User.findOne({ phone });
		const userRegistedCheck = await User.findOne({ user_name });

		if (emailRegistedCheck)
			return res.json({ sucess: false, message: "EMAIL_REGISTED" });
		if (phoneRegistedCheck)
			return res.json({ sucess: false, message: "PHONE_REGISTED" });
		if (userRegistedCheck)
			return res.json({ sucess: false, message: "USER_REGISTED" });

		res.locals.user = {
			user_name,
			password,
			first_name,
			last_name,
			email,
			phone,
		};

		next();
	},
	forgotValidate: async (req, res, next) => {
		const { email } = req.body;

		let isExist = false;

		if (await User.find({ email })) isExist = true;

		if (isExist) next();
		else return res.json({ sucess: false, message: "EMAIL_NOT_EXIST" });
	},
};
