const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    place: {type:mongoose.Types.ObjectId, ref:'Place', required:true},
    user: {type:mongoose.Types.ObjectId, ref:'User', required:true},
    checkIn: {type:Date, required:true},
    checkOut: {type:Date, required:true},
    guests: {type:Number, required:true},
    name: {type:String, required:true},
    mobile: {type:String, required:true},
    price: {type:Number, required:true}
});

const BookingModel = mongoose.model('Booking', bookingSchema);

module.exports = BookingModel;
