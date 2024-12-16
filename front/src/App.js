import React from 'react';
import './App.css';
import Header from './components/Header/Header'; // Import Header component
import Footer from './components/Footer/Footer'; // Import Footer component
import Container from '@mui/material/Container';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupSeller from './components/Auth/SignupSeller'; // Import SignupSeller component
import LoginSeller from './components/Auth/LoginSeller';
import SellerInformation from './components/Seller/SellerInformation';
import AddProduct from './components/product/AddProduct';
import ProductList from './components/product/ProductList';
import Content from './components/Mainpage/Content';
import SellerProfile from './components/Seller/SellerProfile';
import SignupBuyer from './components/Auth/SignupBuyer';
import LoginBuyer from './components/Auth/LoginBuyer';
import EditSeller from './components/Seller/EditSeller';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Header */}
        <Header />

        {/* Main Content */}

            {/* Define Routes */}
            <Routes>
              <Route path="/SignupSeller" element={<SignupSeller />} />
              <Route path="/LoginSeller" element={<LoginSeller/>} />
              <Route path="/" element={<Content/>} />
              <Route path="/EditSeller/:sellerId" element={<EditSeller />} />
              <Route path='/AddProduct' element={<AddProduct/>}/>
              <Route path='/ProductList' element={<ProductList/>}/>
<Route path='/SellerInformation' element={<SellerInformation/>}/>
<Route path='/SellerProfile' element={<SellerProfile/>}/>
<Route path='/SignupBuyer' element={<SignupBuyer/>}/>
<Route path='/LoginBuyer' element={<LoginBuyer/>}/>
              {/* Add more routes as needed */}
            </Routes>
    

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
