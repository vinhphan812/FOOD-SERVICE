const mongoose = require("mongoose");
const { Schema } = mongoose;

const VirtualDisplayVoucherSchema = new Schema({
	user_id: { type: Schema.Types.ObjectId, ref: "" },
	voucher_id: { type: Schema.Types.ObjectId, ref: "VOUCHERS" },
});

const VirtualDisplayVoucher = mongoose.model(
	"VIRTUAL_DISPLAY_VOUCHER",
	VirtualDisplayVoucherSchema,
	"VIRTUAL_DISPLAY_VOUCHER"
);

module.exports = VirtualDisplayVoucher;
