const { SCHEMA_OPTION } = require("../utils/constant");

const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema(
	{
		total: Number,
		order_date: Date,
		voucher_ship: { type: Schema.Types.ObjectId, ref: "VOUCHER" },
		voucher_using: { type: Schema.Types.ObjectId, ref: "VOUCHER" },
		is_delete: Boolean,
		pick_up: String,
		delivery: String,
		user_id: { type: Schema.Types.ObjectId, ref: "USER" },
		sold_by: { type: Schema.Types.ObjectId, ref: "RESTAURANT" },
		status: Number,
		note: String,
	},
	SCHEMA_OPTION
);

const Order = mongoose.model("ORDER", orderSchema, "ORDER");

module.exports = Order;
