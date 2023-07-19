import React, { useState } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import API_URL from '../API/api';
import { Link } from 'react-router-dom';

const DeleteProduct = () => {
    const [isAdded, setIsAdded] = useState(true);
    const [productName, setProductName] = useState('')


    const handleDeleteProduct = async (data) => {
        const accessToken = Cookies.get('accessToken');
        const role = Cookies.get('role');

        await axios.delete(`${API_URL}/deleteProduct`, {
            data: { productName },
            withCredentials: true,
            headers: {
                cookies: accessToken,
                role: role
            },
        }).then((response) => {
            setIsAdded(false);
            if (response.data.message === 'Products have been deleted successfully.') {
                return toast(`${response.data.data.productName} is delete to a DataBase successfully.........`)
            }
            toast('No Product found')

        }).catch(error => {
            setIsAdded(false);

            if (error.response.data.message === 'Admin Resource. Access Denied!') {
                toast(error.response.data.message)

            }
        }
        )
    }



    return (
        <div className='container'>
            <h1>DeleteProduct</h1>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" id="floatingInput" placeholder="Product Name" value={productName} onChange={e => setProductName(e.target.value)} />
                <label htmlFor="floatingInput">productName</label>
            </div>
            <Link to='/Admin_Home_Page' className='px-2'>Dashboard</Link>
            <Link to='/'>Home</Link>
            <div className='d-grid mt-3'>
                {isAdded ? null : (<ToastContainer />)}
                <button className='btn btn-danger' onClick={(data) => handleDeleteProduct(data)} style={{ borderRadius: '50px' }}>Delete</button>
            </div>
        </div>
    )
}

export default DeleteProduct