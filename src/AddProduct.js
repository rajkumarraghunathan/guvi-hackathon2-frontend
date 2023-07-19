import React, { useState } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API_URL from './API/api';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';


const AddProduct = () => {

    const [productName, setProductName] = useState('')
    const [productPrice, setProductPrice] = useState('')
    const [productId, setProductId] = useState('')
    const [productImage, setProductImage] = useState('')
    const [isAdded, setIsAdded] = useState(true);




    const handleAddProduct = async (data) => {
        const accessToken = Cookies.get('accessToken');
        const role = Cookies.get('role');
        await axios.post(`${API_URL}/addProduct`, {
            productId, productImage, productName, productPrice
        }, {
            headers: {
                cookies: accessToken,
                role: role
            },
            withCredentials: true
        }).then((response) => {
            setIsAdded(false);
            toast(`${response.data.data.productName} is added to a DataBase successfully.........`)

        }).catch(err => {

            toast(err.response.data.message)
        }
        )
    }




    return (
        <div className='container my-3'>
            <h1>Add Product</h1>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" value={productName} onChange={e => setProductName(e.target.value)} />
                <label htmlFor="floatingInput">productName</label>
            </div>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" id="floatingPassword" placeholder="Password" value={productPrice} onChange={e => setProductPrice(e.target.value)} />
                <label htmlFor="floatingPassword">productPrice</label>
            </div>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" id="floatingPassword" placeholder="Password" value={productId} onChange={e => setProductId(e.target.value)} />
                <label htmlFor="floatingPassword">productId</label>
            </div>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" id="floatingPassword" placeholder="Password" value={productImage} onChange={e => setProductImage(e.target.value)} />
                <label htmlFor="floatingPassword">productImage</label>
            </div>
            <Link to='/Admin_Home_Page' className='px-2'>Dashboard</Link>
            <Link to='/'>Home</Link>
            <div className='d-grid mt-2'>
                {isAdded ? null : (<ToastContainer />)}
                <button className='btn btn-primary' onClick={(data) => handleAddProduct(data)} style={{ borderRadius: '50px' }}>ADD</button>
            </div>
        </div>
    )
}

export default AddProduct