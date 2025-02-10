const got = require('got');

const getPrices = async function (shoe, callback) {
    let priceMap = {};
    try {
        const response = await got('https://stockx.com/api/products/' + shoe.urlKey + '?includes=market', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.4 Safari/605.1.15'
            },
            http2: true
        });
        let json = JSON.parse(response.body);
        Object.keys(json.Product.children).forEach(function (key) {
            if (json.Product.children[key].market.lowestAsk == 0) return;
            var size = json.Product.children[key].shoeSize;
            if (size[size.length-1] == 'W') {
                size = size.substring(0, size.length - 1);
            }
            priceMap[size] = json.Product.children[key].market.lowestAsk;
        });
        shoe.resellPrices = { stockX: priceMap };
        callback(null, shoe);
    } catch (error) {
        console.log(error);
        let err = new Error(`Could not connect to StockX while searching '${shoe.styleID}'. Error: ${error.message}`);
        console.log(err);
        callback(err);
    }
};

const shoe = {
    urlKey: 'nike-kobe-9-elite-protro-masterpiece',
    styleID: 'FZ7335-001',
    resellPrices: {}
};

getPrices(shoe, (err, updatedShoe) => {
    if (err) {
        console.error('Error:', err.message);
    } else {
        console.log('Updated Shoe:', updatedShoe);
    }
});
