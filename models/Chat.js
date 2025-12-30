const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    messages: [
        {
            sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            text: { type: String, required: true },
            timestamp: { type: Date, default: Date.now }
        }
    ],
    lastMessage: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Chat', ChatSchema);
