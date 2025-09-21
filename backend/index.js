const express = require('express');
const useragent = require('express-useragent');
const { connectDB } = require('./db');

const urlRoute = require('./routes/url');
const searchRoute = require('./routes/search');
const authRoute = require('./routes/auth');
require('dotenv').config(); 
const URL = require('./models/url');


const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(useragent.express());

//  Mongodb connection
connectDB(process.env.DB_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

//  Routes for Auth
app.use('/auth', authRoute);

// Routes for the URL
app.use('/url', urlRoute);

// Search (can remain public or protected later)
app.use('/search', searchRoute);

// Redirect route 
app.get('/:shortId', async (req, res) => {
    try {
        const shortId = req.params.shortId;
        const entry = await URL.findOne({ shortId });
        if (!entry) return res.status(404).send('URL not found');
        if (!entry.isActive) return res.status(403).send('This link is disabled');

        entry.visitHistory.push({
            timestamp: new Date(),
            ip: req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress,
            device: `${req.useragent.platform} - ${req.useragent.browser}`
        });

        await entry.save();
        res.redirect(entry.redirectURL);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));