import React from 'react';
import Table from 'react-bootstrap/Table'
import stockXLogo from '../images/stockx.png'
import goatLogo from '../images/goat.png'
import flightClubLogo from '../images/flightclub.png'

const PriceTable = (props) => {
    let sneaker = props.sneaker;
    let resellPrices = props.sneaker.lowestResellPrice;

    return (
        <div className='table-card' style={{ overflowX: 'auto' }}>
            <Table responsive style={{ width: '100%' }}>
                <thead>
                    <tr>
                        <th>Reseller</th>
                        <th style={{textAlign: 'center'}}>Lowest Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td onClick={() => { window.open(sneaker.resellLinks?.stockX) }}>
                            <img src={stockXLogo} alt="StockX" style={{ width: '80px' }} />
                        </td>
                        <td className='price-cell' style={{ fontWeight: 'bold', fontSize: '2em', textAlign: 'center' }}>
                            {resellPrices?.stockX ? <a href={sneaker.resellLinks?.stockX} target="_blank" rel="noopener noreferrer">${resellPrices.stockX}</a> : '--'}
                        </td>
                    </tr>
                    <tr>
                        <td onClick={() => { window.open(sneaker.resellLinks?.flightClub) }}>
                            <img src={flightClubLogo} alt="Flight Club" style={{ width: '80px' }} />
                        </td>
                        <td className='price-cell' style={{ fontWeight: 'bold', fontSize: '2em', textAlign: 'center' }}>
                            {resellPrices?.flightClub ? <a href={sneaker.resellLinks?.flightClub} target="_blank" rel="noopener noreferrer">${resellPrices.flightClub}</a> : '--'}
                        </td>
                    </tr>
                    <tr>
                        <td onClick={() => { window.open(sneaker.resellLinks?.goat) }}>
                            <img src={goatLogo} alt="GOAT" style={{ width: '80px' }} />
                        </td>
                        <td className='price-cell' style={{ fontWeight: 'bold', fontSize: '2em', textAlign: 'center' }}>
                            {resellPrices?.goat ? <a href={sneaker.resellLinks?.goat} target="_blank" rel="noopener noreferrer">${resellPrices.goat}</a> : '--'}
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
}

export default PriceTable;