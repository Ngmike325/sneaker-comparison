const axios = require('axios');

// Replace with the URL of your running API
const API_URL = 'http://localhost:5000/api/popular-sneakers';

// Function to fetch and log the data
const fetchSneakers = async () => {
    try {
        // Make the GET request to the API
        const response = await axios.get(API_URL);
        
        // Log the fetched data
        console.log('Popular Sneakers Data:');
        console.log(JSON.stringify(response.data, null, 2));
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
};

// Fetch and display sneakers data
fetchSneakers();