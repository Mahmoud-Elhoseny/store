import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdOutlinePersonOutline } from "react-icons/md";
import { BiLogOutCircle } from "react-icons/bi";
import '../css/Header.css'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from '../store/authSlice';
import { Table } from 'react-bootstrap';
import logo from '../logo.png'
const Header = ({ items, setAllItems }) => {
    const { isLoggedIn, Name } = useSelector((state) => state.auth)

    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false);

    const toggleBasket = () => {
        setIsOpen(!isOpen);
    }
    useEffect(() => {
        if (items) {
            setAllItems(items);
        }
    }, [items, setAllItems]);
    return (

        <Navbar bg="light" expand="lg" className='shadow-sm p-3 mb-5 bg-white rounded'>
            <Container>
                <Link to="/" > <img className='logo' src={logo} alt='logoImg' /> </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto ">
                        <div>
                            {isLoggedIn ? <Link className=' login' to='/' onClick={() => dispatch(logIn())}>logout <BiLogOutCircle /> </Link> : <Link to='/login' className=' login'>Login<MdOutlinePersonOutline fontSize={"20px"} /> </Link>}
                            {isLoggedIn ? <Link className=' login' >hello Mr.{Name} </Link> : <Link to='/signup' className=' login'>Sign up<MdOutlinePersonOutline fontSize={"20px"} /> </Link>}
                            <Link to='/addProduct' className='login'>addProduct</Link>
                            <Link to='/Favourite' className='login'>Favourites</Link>
                            <button className='btnCart' onClick={toggleBasket}>
                                <AiOutlineShoppingCart fontSize={'20px'} />
                                <span className='quantity'>{items.length}</span>
                            </button>
                            {isOpen && (
                                <>
                                    {items.length > 0 ? (
                                        <Table striped bordered hover>
                                            <tbody className='table-body'>
                                                {items.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{item.items.title}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    ) : (
                                        <span className='itemsSpan'>Your basket is empty</span>
                                    )}
                                    <br />
                                    <Link className='all-products' to="/allproducts">view all products</Link>
                                </>
                            )}
                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header

