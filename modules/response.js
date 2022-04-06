module.exports = {
	fail: (res, message, code = 404) => {
		res.status(code).json({ success: false, message });
	},
	success: (res, data) => {
		res.status(200).json({ success: true, data });
	},
};
