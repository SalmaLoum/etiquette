const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
// const bcrypt = require('bcrypt');
// can add service associated with appointment (mani, pedi, both); each is an object you add to service
const appointmentSchema = new Schema({
    datetime: {
        type: String,
        required: true,
    },
    service: {
        type: Schema.Types.ObjectId,
        ref: 'Service'

    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    }
});



const Appointment = model('Appointment', appointmentSchema);

module.exports = Appointment;
