const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

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
app.get('/api/v2/pool/:idpool/report', (req, res) => {
    const { year } = req.query;
    const { idpool } = req.params;

    // Define years and reports based on the year query parameter
    const years = ['2024', '2023', '2022'];
    let reports = [];

    if (year === '2024') {
        reports = [
            { name: "OnePager 2024 Q1", url: "https://example.com/report/2024-Q1.pdf" },
            { name: "OnePager 2024 Q2", url: "https://example.com/report/2024-Q2.pdf" }
        ];
    } else if (year === '2023') {
        reports = [
            { name: "OnePager 2023 Q1", url: "https://example.com/report/2023-Q1.pdf" },
        ];
    } else if (year === '2022') {
        reports = [
            { name: "One Pager 2022 Q1", url: "http://example.com/report2.pdf" },
            { name: "One Pager 2022 Q4", url: "http://example.com/report1.pdf" }
        ];
    } else {
        reports = []; // Empty array for other years
    }

    // Respond with the new structure
    res.json({
        statusCode: 200,
        timestamp: new Date().toISOString(),
        path: `/api/v2/pool/${idpool}/report?year=${year}`,
        data: {
            years: years,
            reports: reports
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
