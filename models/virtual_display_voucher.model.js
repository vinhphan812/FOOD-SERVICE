const { SCHEMA_OPTION } = require("../utils/constant");

const mongoose = require("mongoose");
const { Schema } = mongoose;

const VirtualDisplayVoucherSchema = new Schema(
	{
		user_id: { type: Schema.Types.ObjectId, ref: "USER" },
		voucher_id: { type: Schema.Types.ObjectId, ref: "VOUCHERS" },
	},
	SCHEMA_OPTION
);

const VirtualDisplayVoucher = mongoose.model(
	"VIRTUAL_DISPLAY_VOUCHER",
	VirtualDisplayVoucherSchema,
	"VIRTUAL_DISPLAY_VOUCHER"
);

module.exports = VirtualDisplayVoucher;
