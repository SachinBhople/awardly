
const mongoose = require('mongoose');

const nominationSchema = new mongoose.Schema({
    categorires: [{ type: String }],
    name: { type: String },
    voteCount: { type: Number, default: 0 },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "auth" }
});

module.exports = mongoose.model("nomination", nominationSchema)
