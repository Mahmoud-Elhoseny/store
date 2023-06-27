import React from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { deleteItems } from '../store/authSlice';

const Allproducts = ({ allItems }) => {
    const dispatch = useDispatch();

    const removeFromCart = (selectedItem) => {
        const updatedItems = allItems.filter(item => item.items !== selectedItem.items);
        dispatch(deleteItems(updatedItems));
    };

    const price = allItems.reduce((total, item) => total + item.items.price, 0);
    const totalPrice =Math.trunc(price)

    return (
        <Container>
            <h2>Cart Products</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th scope='col' style={{ textAlign: "center" }}>Number</th>
                        <th scope='col' style={{ textAlign: "center" }}>Product Name</th>
                        <th scope='col' style={{ textAlign: "center" }}>Price</th>
                        <th scope='col' style={{ textAlign: "center" }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {allItems?.map((item, index) => (
                        <tr key={index}>
                            <td style={{ textAlign: "center" }}>{index + 1}</td>
                            <td style={{ textAlign: "center" }}>{item.items.title}</td>
                            <td style={{ textAlign: "center" }}>{item.items.price}</td>
                            <td>
                                <Button style={{ width: "100%" }} as="input" type="reset" value="Delete" variant='danger'
                                    onClick={() => removeFromCart(item)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tr >
                    <th colSpan={4} className='pb-3' style={{ textAlign: "center" }}>Total price</th>
                </tr>
                <tr >
                    <th colSpan={4} style={{ textAlign: "center" }}>{totalPrice}</th>
                </tr>
            </Table>
        </Container>
    );
}

export default Allproducts;
