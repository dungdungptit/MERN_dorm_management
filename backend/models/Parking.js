// models/Parking.js
const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema({
    entry_time: { type: Date, required: true },
    exit_time: { type: Date, required: true },
    extra_fee: { type: Number, default: 0 }
});

const parkingSchema = new mongoose.Schema({
    vehicle_id: { type: String, required: true },
    license_plate: { type: String, required: true },
    student_id: { type: String, required: true },
    entries: [entrySchema],
    monthly_ticket: {
        free_entries_left: { type: Number, required: true },
        extra_fees: { type: Number, default: 0 }
    }
});

module.exports = mongoose.model("Parking", parkingSchema);
