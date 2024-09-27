// models/Guest.js
const mongoose = require("mongoose");

const guestSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    identity_card: { type: String, required: true },
    birth_date: { type: Date, required: true },
    visits: [{
        student_id: { type: String, required: true },
        visit_dates: { type: [Date], required: true }
    }]
});

module.exports = mongoose.model("Guest", guestSchema);
