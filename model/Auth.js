const mongoose = require('mongoose');

const authSchma = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['voter', 'nominate'],
        default: 'voter'
    },


}, { timestamps: true });

module.exports = mongoose.model('auth', authSchma);
