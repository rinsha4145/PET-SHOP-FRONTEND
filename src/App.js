import React, { useContext } from 'react';
import Navbar from './Component/User/Navbar/Navbar';
import Login from './Component/User/Login/Login';
import SignUp from './Component/User/Signup/Signup';
import { Routes, Route } from 'react-router-dom';
import DisplayDogItem from './Component/User/Display/DisplayDogItem';
import DisplayCatItem from './Component/User/Display/DisplayCatItem';
import DisplaySmallItem from './Component/User/Display/DisplaySmallItem';
import Home from './Component/User/Body/Home';
import Footer from './Component/User/Body/Footer';
import Shop from './Component/User/Display/Shop';
import ProductDisplay from './Component/User/Display/ProductDisplay';
import Collection from './Component/User/Navbar/Support/collection-delivery'
import Support from './Component/User/Navbar/Support/Support'
import Profile from './Component/User/Navbar/Profile/Profile';
import CartPage from './Component/User/Navbar/Cart/CartPage'
import OrderAddress from './Component/User/OrderAdress/OrderAddress';
import AdminPage from './Component/Admin/AdminPage';
import NavbarAdmin from './Component/Admin/NavbarAdmin';
import { DataContext } from './Component/User/Context/DataContext'
import Users from './Component/Admin/Users/Users'
import View from './Component/Admin/Users/View';
import Products from './Component/Admin/Products/Products';
import Update from './Component/Admin/Products/Update'
import Add from './Component/Admin/Products/Add';
import Pets from './Component/User/Body/Pets';
import Wishlist from './Component/User/Navbar/Wishlist/Wishlist';
import Order from './Component/User/Navbar/Order/Order';
import Payment from './Component/User/Payment/Payment';
import OrderVerify from './Component/User/Navbar/Order/OrderVerify';
import Orders from './Component/Admin/Orders';
import ViewProductsFromOrder from './Component/Admin/ViewProductsFromOrder';
import EditShippingStatus from './Component/Admin/EditShippingStatus';
import ViewProductDetails from './Component/Admin/Products/ViewProductDetails';

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
            <Route path="/productdetails/:_id" element={<ProductDisplay />} />
            <Route path="/cartpage" element={<CartPage />} />
            <Route path="/wishlistpage" element={<Wishlist />} />
            <Route path="/order/:sessionid" element={<Order />} />
            <Route path="/order" element={<Order />} />

            <Route path="/orderaddress" element={<OrderAddress />} />
            {/* <Route path="/verifyorder" element={<OrderVerify />} /> */}
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
            #
           
            <Route path="/" element={<AdminPage />} />
            <Route path="/users" element={<Users />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/viewproducts/:id" element={<ViewProductsFromOrder />} />
            <Route path="/editshippingstatus/:id" element={<EditShippingStatus />} />
            <Route path="/view/:id" element={<View />} />
            <Route path="/products" element={< Products/>} />
            <Route path="/update/:_id" element={< Update/>} />
            <Route path="/ViewProductdetails/:_id" element={<ViewProductDetails />} />
            <Route path="/add" element={< Add/>} />
            </Routes>
          </>

        )}
      
    </div>
  );
}

export default App;
