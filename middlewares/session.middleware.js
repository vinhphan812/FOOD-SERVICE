const SessionStore = require("../models/session_store.model");

function clearSessionStore(sessionId) {
	const late = new Date();
	late.setHours(late.getMinutes() - 8);
	return new Promise(async (resolve, reject) => {
		try {
			await SessionStore.deleteMany({
				date: { $lt: late },
				id: { $ne: sessionId },
			});
			resolve();
		} catch (error) {
			reject(error);
		}
	});
}

module.exports = async (req, res, next) => {
	// if (req.query.app_secret != process.env.APP_SECRET)
	// 	return res.json({ success: false, message: "app_secret invalid" });

	if (!req.signedCookies.sessionId) {
		clearSessionStore();
		const data = await SessionStore.create({ data: [] });
		res.cookie("sessionId", data.id, { signed: true });
	} else {
		clearSessionStore(req.signedCookies.sessionId);
	}
	next();
};
