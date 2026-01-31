import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { X } from "lucide-react";
import { toast } from "react-toastify";

const List = ({ url }) => {
  const [list, setList] = useState([]);

  const FetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);

      if (response.data.success) {
        setList(response.data.data ?? []);
      }
    } catch (err) {
      toast.error("Failed to fetch list");
    }
  };

  const removed = async (id) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id });
      if (response.data.success) {
        toast.success("Removed");
        FetchList();
      } else {
        toast.error("Failed to delete");
      }
    } catch (err) {
      toast.error("Server error");
    }
  };

  useEffect(() => {
    FetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <h5>All Food List</h5>

      <div className="list-table">
        <div className="list-table-format title">
          <p>Image</p>
          <p>Name</p>
          <p>Category</p>
          <p>Price</p>
          <p>Action</p>
        </div>

        {list.map((item) => (
          <div key={item._id} className="list-table-format">
            <img src={`${url}/image/${item.image}`} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>&#8377;{item.price}</p>

            <p>
              <X onClick={() => removed(item._id)} className="close" />
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
