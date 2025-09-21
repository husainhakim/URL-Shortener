const mongoose = require('mongoose');
// URL Schema
const urlSchema = new mongoose.Schema({
    shortId: { type: String, required: true, unique: true },
    redirectURL: { type: String, required: true },
    visitHistory: [
        {
            timestamp: { type: Date, default: Date.now },
            ip: String,
            device: String
        }
    ],
    isActive: { type: Boolean, default: true },
    customSlug: { type: String, default: null },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } 
});

module.exports = mongoose.model('URL', urlSchema);