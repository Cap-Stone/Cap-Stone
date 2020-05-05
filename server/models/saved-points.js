const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const savedPointsSchema = new Schema({
    x: Number,
    y: Number,
    effective: Boolean,
    date: Date,
});

module.exports = mongoose.model('saved-points', savedPointsSchema, 'saved-points');