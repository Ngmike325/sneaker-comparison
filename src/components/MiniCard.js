import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card'
import stockXLogo from '../images/stockx.png'
import goatLogo from '../images/goat.png'
import flightClubLogo from '../images/flightclub.png'
import stadiumGoodsLogo from '../images/stadiumgoods.png'
import sneaksLogo from '../images/Sneaks_Logo.png'
import ProductCard from './ProductCard'
var _ = require('lodash');
const myHeaders = new Headers({
  "Content-Type": "application/json",
  Accept: "application/json"
});

const MiniCard = (props) => {
  const [showProductCard, setShowProductCard] = useState(false);
  const [newSneaker, setNewSneaker] = useState({});
  const [fetchSneaker, triggerFetchSneaker] = useState(false);
  var sneaker = props.sneaker;
  useEffect(() => {
    if (fetchSneaker) {
      fetch("http://localhost:5000/api/popular-sneakers/id/" + sneaker.styleID + '/prices', {
          headers: myHeaders,
        })
        .then(response => response.json())
        .then(jsonResponse => {
          setNewSneaker(jsonResponse);

        });
    }
  }, [fetchSneaker]);

  const showCard = () => {
    if (showProductCard == false) {
      triggerFetchSneaker(true);
      setShowProductCard(true);
    }
  }
  const hideCard = () => {
    if (showProductCard) {
      setShowProductCard(false);

    }
  }

  var minPrice;
  var minPriceLink;
  var logo = _.minBy(_.keys(sneaker.lowestResellPrice), function (o) {
    return sneaker.lowestResellPrice[o];
  });

  if (logo == 'stockX') {
    logo = stockXLogo;
    minPrice = sneaker.lowestResellPrice.stockX;
    minPriceLink = sneaker.resellLinks.stockX;

  } else if (logo == 'stadiumGoods') {
    logo = stadiumGoodsLogo;
    minPrice = sneaker.lowestResellPrice.stadiumGoods;
    minPriceLink = sneaker.resellLinks.stadiumGoods;
  } else if (logo == 'goat') {
    logo = goatLogo;
    minPrice = sneaker.lowestResellPrice.goat;
    minPriceLink = sneaker.resellLinks.goat;
  } else if (logo == 'flightClub') {
    logo = flightClubLogo;
    minPrice = sneaker.lowestResellPrice.flightClub;
    minPriceLink = sneaker.resellLinks.flightClub;
  }
  if (sneaker.thumbnail) {
    var imageClass = 'sneaker-image';
    var sneakerImage = sneaker.thumbnail;
  } else {
    var imageClass = 'default-image';
    var sneakerImage = sneaksLogo;
  }



  const CardText = () => {
    if (minPrice) {
      return (
         <Card.Text class='mini-card-text'>
           <div>From</div>
           <div class='mini-card-price'>${minPrice} <span class='on-text'> on</span><img class='mini-logo'
               src={logo}></img></div>
         </Card.Text>
    );
  }
  else{
    return(
      <Card.Text class='mini-card-text'>
        <div>Not Available</div>
      </Card.Text>

      );
    }

  }


    return(
      <a onClick={showCard} style={{ cursor: 'pointer' }} class='card-button'>
        <Card class='mini-card' border="light" tag="a" style={{ cursor: "pointer" }}
          style={{ width: '15rem', height: '17rem' }}>
          <Card.Img class={imageClass} variant="top" src={sneakerImage} />
          <Card.Body class='mini-card-body'>
            <Card.Title class='card-title'>{sneaker.shoeName}</Card.Title>
            <CardText />
          </Card.Body>
        </Card>

        {fetchSneaker && <ProductCard sneaker={newSneaker} name={sneaker.shoeName} description={sneaker.description}
          imageClass={imageClass} image={sneakerImage} minPriceLink={minPriceLink}minPrice={minPrice}
          logo={logo}show={showProductCard} onHide={hideCard}></ProductCard>
        }
      </a>
    );
}
export default MiniCard;


// import React, { useState, useEffect } from 'react';
// import Card from 'react-bootstrap/Card';
// import stockXLogo from '../images/stockx.png';
// import goatLogo from '../images/goat.png';
// import flightClubLogo from '../images/flightclub.png';
// import stadiumGoodsLogo from '../images/stadiumgoods.png';
// import sneaksLogo from '../images/Sneaks_Logo.png';
// import ProductCard from './ProductCard';
// var _ = require('lodash');

