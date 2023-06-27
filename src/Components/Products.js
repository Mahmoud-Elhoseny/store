import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, getProduct } from '../store/productSlice';
import '../css/product.css'
import { Link } from 'react-router-dom';
import { buyItems } from '../store/authSlice';
import { AiOutlineHeart } from "react-icons/ai";

const Products = ({ isLoading, product }) => {
    const [favorites, setFavorites] = useState([]);
    const [query, setQuery] = useState("");


    const handleChange = (e) => {
        const newQuery = e.target.value;
        setQuery(newQuery.toString().toLowerCase());
    }



    const { isLoggedIn } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])


    useEffect(() => {
        const localFavorites = localStorage.getItem('favoriteList');
        if (localFavorites) {
            setFavorites(JSON.parse(localFavorites));
        }
    }, []);

    const handleAddToFavorites = (product, event) => {
        if (!favorites.includes(product)) {
            const updatedFavorites = [...favorites, product];
            setFavorites(updatedFavorites);
            localStorage.setItem('favoriteList', JSON.stringify(updatedFavorites));
        }
        const heartIcon = event.target;
        if (heartIcon.classList.contains("active")) {
            heartIcon.classList.remove("active");
        } else {
            heartIcon.classList.add("active");
        }
    }

    const newProducts = product?.length > 0 ? product.filter((el) => {
        if (query === "") {
            return el
        } else if (el.title.toLowerCase().includes(query.toLowerCase())) {
            return el
        }
    })?.map((el) => (

        <li className="cards_item" key={el.id}>
            <div className="card">
                <div className=" card_image">
                    <img src={el?.image} alt='productImg' />
                </div>
                <div className="card_content ">
                    <h2 className="card_title mb-2">{el?.title}</h2>
                    <p className="card_text"><span className='bef'>Description:</span> {el?.description}</p>
                    <p className="card_text"><span className='bef'>Price:</span> {el?.price} $</p>
                    <div className='links'>
                        <button variant="outline-primary" className="btn card_btn" onClick={() => dispatch(getProduct(el.id))}><Link className="detailsLink" to='/details' >Details</Link></button>
                        {isLoggedIn ?
                            <button variant="outline-primary" className="btn card_btn"
                                onClick={() => dispatch(buyItems({ items: el }))}>Buy</button>
                            : <button variant="outline-primary" className="btn card_btn disabled-link" >Buy</button>}
                        <button variant="outline-primary" className="btn card_btn" onClick={(event) => handleAddToFavorites(el, event)}>
                            <AiOutlineHeart />
                        </button>
                    </div>
                </div>
            </div>
        </li>
    )) : null

    return (
        <Container>
            <input className='input' type='text' placeholder='What are you looking for?'
                onChange={handleChange} />
            <h1>Most Popular Products</h1>
            {
                isLoading ? <div className="loading-container">
                    <div className="loading-circle"></div>
                </div> :
                    <ul className="cards" >
                        {newProducts}
                    </ul>
            }
        </Container>
    )
}

export default Products