import React, { useState, useEffect } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProduct } from '../store/productSlice';
const Favourites = () => {
    const [favorites, setFavorites] = useState([]);
    const dispatch = useDispatch()

    useEffect(() => {
        const localFavorites = localStorage.getItem('favoriteList');
        if (localFavorites) {
            const favList = JSON.parse(localFavorites).filter(fav => fav != null);
            setFavorites(favList);
        }
    }, []);
    const removeFromFavorites = (product) => {
        const updatedFavorites = favorites.filter(fav => fav !== product);
        setFavorites(updatedFavorites);
        localStorage.setItem('favoriteList', JSON.stringify(updatedFavorites));
    };
    return (
        <Container>
            <h2>Favourites</h2>
            <Table striped bordered hover>
                <thead>
                    <tr style={{ textAlign: "center" }}>
                        <th>Number</th>
                        <th>Product Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {favorites.map((favorite, index) => (
                        <tr key={index} style={{ textAlign: "center" }}>
                            <td >{index + 1}</td>
                            <td><Link className="detailsLinkk" to='/details' onClick={() => dispatch(getProduct(favorite.id))}>{favorite.title}</Link></td>
                            <td>
                                <Button style={{ width: "100%" }} onClick={() => removeFromFavorites(favorite)} as="input" type="reset" value="Delete" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default Favourites
