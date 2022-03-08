const Restaurant = require("../../models/restaurant.model");

module.exports = async (req, res, next) => {
	const { id } = req.params;

	next();
};
