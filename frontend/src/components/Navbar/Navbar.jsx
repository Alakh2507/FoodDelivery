import React, { useState, useContext } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { assets } from '../../assets/frontend_assets/assets.js'
import { StoreContext } from '../../context/StoreContext.jsx'

const Navbar = ({ setShowLogin }) => {

  const { getTotalCartAmount, token, logout } = useContext(StoreContext);
  const [menu, setMenu] = useState("home");
  return (
    <div className='navbar'>
      <Link to='/'>  <img src={assets.logo} alt="" className='logo' /></Link>
      <ul className="navbar-menu">
        <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""} >home</Link>
        <a href='/#explore-menu'><li onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""} >menu</li> </a>
        <a href='/#app-download'><li onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>mobile-app</li></a>
        <a href="/#footer"><li onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>contact us</li></a>
      </ul>
      <div className='navbar-right'>
        <img src={assets.search_icon} alt="" />
        <div className='navbar-search-icon'>
          <Link to='/cart'>  <img src={assets.basket_icon} alt="" /></Link>

          {getTotalCartAmount() > 2 ? <div className='dot'> </div> : " "}

        </div>
        {!token ?
          <button onClick={() => setShowLogin(true)}>sign in</button> : <div className='navbar-profile'>
            <img className='profile' src={assets.profile_icon} alt="" />
            <ul className='nav-profile-dropdown'>
              <li>
                <Link className='order-pt' to="myorders"><img src={assets.bag_icon} alt="" /><p>Order</p></Link>
              </li>
              <hr />
              <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
            </ul>
          </div>
        }
      </div>
    </div>
  )
}

export default Navbar