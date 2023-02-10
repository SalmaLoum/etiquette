const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const workRegManicure = require('../../assets/work.png')
const salonSchema = new Schema({
  salonAddress: {
    type: String,
    required: 'You need to leave a thought!',
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  salonName: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  artists: [
    {
      appointment: [{
        type: Schema.Types.ObjectId,
        ref: 'Appointment'
        //* has artist_id, date and time
        // type: String,
        // required: true,
        // minlength: 1,
        // maxlength: 280,
      }],
      artistName: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
      // cloud upload work
      gallery: [{
        type: Schema.Types.ObjectId,
        default: workRegManicure,
        ref: 'Gallery'
      }],
      service: [{
        type: Schema.Types.ObjectId,
        ref: 'Service'
      }]
    }
  ],
});

const Salon = model('Salon', salonSchema);

module.exports = Salon;
