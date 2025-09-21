const express = require('express');
const URL = require('../models/url');
const authenticate = require('../middleware/auth');

const router = express.Router();

// Search URLs
router.get('/', authenticate, async (req, res) => {
    const { q, analytics } = req.query;
    if (!q) return res.status(400).json({ error: 'Please provide a search query' });

    const includeAnalytics = analytics === undefined || analytics.toLowerCase() === 'true';

    try {
        const results = await URL.find(
            {
                userId: req.user._id, // Only search in the logged in user ka account (Means the account which has loggedin)
                $or: [
                    { redirectURL: { $regex: q, $options: 'i' } },
                    { shortId: { $regex: q, $options: 'i' } },
                    { customSlug: { $regex: q, $options: 'i' } }
                ]
            },
            includeAnalytics ? '-__v' : '-visitHistory -__v'
        );

        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

module.exports = router;