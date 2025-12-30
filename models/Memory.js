const mongoose = require('mongoose');

const MemorySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    nickname: {
        type: String,
        enum: ['oottal', 'kudiyan', 'complainter', 'vayadi', 'nallavan', 'none'],
        default: 'none'
    },
    punishments: [{ type: String }],
    giftsGiven: [{ type: String }],
    notes: { type: String },
    lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Memory', MemorySchema);
