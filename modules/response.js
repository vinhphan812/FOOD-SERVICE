module.exports = {
	fail: (res, message) => {
		res.json({ success: false, message });
	},
	success: (res, data) => {
		res.status(200).json({ success: true, data });
	},
};
