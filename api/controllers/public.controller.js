const Food = require("../../models/food.model");
const FoodType = require("../../models/food_type.model");
const { ignoreModel } = require("../../utils/ignore_model");

module.exports = {
	getFoodsInRestaurant: async (req, res, next) => {
		try {
			const { id } = req.params;

			const data = await Food.find({ restaurant: id }).populate([
				"type",
				"restaurant",
			]);
			res.json({ success: true, data });
		} catch ({ message }) {
			res.json({ success: false, message });
		}
	},
	getFoodsType: async (req, res, next) => {
		try {
			const data = await FoodType.find(
				{ is_delete: false },
				ignoreModel(["description", "_id"])
			);

			res.json({ success: true, data });
		} catch ({ message }) {
			res.json({ success: false, message });
		}
	},
};
