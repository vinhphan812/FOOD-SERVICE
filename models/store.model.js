const { SCHEMA_OPTION, ignoreModel } = require("../utils/constaints");

const mongoose = require("mongoose");
const Food = require("./food.model");
const { Schema } = mongoose;

const EtypeChange = { INCREASEMENT: 1, DECREASEMENT: -1 };

const StoreSchema = new Schema(
	{
		data: { type: Schema.Types.Mixed, default: {} },
	},
	SCHEMA_OPTION
);

StoreSchema.static({
	createCart: async function (_id) {
		return this.create({ _id, data: {} });
	},
	addCart: async function (userId, food_id, type = "INCREASEMENT") {
		let store = await this.findOne({ _id: userId });

		if (!store) store = await this.createCart(userId);

		if (!store.data) store.data = {};

		if (store.data[food_id]) {
			store.data[food_id] = store.data[food_id] + EtypeChange[type];
		} else if (type == "INCREASEMENT") {
			store.data[food_id] = 1;
		}

		if (!store.data[food_id]) delete store.data[food_id];

		const { modifiedCount } = await this.updateOne(
			{ _id: userId },
			{ $set: { data: store.data } }
		);
		return modifiedCount != 0 ? "CHANGE_SUCCESS" : "CHANGE_FAILURE";
	},
	getCart: async function (_id) {
		let store = await this.findOne(
			{ _id },
			ignoreModel(["created_at", "updated_at"])
		);

		if (!store) store = await this.createCart(_id);

		const foodIds = Object.keys(store.data);

		const foods = [];

		for (const _id of foodIds) {
			const food = await Food.findOne(
				{ _id },
				ignoreModel(["description", "type"])
			);
			food._doc.quantity = store.data[_id];

			foods.push(food);
		}

		return foods;
	},
	clearCart: async function (_id) {
		return this.deleteOne({ _id });
	},
});

const Store = mongoose.model("STORE", StoreSchema, "STORE");

module.exports = Store;
