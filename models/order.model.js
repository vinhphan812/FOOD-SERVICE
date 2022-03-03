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
		status: Number,
	},
	SCHEMA_OPTION
);

const Order = mongoose.model("ORDER", orderSchema, "ORDER");

module.exports = Order;
