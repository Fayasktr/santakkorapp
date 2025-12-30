const mongoose = require('mongoose');

const WishSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    wish: { type: String, required: true },
    reply: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Wish', WishSchema);
