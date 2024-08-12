const express = require('express');
const cors = require('cors');
const bannerRoutes = require('./routes/banner');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Replaces bodyParser.json()

// Routes
app.use('/api/banner', bannerRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// Start server
app.listen(8000, () => console.log('Server running on port 8000'));
