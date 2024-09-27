// models/Student.js
const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
    service_id: { type: String, required: true },
    service_name: { type: String, required: true },
    times_used: { type: Number, required: true },
    total_cost: { type: Number, required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true }
});

const guestSchema = new mongoose.Schema({
    guest_id: { type: String, required: true },
    name: { type: String, required: true },
    identity_card: { type: String, required: true },
    birth_date: { type: Date, required: true },
    visit_count: { type: Number, required: true },
    visit_dates: { type: [Date], required: true }
});

const vehicleSchema = new mongoose.Schema({
    license_plate: { type: String, required: true },
    free_entries_left: { type: Number, required: true },
    entries: [{
        entry_time: { type: Date, required: true },
        exit_time: { type: Date, required: true },
        extra_fee: { type: Number, default: 0 }
    }]
});

const studentSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    identity_card: { type: String, required: true },
    birth_date: { type: Date, required: true },
    class: { type: String, required: true },
    hometown: { type: String, required: true },
    room_id: { type: String, required: true },
    monthly_rent: { type: Number, required: true },
    services_used: [serviceSchema],
    guests: [guestSchema],
    monthly_parking_ticket: {
        vehicles: [vehicleSchema]
    },
    total_amount_due: { type: Number, required: true }
});

module.exports = mongoose.model("Student", studentSchema);
