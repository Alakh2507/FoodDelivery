import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";

const Verify = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { url } = useContext(StoreContext);

  const success = params.get("success");
  const orderId = params.get("orderId");

  useEffect(() => {
    const verifyPayment = async () => {
    //   const res = await axios.post(`${url}/api/order/verify`, {
    //     success,
    //     orderId,
    //   });

      if (success=="true") {
        navigate("/myorders");
      } else {
        navigate("/");
      }
    };

    verifyPayment();
  }, []);

  return <p>Verifying payment, please wait...</p>;
};

export default Verify;
