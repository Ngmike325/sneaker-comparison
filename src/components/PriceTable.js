import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import stockXLogo from '../images/stockx.png';
import goatLogo from '../images/goat.png';
import flightClubLogo from '../images/flightclub.png';

const PriceTable = (props) => {
    const [selectedCurrency, setSelectedCurrency] = useState('USD');
    const [convertedRate, setConvertedRate] = useState(null);
    let rate = 1;

    let sneaker = props.sneaker;
    let resellPrices = props.sneaker.lowestResellPrice;

    const resellers = [
        { name: 'StockX', logo: stockXLogo, price: resellPrices.stockX, link: sneaker.resellLinks?.stockX },
        { name: 'Flight Club', logo: flightClubLogo, price: resellPrices.flightClub, link: sneaker.resellLinks?.flightClub },
        { name: 'GOAT', logo: goatLogo, price: resellPrices.goat, link: sneaker.resellLinks?.goat }
    ];
    // Sort the resellers based on their lowest prices
    resellers.sort((a, b) => (a.price || Infinity) - (b.price || Infinity));
    console.log("currency exchange:");
    useEffect(() => {
        const fetchConvertedPrices = async () => {
            try {
                const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${selectedCurrency}`);
                const data = await response.json();
                console.log("currency exchange data:");
                console.log(data.rates);
                // setConvertedPrices(data.rates);
                rate = data.rates["USD"];
                console.log("rate is: ", rate);
                setConvertedRate(rate);
            } catch (error) {
                console.error('Error fetching exchange rates:', error);
            }
        };

        fetchConvertedPrices();
    }, [selectedCurrency]);

    const handleCurrencyChange = (event) => {
        setSelectedCurrency(event.target.value);
    };

    const convertPrice = (price) => {
        // if (convertedPrices && convertedPrices[selectedCurrency]) {
        //     // return (price / convertedPrices[selectedCurrency]).toFixed(2);
        //     return (price / rate).toFixed(2);
        // }
        // return '--';
        console.log("new price is: ", price / convertedRate);
        return (price / convertedRate).toFixed(2);
    };

    return (
        <div className='table-card' style={{ overflowX: 'auto' }}>
            <select value={selectedCurrency} onChange={handleCurrencyChange}>
                <option value='USD'>USD</option>
                <option value='EUR'>EUR</option>
                <option value='GBP'>GBP</option>
                <option value='HKD'>HKD</option>
                {/* Add more currency options as needed */}
            </select>
            <Table responsive style={{ width: '100%' }}>
                <thead>
                    <tr>
                        <th>Reseller</th>
                        <th style={{ textAlign: 'center' }}>Lowest Price ({selectedCurrency})</th>
                    </tr>
                </thead>
                <tbody>
                    {resellers.map((reseller) => (
                        <tr key={reseller.name}>
                            <td onClick={() => { window.open(reseller.link) }}>
                                <img src={reseller.logo} alt={reseller.name} style={{ width: '80px' }} />
                            </td>
                            <td className='price-cell' style={{ fontWeight: 'bold', fontSize: '2em', textAlign: 'center' }}>
                                {reseller.price ? <a href={reseller.link} target="_blank" rel="noopener noreferrer">${convertPrice(reseller.price)}</a> : '--'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default PriceTable;