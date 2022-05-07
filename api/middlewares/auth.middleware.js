const User = require("../../models/user.model");

module.exports = async (req, res, next) => {
	const { userId } = req.signedCookies;

	if (!userId)
		return res.json({ success: false, message: "FAIL_AUTHENTICATION" });

	const user = await User.get(userId);

	if (!user)
		return res.json({ success: false, message: "FAIL_AUTHENTICATION" });

	res.locals.user = user;
	res.locals.userId = userId;

	next();
};
