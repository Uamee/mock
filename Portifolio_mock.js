const express = require('express');
const cors = require('cors');  // Import CORS middleware
const app = express();
const port = 3000;  // You can change the port if needed

// Enable CORS for all routes
app.use(cors());

// Function to format dates
const formatDate = (dateStr) => {
		const options = { day: '2-digit', month: 'short', year: 'numeric' };
		const date = new Date(dateStr);
		return `Aporte em ${date.toLocaleDateString('pt-BR', options)}`;
};

// Route to handle the user profile
app.get('/', (req, res) => {
		const response = {
				"path": "/",
				"timestamp": new Date().toISOString(),
				"statusCode": 200,
				"data": {
						"portfolioAmount": "R$ 120.089,01",
						"realizado": "R$ 83,000.32",
						"naoRealizado": "R$ 17,000.31",
						"aportes": "Total: 18",
						"total": "R$ 148,212.34",
						"aports": [
								{
										"aportName": "Aport 1",
										"aportDate": formatDate("2024-09-15"),
										"aportValue": "R$ 5,000.00",
										"aportPercentage": "3.37%",
										"aportPercentageIsPositive": true
								},
								{
										"aportName": "Aport 2",
										"aportDate": formatDate("2024-10-01"),
										"aportValue": "R$ 12,500.00",
										"aportPercentage": "-8.44%",
										"aportPercentageIsPositive": false
								},
								{
										"aportName": "Aport 3",
										"aportDate": formatDate("2024-10-07"),
										"aportValue": "R$ 7,500.00",
										"aportPercentage": "5.07%",
										"aportPercentageIsPositive": true
								},
								{
										"aportName": "Aport 4",
										"aportDate": formatDate("2024-10-10"),
										"aportValue": "R$ 6,200.00",
										"aportPercentage": "-4.18%",
										"aportPercentageIsPositive": false
								},
								{
										"aportName": "Aport 5",
										"aportDate": formatDate("2024-09-25"),
										"aportValue": "R$ 8,800.00",
										"aportPercentage": "5.94%",
										"aportPercentageIsPositive": true
								},
								{
										"aportName": "Aport 6",
										"aportDate": formatDate("2024-09-30"),
										"aportValue": "R$ 9,200.00",
										"aportPercentage": "-6.23%",
										"aportPercentageIsPositive": false
								},
								{
										"aportName": "Aport 7",
										"aportDate": formatDate("2024-08-20"),
										"aportValue": "R$ 10,000.00",
										"aportPercentage": "6.77%",
										"aportPercentageIsPositive": true
								},
								{
										"aportName": "Aport 8",
										"aportDate": formatDate("2024-07-15"),
										"aportValue": "R$ 11,000.00",
										"aportPercentage": "-7.44%",
										"aportPercentageIsPositive": false
								},
								{
										"aportName": "Aport 9",
										"aportDate": formatDate("2024-06-10"),
										"aportValue": "R$ 7,800.00",
										"aportPercentage": "5.27%",
										"aportPercentageIsPositive": true
								},
								{
										"aportName": "Aport 10",
										"aportDate": formatDate("2024-05-05"),
										"aportValue": "R$ 4,500.00",
										"aportPercentage": "3.04%",
										"aportPercentageIsPositive": true
								},
								{
										"aportName": "Aport 11",
										"aportDate": formatDate("2024-04-15"),
										"aportValue": "R$ 6,700.00",
										"aportPercentage": "-4.53%",
										"aportPercentageIsPositive": false
								},
								{
										"aportName": "Aport 12",
										"aportDate": formatDate("2024-03-20"),
										"aportValue": "R$ 8,300.00",
										"aportPercentage": "5.61%",
										"aportPercentageIsPositive": true
								},
								{
										"aportName": "Aport 13",
										"aportDate": formatDate("2024-02-10"),
										"aportValue": "R$ 9,500.00",
										"aportPercentage": "-6.42%",
										"aportPercentageIsPositive": false
								},
								{
										"aportName": "Aport 14",
										"aportDate": formatDate("2024-01-05"),
										"aportValue": "R$ 13,000.00",
										"aportPercentage": "8.77%",
										"aportPercentageIsPositive": true
								},
								{
										"aportName": "Aport 15",
										"aportDate": formatDate("2023-12-15"),
										"aportValue": "R$ 4,200.00",
										"aportPercentage": "-2.83%",
										"aportPercentageIsPositive": false
								},
								{
										"aportName": "Aport 16",
										"aportDate": formatDate("2023-11-20"),
										"aportValue": "R$ 3,700.00",
										"aportPercentage": "2.49%",
										"aportPercentageIsPositive": true
								},
								{
										"aportName": "Aport 17",
										"aportDate": formatDate("2023-10-05"),
										"aportValue": "R$ 6,500.00",
										"aportPercentage": "-4.39%",
										"aportPercentageIsPositive": false
								},
								{
										"aportName": "Aport 18",
										"aportDate": formatDate("2023-09-10"),
										"aportValue": "R$ 7,000.00",
										"aportPercentage": "4.73%",
										"aportPercentageIsPositive": true
								}
						]
				}
		};

		res.status(200).json(response);
});

// Start the server
app.listen(port, () => {
		console.log(`Server is running on port ${port}`);
});
