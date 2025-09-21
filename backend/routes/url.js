const express = require('express');
const { GenerateShortUrl, GetAllUrls, GetUrlAnalytics, EnableUrl, DisableUrl, UpdateUrl } = require('../controllers/url');
const authenticate = require('../middleware/auth');

const router = express.Router();

router.post('/', authenticate, GenerateShortUrl);

router.get('/', authenticate, GetAllUrls);

router.get('/:shortId/analytics', authenticate, GetUrlAnalytics);

// Enable and disable the URL
router.post('/:shortId/enable', authenticate, EnableUrl);
router.post('/:shortId/disable', authenticate, DisableUrl);

// Update URL
router.put('/:shortId', authenticate, UpdateUrl);

module.exports = router;