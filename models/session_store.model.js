const { SCHEMA_OPTION, ignoreModel } = require("../utils/constant");

const mongoose = require("mongoose");
const { Schema } = mongoose;

const EtypeChange = { INCREASEMENT: 1, DECREASEMENT: -1 };

const SessionStoreSchema = new Schema(
	{
		data: { type: Schema.Types.Mixed, default: {} },
	},
	SCHEMA_OPTION
);

SessionStoreSchema.static({
	addCart: async function (sessionId, food_id, type = "INCREASEMENT") {
		const store = await this.findOne({ _id: sessionId });

		if (!store.data) store.data = {};

		if (store.data[food_id]) {
			store.data[food_id] = store.data[food_id] + EtypeChange[type];
		} else if (type == "INCREASEMENT") {
			store.data[food_id] = 1;
		}

		if (store.data[food_id] < 1) delete store.data[food_id];

		const { modifiedCount } = await this.updateOne(
			{ _id: sessionId },
			{ $set: { data: store.data } }
		);
		return modifiedCount != 0 ? "CHANGE_SUCCESS" : "CHANGE_FAILURE";
	},
	getCart: async function (_id) {
		const store = await this.findOne(
			{ _id },
			ignoreModel(["created_at", "updated_at"])
		);

		return Object.keys(store.data).map((e) => ({
			food_id: e,
			quantity: store.data[e],
		}));
	},
});

const SessionStore = mongoose.model("SESSION", SessionStoreSchema, "SESSION");

module.exports = SessionStore;
