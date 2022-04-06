const SessionStore = require("../models/session_store.model");

module.exports = async (req, res, next) => {
	let { sessionId } = req.signedCookies;

	// if (req.query.app_secret != process.env.APP_SECRET)
	// 	return res.json({ success: false, message: "app_secret invalid" });

	if (
		!sessionId ||
		(sessionId && !(await SessionStore.findOne({ _id: sessionId })))
	) {
		const { id } = await SessionStore.create({ data: {} });
		sessionId = id;
		res.cookie("sessionId", id, { signed: true });
	}
	res.locals.sessionId = sessionId;
	next();
};
