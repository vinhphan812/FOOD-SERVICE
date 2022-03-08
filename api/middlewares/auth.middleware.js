const User = require("../../models/user.model");

module.exports = async (req, res, next) => {
	const { userId, type } = req.signedCookies;

	if (!userId || !type)
		return res.json({ success: false, messages: "FAIL_AUTHENTICATION" });

	const user = await User.findOne({ _id: userId });

	if (!user) res.json({ success: false, messages: "FAIL_AUTHENTICATION" });

	res.locals.user = user;

	next();
};
