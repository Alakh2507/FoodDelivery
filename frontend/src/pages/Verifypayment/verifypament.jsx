import React, { useContext, useEffect } from 'react'
import './verifypayment.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext.jsx';
import {axios} from 'axios'
const Verifypayment = () => {

    const [searchParams,setSearchParams]= useSearchParams();
    const success=searchParams.get("success");
    const orderId=setSearchParams.get("orderId")
    console.log(success.orderId);
    const {url}=useContext(StoreContext)
    const navigate=useNavigate()
    const verifyPaymebt=async()=>{
      const  response=await axios.post(url+"/api/order/verify" ,{success,orderId})
      if(response.data.success){
        navigate('/myorders');
        
      }else{
        navigate("/")
      }
    }
    useEffect(()=>{
        verifyPaymebt()
    },[])


  return (
    <div className='verify'>
        <div className="spinner">
        </div>
    </div>
  )
}

export {Verifypayment}
