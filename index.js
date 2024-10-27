const express = require('express');
const morgan = require('morgan');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to log HTTP requests
app.use(morgan('combined')); // You can use 'dev' for shorter logs or 'combined' for detailed logs

// Middleware to check Authorization header
app.use((req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
});

// GET endpoint
app.get('/api/v2/pool/:idpool/report/wallet/:idwallet', (req, res) => {
    const { year } = req.query;
    const { idpool, idwallet } = req.params;

    // Define years and reports based on the year query parameter
    const years = ['2023', '2024'];
    let reports = [];

    if (year === '2024') {
        reports = [
            { name: "OnePager 2024 Q1", url: "https://example.com/report/2024-Q1.pdf" },
            { name: "OnePager 2024 Q2", url: "https://example.com/report/2024-Q2.pdf" }
        ];
    } else {
        reports = []; // Empty array for other years
    }

    // Respond with the report
    res.json({
        years: years,
        reports: reports
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
