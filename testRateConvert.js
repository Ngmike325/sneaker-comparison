// const fetch = require('node-fetch');

// fetch('https://ipinfo.io/185.151.146.146?token=3eff320f59838d')
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return response.json();
//   })
//   .then(data => {
//     console.log(data);
//   })
//   .catch(error => {
//     console.error('There was a problem with your fetch operation:', error);
//   });

// async function getClientIP() {

//     try {
  
//       const response = await fetch('https://ipinfo.io/json?token=YOUR_API_TOKEN'); 
  
//       const data = await response.json(); 
  
//       const clientIP = data.ip;
  
//       console.log("Client IP:", clientIP); 
  
//     } catch (error) {
  
//       console.error("Error fetching IP:", error);
  
//     }
  
//   }
  
  
  
//   getClientIP(); 

// import React, { useState, useEffect } from 'react';
// const [selectedCurrency, setSelectedCurrency] = useState('USD');
// const [convertedPrices, setConvertedPrices] = useState(null);
const dataRates = [];
const fetchConvertedPrices = async () => {
    try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/usd`);
        const data = await response.json();
        console.log("currency exchange:");
        
        dataRates = data.rates;
        console.log(dataRates);
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
    }
};

fetchConvertedPrices();
  