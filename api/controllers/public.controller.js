const Food = require("../../models/food.model");

module.exports = {
	getFoodsInRestaurant: async (req, res, next) => {
		// const {id} = req.params;

		const data = await Food.find({ restaurant: "Cơm Hạnh Thu" });
		res.json({ success: true, data });
	},
};
