import React, { useContext } from 'react';
import Navbar from './Home/Home/Navbar';
import Login from './Home/Login';
import SignUp from './Home/Signup';
import { Routes, Route } from 'react-router-dom';
import DisplayDogItem from './Home/Home/pets/DisplayDogItem';
import DisplayCatItem from './Home/Home/pets/DisplayCatItem';
import DisplaySmallItem from './Home/Home/pets/DisplaySmallItem';
import Home from './Home/Home/Home';
import Footer from './Home/Home/Footer';
import Shop from './Home/Home/pets/Shop';
import ProductDisplay from './Home/Home/pets/ProductDisplay';
import Collection from './Home/Home/Support/collection-delivery';
import Support from './Home/Home/Support/Support';
import Profile from './Home/Profile';
import CartPage from './Home/CartPage';
import Payment from './Home/Home/Payment';
import AdminPage from './Home/Admin/AdminPage';
import NavbarAdmin from './Home/Admin/NavbarAdmin';
import { DataContext } from './Home/FetchData';
import Users from './Home/Admin/Users'
import View from './Home/Admin/View';
import Products from './Home/Admin/Products';
import Update from './Home/Admin/Update';
import Add from './Home/Admin/Add';
import Pets from './Home/Home/Pets';



function App() {
  const { admin } = useContext(DataContext);

  return (
    <div>
        {!admin ? (
          <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign" element={<SignUp />} />
            <Route path="/pets" element={<Pets />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cartpage" element={<CartPage />} />
            <Route path="/dog" element={<DisplayDogItem />} />
            <Route path="/cat" element={<DisplayCatItem />} />
            <Route path="/small" element={<DisplaySmallItem />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/productdetails/:productId" element={<ProductDisplay />} />
            <Route path="/cartpage" element={<CartPage />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/support" element={<Support />} />
            <Route path="/collection-delivery" element={<Collection />} />
            </Routes>
            <br /><Footer />

          </>
        ) : (
          <>
           <NavbarAdmin />
            <Routes>
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/users" element={<Users />} />
            <Route path="/view/:id" element={<View />} />
            <Route path="/products" element={< Products/>} />
            <Route path="/update/:id" element={< Update/>} />
            <Route path="/add" element={< Add/>} />
            </Routes>
          </>

        )}
      
    </div>
  );
}

export default App;
