const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
    categorires: [{ type: String }],
    name: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "auth" },
    nominationId: { type: mongoose.Schema.Types.ObjectId, ref: 'nomination' },
});

module.exports = mongoose.model("voter", voteSchema)
