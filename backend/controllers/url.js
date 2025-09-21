const { nanoid } = require('nanoid');
const URL = require('../models/url');

// Create Short URL
async function GenerateShortUrl(req, res) {
    const { url, customSlug } = req.body;
    if (!url) return res.status(400).json({ error: 'URL is required' });

    let shortId = customSlug || nanoid(8);

    if (customSlug) {
        const exists = await URL.findOne({ shortId: customSlug });
        if (exists) return res.status(400).json({ error: 'Custom slug already taken' });
    }

    const newEntry = await URL.create({
        shortId,
        redirectURL: url,
        visitHistory: [],
        isActive: true,
        customSlug: customSlug || null,
        userId: req.user._id
    });

    return res.json({ shortId: newEntry.shortId, redirectURL: newEntry.redirectURL });
}

// Get all URLs of the logged in user
async function GetAllUrls(req, res) {
    try {
        const urls = await URL.find({ userId: req.user._id }, '-visitHistory -__v');
        res.json(urls);
    } catch (err) {
        res.status(500).json({ error: 'Something went wrong' });
    }
}

// Get analyticsof the logged in user
async function GetUrlAnalytics(req, res) {
    const { shortId } = req.params;
    const entry = await URL.findOne({ shortId, userId: req.user._id });
    if (!entry) return res.status(404).json({ error: 'URL not found' });

    res.json({
        totalClicks: entry.visitHistory.length,
        analytics: entry.visitHistory,
        isActive: entry.isActive,
        customSlug: entry.customSlug
    });
}

// Enable URL
async function EnableUrl(req, res) {
    const { shortId } = req.params;
    const entry = await URL.findOne({ shortId, userId: req.user._id });
    if (!entry) return res.status(404).json({ error: 'URL not found' });

    entry.isActive = true;
    await entry.save();
    res.json({ message: 'URL enabled successfully' });
}

// Disable URL
async function DisableUrl(req, res) {
    const { shortId } = req.params;
    const entry = await URL.findOne({ shortId, userId: req.user._id });
    if (!entry) return res.status(404).json({ error: 'URL not found' });

    entry.isActive = false;
    await entry.save();
    res.json({ message: 'URL disabled successfully' });
}

// Update URL / custom slug
async function UpdateUrl(req, res) {
    const { shortId } = req.params;
    const { url, customSlug } = req.body;

    const entry = await URL.findOne({ shortId, userId: req.user._id });
    if (!entry) return res.status(404).json({ error: 'URL not found' });

    if (url) entry.redirectURL = url;
    if (customSlug) {
        const exists = await URL.findOne({ shortId: customSlug });
        if (exists) return res.status(400).json({ error: 'Custom slug already taken' });
        entry.shortId = customSlug;
        entry.customSlug = customSlug;
    }

    await entry.save();
    res.json({ message: 'URL updated successfully', shortId: entry.shortId, redirectURL: entry.redirectURL });
}

module.exports = { GenerateShortUrl, GetAllUrls, GetUrlAnalytics, EnableUrl, DisableUrl, UpdateUrl };