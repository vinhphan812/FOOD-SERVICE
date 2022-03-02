const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderDetailSchema = new Schema({
    food_id: { type: Schema.Types.ObjectId, ref: "FOOD"},
    quantity: Number
});

const OrderDetail = mongoose.model("ORDER_DETAIL", orderDetailSchema, "ORDER_DETAIL");

module.exports = OrderDetail;