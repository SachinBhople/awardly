const mongoose = require('mongoose');

const awardSchema = new mongoose.Schema({
    name: { type: String, required: true },
    categorires: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('award', awardSchema);
