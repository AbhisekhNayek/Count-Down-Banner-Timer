const express = require('express');
const router = express.Router();
const Banner = require('../models/Banner');

// Route to get all banners
router.get('/get', (req, res) => {
    Banner.getBanner((err, results) => {
        if (err) {
            console.error('Error fetching banners:', err);
            return res.status(500).json({ message: 'Failed to fetch banners', error: err });
        }
        res.status(200).json(results);
    });
});

// Route to add a new banner
router.post('/post', (req, res) => {
    // Validate input (basic example)
    const { description, timer, link } = req.body;
    if (!description || !timer || !link) {
        return res.status(400).json({ message: 'Missing required fields: description, timer, link' });
    }

    // Add banner
    Banner.addBanner(req.body, (err, result) => {
        if (err) {
            console.error('Error adding banner:', err);
            return res.status(500).json({ message: 'Database update failed', error: err });
        }
        console.log('Data has been inserted successfully');
        res.status(201).json({ message: 'Banner added successfully' });
    });
});

module.exports = router;
