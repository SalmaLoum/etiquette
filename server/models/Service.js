const { Schema, model } = require('mongoose');
// const bcrypt = require('bcrypt');
// can add service associated with appointment (mani, pedi, both); each is an object you add to service
// serviceType = ['mani', 'pedi', 'gel', 'wax']
// so artists can customize info about each service
// artists connected to user through appointment through services, so even if artist changes, same service can still be provided 
// let User = require(__dirname + "/User.js");

const User = require('./User')
const serviceSchema = new Schema({
    serviceType: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    // this is technically artist, but artists are also users
    // if user is artist, then user can modify service schema (proces, length)
    // if user is client, user can view services 
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
    // password: {
    //     type: String,
    //     required: true,
    //     minlength: 5,
    // },
    // salon: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: 'Salon',
    //     },
    // ],
});




const Service = model('Service', serviceSchema);
// console.log(Schema.Types.User)
module.exports = Service;
