import MiniCard from './MiniCard';
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';

// Use the new API endpoint
const SNEAKS_API = "http://localhost:5000/api/popular-sneakers";

const Trending = () => {
  const [loading, setLoading] = useState(true);
  const [seeAll, setSeeAll] = useState(false);
  const [sneakers, setSneakers] = useState([]);
  const [allSneakers, setAllSneakers] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    // Reset error message
    setErrorMessage(null);

    // Fetch data from the new API
    fetch(SNEAKS_API)
      .then((response) => {
        if (!response.ok) {
          
          throw new Error('Failed to fetch data from API');
          
        }
        return response.json();
      })
      .then((jsonResponse) => {
        // Assuming the API returns an array of sneakers
        // Update the state with the fetched data
        setSneakers(jsonResponse.slice(0, 12)); // Display the first 10 sneakers
        setAllSneakers(jsonResponse); // Save the full list of sneakers
        setLoading(false); // Stop the loading spinner
      })
      .catch((err) => {
        setErrorMessage('no connection');
        setLoading(false); // Stop loading even if there's an error
      });
  }, []);

  const handleClick = () => {
    setSeeAll(true);
    setTimeout(() => {
      window.scrollTo({
        top: 625,
        behavior: 'smooth',
      });
    }, 1);
  };

  const display = () => {
    if (seeAll) {
      return allSneakers.map((sneaker, index) => (
        <MiniCard key={`${index}-${sneaker.shoename}`} sneaker={sneaker} />
      ));
    } else {
      return sneakers.map((sneaker, index) => (
        <MiniCard key={`${index}-${sneaker.shoename}`} sneaker={sneaker} />
      ));
    }
  };

  return (
    <div className="product-section">
      <h2 className="title">
        Trending Now{' '}
        {!seeAll && (
          <button onClick={() => handleClick()} className="see-all">
            <div className="see-all-text">See All</div>
          </button>
        )}
      </h2>
      <div className="product-page">
        {loading && !errorMessage ? (
          <Spinner
            className="spinners"
            animation="border"
            variant="secondary"
            role="status"
          ></Spinner>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          display()
        )}
      </div>
    </div>
  );
};

export default Trending;