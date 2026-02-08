
import './App.css'
import Navbar from './components/Navbar/Navbar.jsx'
import { Routes, Route }from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import Cart from './pages/Cart/Cart.jsx'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder.jsx'
import Footer from './components/Footer/footer.jsx';
import LoginPopup from './components/LoginPopup/LoginPopup.jsx'
import { useState } from 'react';
import { ToastContainer } from "react-toastify";
import MyOrder from './pages/MyOrder/MyOrder.jsx'
import ScrollToTop from './SrollTotop/SrollToTop.jsx'
import Verify from './pages/paymentVerify/verifyPayment.jsx'

function App() {

  const [showLogin, setShowLogin] = useState(false);

  return (<>
    {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : ""}
    <div className="App">
        <ScrollToTop/>
      <Navbar setShowLogin={setShowLogin} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/order' element={<PlaceOrder />} />
        <Route path='/myorders' element={<MyOrder/>}/>
         <Route path="/verify" element={<Verify />} />  
      </Routes>
    </div>
    <Footer />
   
    <ToastContainer position="top-center" />
  </>
  )
}

export default App