// const myHeaders = new Headers({
//   "Content-Type": "application/json",
//   Accept: "application/json",
// });

// const MiniCard = (props) => {
//   const [showProductCard, setShowProductCard] = useState(false);
//   const [newSneaker, setNewSneaker] = useState({});
//   const [fetchSneaker, triggerFetchSneaker] = useState(false);
//   const sneaker = props.sneaker;

//   useEffect(() => {
//     if (fetchSneaker) {
//       // Use your new API endpoint to fetch sneaker details by `styleID`
//       fetch(`http://localhost:5000/api/popular-sneakers/${sneaker.styleID}`, {
//         headers: myHeaders,
//       })
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error('Failed to fetch sneaker details');
//           }
//           return response.json();
//         })
//         .then((jsonResponse) => {
//           setNewSneaker(jsonResponse);
//         })
//         .catch((err) => {
//           console.error('Error fetching sneaker details:', err.message);
//         });
//     }
//   }, [fetchSneaker, sneaker.styleID]);

//   const showCard = () => {
//     if (!showProductCard) {
//       triggerFetchSneaker(true);
//       setShowProductCard(true);
//     }
//   };

//   const hideCard = () => {
//     if (showProductCard) {
//       setShowProductCard(false);
//     }
//   };

//   // Determine the minimum price and its platform logo
//   let minPrice;
//   let minPriceLink;
//   let logo = _.minBy(_.keys(sneaker.lowestResellPrice), function (o) {
//     return sneaker.lowestResellPrice[o];
//   });

//   if (logo === 'stockX') {
//     logo = stockXLogo;
//     minPrice = sneaker.lowestResellPrice.stockX;
//     minPriceLink = sneaker.resellLinks.stockX;
//   } else if (logo === 'stadiumGoods') {
//     logo = stadiumGoodsLogo;
//     minPrice = sneaker.lowestResellPrice.stadiumGoods;
//     minPriceLink = sneaker.resellLinks.stadiumGoods;
//   } else if (logo === 'goat') {
//     logo = goatLogo;
//     minPrice = sneaker.lowestResellPrice.goat;
//     minPriceLink = sneaker.resellLinks.goat;
//   } else if (logo === 'flightClub') {
//     logo = flightClubLogo;
//     minPrice = sneaker.lowestResellPrice.flightClub;
//     minPriceLink = sneaker.resellLinks.flightClub;
//   }

//   // Handle thumbnail and fallback image
//   const imageClass = sneaker.thumbnail ? 'sneaker-image' : 'default-image';
//   const sneakerImage = sneaker.thumbnail || sneaksLogo;

//   // Card text logic
//   const CardText = () => {
//     if (minPrice) {
//       return (
//         <Card.Text className="mini-card-text">
//           <div>From</div>
//           <div className="mini-card-price">
//             ${minPrice} <span className="on-text"> on</span>
//             <img className="mini-logo" src={logo} alt="platform logo" />
//           </div>
//         </Card.Text>
//       );
//     } else {
//       return (
//         <Card.Text className="mini-card-text">
//           <div>Not Available</div>
//         </Card.Text>
//       );
//     }
//   };

//   return (
//     <a onClick={showCard} style={{ cursor: 'pointer' }} className="card-button">
//       <Card
//         className="mini-card"
//         border="light"
//         tag="a"
//         style={{ width: '15rem', height: '17rem', cursor: 'pointer' }}
//       >
//         <Card.Img className={imageClass} variant="top" src={sneakerImage} />
//         <Card.Body className="mini-card-body">
//           <Card.Title className="card-title">{sneaker.shoeName}</Card.Title>
//           <CardText />
//         </Card.Body>
//       </Card>

//       {fetchSneaker && (
//         <ProductCard
//           sneaker={newSneaker}
//           name={sneaker.shoeName}
//           description={sneaker.description}
//           imageClass={imageClass}
//           image={sneakerImage}
//           minPriceLink={minPriceLink}
//           minPrice={minPrice}
//           logo={logo}
//           show={showProductCard}
//           onHide={hideCard}
//         ></ProductCard>
//       )}
//     </a>
//   );
// };

// export default MiniCard;