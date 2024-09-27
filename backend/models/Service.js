// models/Service.js
const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    service_name: { type: String, required: true },
    price: { type: Number, required: true },
    monthly_revenue: { type: Number, required: true }
});

module.exports = mongoose.model("Service", serviceSchema);
