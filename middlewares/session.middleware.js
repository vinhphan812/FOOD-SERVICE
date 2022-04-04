const SessionStore = require("../models/session_store.model");

module.exports = async (req, res, next) => {
	// if (req.query.app_secret != process.env.APP_SECRET)
	// 	return res.json({ success: false, message: "app_secret invalid" });
	const { sessionId } = req.signedCookies;

	if (!sessionId) {
		const data = await SessionStore.create({ data: {} });
		res.cookie("sessionId", data.id, { signed: true });
	}

	if (!(await SessionStore.findOne({ _id: sessionId }))) {
		const data = await SessionStore.create({ _id: sessionId, data: {} });
		res.cookie("sessionId", data.id, { signed: true });
	}
	res.locals.sessionId = sessionId;
	next();
};
