import stockXLogo from '../images/stockx.png'
import goatLogo from '../images/goat.png'
import flightClubLogo from '../images/flightclub.png'
import React from 'react';

const BrandIcons = () => {
    return (
        <div className="icon-container" style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="icon-bar" style={{ display: 'flex', justifyContent: 'space-around', width: '50%' }}>
                <a className="logo" data-swiper-autoplay="2000">
                    <img src={stockXLogo} alt="StockX" />
                </a>
                <a className="logo" data-swiper-autoplay="2000">
                    <img src={goatLogo} alt="GOAT"  />
                </a>
                <a className="logo" data-swiper-autoplay="2000">
                    <img src={flightClubLogo} alt="Flight Club" />
                </a>
            </div>
        </div>
    );
}

export default BrandIcons;
