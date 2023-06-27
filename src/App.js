import Header from './Components/Header';
import Products from './Components/Products';
import Details from './pages/Details';
import Login from './pages/Login';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router';
import Signup from './pages/Signup';
import AddProduct from './pages/AddProduct';
import Allproducts from './pages/Allproducts';
import Favourites from './pages/Favourites.js';
import { useEffect, useState } from 'react';

function App() {
  const { isLoading, product } = useSelector((state) => state.product);
  const { items } = useSelector((state) => state.auth);
  const [allItems, setAllItems] = useState([]);

  useEffect(() => {
    if (items) {
      setAllItems(items);
    }
  }, [items]);



  return (
    <>
      <Header items={items} setAllItems={setAllItems} />
      <Routes>
        <Route path='/' element={<Products isLoading={isLoading} product={product} />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/details' element={<Details product={product} isLoading={isLoading} />} />
        <Route path='/addProduct' element={<AddProduct />} />
        <Route path='/allproducts' element={<Allproducts allItems={allItems} />} />
        <Route path='/Favourite' element={<Favourites />} />
      </Routes>
    </>
  );
}

export default App;
