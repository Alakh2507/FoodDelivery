import React, { useEffect, useState } from 'react'
import './Add.css'
import Select from 'react-select';
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify';

const Add = ({url}) => {
    
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        console.log(value);
        setData(data => ({ ...data, [name]: value }))

    }

    const onCategoryChange = (event) => {
        setData(data => ({
            ...data,
            category: event.value
        }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        // ✅ correct image check
        if (!image) {
            toast.error("Please upload image");
            return;
        }
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", Number(data.price));
        formData.append("category", data.category);
        formData.append("image", image);
         
        try {
            const response = await axios.post(`${url}/api/food/add`, formData);
            if (response.data.success) {
                toast.success("Food added successfully");
                // ✅ RESET FORM
                setData({
                    name: "",
                    description: "",
                    price: "",
                    category: "",
                });
                setImage(false);
            } else {
                toast.error('Food not added');
            }
        } catch (error) {
            console.error(error);
            alert("Server error");
        }


    }

    useEffect(() => {
        console.log(data)
    }, [data]);

    const options = [
        { value: 'Salad', label: 'Salad' },
        { value: 'Rolls', label: 'Rolls' },
        { value: 'Deserts', label: 'Deserts' },
        { value: 'Sandwitch', label: 'Sandwitch' },
        { value: 'Cake', label: 'Cake' },
        { value: 'Pure Veg', label: 'Pure Veg' },
        { value: 'Pasta', label: 'Pasta' },
        { value: 'Noodles', label: 'Noodles' }
    ];

    return (
        <div className='add'>
            <form onSubmit={onSubmitHandler} className='flex-col'>
                <div className="add-img-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image"><img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" /></label>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden />
                </div>
                <div className='add-product-name flex-col'>
                    <p>Product name</p>
                    <input type="text" onChange={onChangeHandler} name='name' value={data.name} placeholder='Type here' required />
                </div>
                <div className='add-production-description flex-col'>
                    <p>Product description</p>
                    <textarea onChange={onChangeHandler} name="description" value={data.description} cols={15} rows={4} required></textarea>
                </div>
                <div className='add-category-price-container'>
                    <div className='add-cotegory-price flex-col'>
                        <p>Product category</p>
                        <Select onChange={onCategoryChange} options={options} placeholder="Select Category" required />
                    </div>
                    <div className="add-price flex-col">
                        <p>Product Price</p>
                        <input type="Number" onChange={onChangeHandler} name="price" value={data.price} placeholder="₹" required />
                    </div>
                </div>

                <button className='add-btn'>Add</button>
            </form>
        </div>
    )
}

export default Add