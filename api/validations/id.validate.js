module.exports = (req, res, next) => {
	const { id } = req.params;
	if (id.length != 24)
		return res.json({ success: false, message: "ID_INVALID" });
	next();
};
