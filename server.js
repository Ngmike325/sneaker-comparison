// const express = require('express');
// const SneaksAPI = require('sneaks-api');
// const app = express();
// const sneaks = new SneaksAPI();
 
// app.get('/api/popular-sneakers', (req, res) => {
//     sneaks.getMostPopular(10, (err, products) => {
//         if (err) {
//             return res.status(500).json({ error: err.message });
//         }
//         res.json(products);
//     });
// });
 
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

const express = require('express');
const cors = require('cors');
const SneaksAPI = require('sneaks-api');
const app = express();
const sneaks = new SneaksAPI();

// Enable CORS
app.use(cors());

app.get('/api/popular-sneakers', (req, res) => {
    sneaks.getMostPopular(10, (err, products) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(products);
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});