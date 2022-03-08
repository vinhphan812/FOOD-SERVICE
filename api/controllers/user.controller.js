module.exports = {
	get: (req, res, next) => {},
	changeRole: (req, res, next) => {
		const { user } = res.locals;

		console.log(user);
		// res.json({ success: true, message: "CHANGE_PERMISSION_SUCCESS" });
		res.json({ success: false, message: "USER_NO_PERMISSION" });
	},
};
