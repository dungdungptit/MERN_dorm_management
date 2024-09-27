// models/Room.js
const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    room_type: { type: String, required: true },
    monthly_rent: { type: Number, required: true },
    max_occupants: { type: Number, required: true },
    occupants: [{ type: String }] // Danh sách ID sinh viên
});

module.exports = mongoose.model("Room", roomSchema);
