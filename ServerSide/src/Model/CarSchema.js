const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    model: { type: String, required: true },
    milage: { type: String, required: true },
    image: { type: String, required: true },
    availabelFrom: { type: String, required: true },
    availabelUntil: { type: String, required: true },
    perKm: { type: String, required: true },
    description: { type: String },
    carDetails: { type: String },
    Details: { type: String },
    AdminId: { type: String }
    // rentPerHour: {type: Number, required: true}

}, { timestamps: true }
)

const carModel = new mongoose.model('cars', carSchema);
module.exports = carModel;