import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/frontend_assets/assets';
import { StoreContext } from '../../context/StoreContext.jsx';
import axios from 'axios'
import { toast } from 'react-toastify';


const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = React.useState("Login");
  const { url, setToken } = useContext(StoreContext);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  })
  const onChangHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData(data => ({ ...data, [name]: value }));
  }
  console.log(data)
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    let newUrl = url;
    if (currState === "Login") {
      newUrl += '/api/user/login'
    } else {
      newUrl += '/api/user/register'
    }
    const response = await axios.post(newUrl, data);
    if (response.data.success) {
      //set token gloably
      setToken(response.data.token);

      localStorage.setItem("token", response.data.token);
      setShowLogin(false)

    } else {
      toast.success(response.data.message)
    }

  }

  return (
    <div className='login-popup'>
      <form onSubmit={onSubmitHandler} className="login-popup-container">
        <div className='login-popup-title'>
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
          {
            currState === "Login" ? <></> : <input type="text" onChange={onChangHandler} name="name" value={data.name} placeholder='Enter your name' required />
          }
          <input type="email" onChange={onChangHandler} name="email" value={data.email} placeholder='Enter your emai' required />
          <input type="password" onChange={onChangHandler} name='password' value={data.password} placeholder='Enter your password' required />
        </div>
        <button className='login-popup-submit-btn' type='submit'>{currState === "Sign Up" ? " Create Account" : "Login"}</button>
        <div className='login-popup-condition'>
          <input type="checkbox" required />
          <p>By contunuing , i agree to the terms of use & privacy policy</p>
        </div >
        {
          currState === "Login" ? <p onClick={() => setCurrState("Sign Up")}>New to Food Delivery<span>Create an account</span></p> :
            <p onClick={() => setCurrState("Login")}>Already have an account? <span>Login here</span></p>
        }
      </form>
    </div>
  )
}

export default LoginPopup