const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const placeSchema = new Schema({
    owner: {type: mongoose.Types.ObjectId, ref: 'User'},
    title: String,
    address: String,
    photos: [String],
    description: String,
    perks: [String],
    extraInfo: String,
    checkIn: String,
    checkOut: String,
    maxGuests: Number,
});

const PlaceModel = mongoose.model('Place', placeSchema);

module.exports = PlaceModel;