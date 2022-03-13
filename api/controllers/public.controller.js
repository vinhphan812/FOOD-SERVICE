const Food = require("../../models/food.model");
const FoodType = require("../../models/food_type.model");
const { ignoreModel } = require("../../utils/ignore_model");
const { makeQuery } = require("../../utils/make_query");

module.exports = {
	getFoodsInRestaurant: async (req, res, next) => {
		try {
			const { id } = req.params;

			const data = await Food.find(
				makeQuery({ restaurant: id }),
				ignoreModel([])
			).populate([
				{ path: "type", select: ignoreModel([]) },
				{ path: "restaurant", select: ignoreModel([]) },
			]);
			res.json({ success: true, data });
		} catch ({ message }) {
			res.json({ success: false, message });
		}
	},
	getFoodsType: async (req, res, next) => {
		try {
			const data = await FoodType.find(
				makeQuery(),
				ignoreModel(["description", "_id"])
			);

			res.json({ success: true, data });
		} catch ({ message }) {
			res.json({ success: false, message });
		}
	},
};
