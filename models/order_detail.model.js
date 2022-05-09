const { SCHEMA_OPTION } = require("../utils/constaints");

const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderDetailSchema = new Schema(
	{
		order_id: { type: Schema.Types.ObjectId, ref: "ORDER" },
		food_id: { type: Schema.Types.ObjectId, ref: "FOOD" },
		quantity: Number,
	},
	SCHEMA_OPTION
);

const OrderDetail = mongoose.model(
	"ORDER_DETAIL",
	orderDetailSchema,
	"ORDER_DETAIL"
);

module.exports = OrderDetail;
