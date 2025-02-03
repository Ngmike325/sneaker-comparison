import MiniCard from './MiniCard';
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Products = ({ match, location }) => {
    const [loading, setLoading] = useState(true);
    const [sneakers, setSneakers] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const {
      params: { key }
    } = match;

    useEffect(() => {
        setErrorMessage(null);
        setLoading(true);
        window.scrollTo({
            top: 100,
            behavior: 'smooth'
        });
        fetchSearchResults(key);
    }, [location]);

    const fetchSearchResults = async (query) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/search-sneakers?q=${query}`);
            setSneakers(response.data);
            setLoading(false);
            window.scrollTo({
                top: 625,
                behavior: 'smooth'
            });
        } catch (error) {
            console.error("Error fetching search results", error);
            setErrorMessage("No Products Found");
            setLoading(false);
        }
    };

    return (
        <div className='product-section'>
            <h2 className='product-title'> Results for <span className="product-key">'{key}'</span> </h2>
            <div className='product-page'>
                {loading && !errorMessage ? (
                    <Spinner className='spinners' animation="border" variant="secondary" role="status"></Spinner>
                ) : errorMessage ? (
                    <div className="errorMessage">{errorMessage}</div>
                ) : (
                    sneakers.map((sneaker, index) => (
                        <MiniCard key={`${index}-${sneaker.shoename}`} sneaker={sneaker} />
                    ))
                )}
            </div>
        </div>
    );
};

export default Products;
