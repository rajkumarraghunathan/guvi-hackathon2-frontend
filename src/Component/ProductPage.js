import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useDispatch } from "react-redux";
import { addToCart } from "../Action/action";
import API_URL from '../API/api';
import Header from './Header';
import Footer from './Footer';
import { FaRupeeSign } from 'react-icons/fa';
import Cookies from 'js-cookie';


const ProductPage = () => {

    const dispatch = useDispatch();
    const [getData, setGetData] = useState(null)
    const [isLoading, setIsLoading] = useState(true);
    const [isAdded, setIsAdded] = useState(true);

    useEffect(() => {
        const accessToken = Cookies.get('accessToken');
        const role = Cookies.get('role')
        axios.get(`${API_URL}/product`, {
            headers: {
                cookies: accessToken,
                role: role
            },
            withCredentials: true,
        })
            .then((res) => {
                setGetData(res.data.data)
                setIsLoading(false);

            })
            .catch((error) => { console.log(error); })
    }, [])

    const handleAddedCart = async (data) => {
        dispatch(addToCart(data));
        setIsAdded(false);
        toast(`${data.productName} is added to a cart successfully.........`)
    }


    return (
        <div>
            <Header />
            <div className='d-flex flex-wrap justify-content-center py-5'>
                {isLoading ? (
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    getData && getData.map((data) => (
                        <div className='p-2' key={data.productId}>
                            <div className="card p-2" style={{ width: "18rem", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)" }}>
                                <img src={data.productImage} className="card-img-top" alt="Sample" style={{ height: '12rem' }} />
                                <div className="card-body row">
                                    <div className='col'>
                                        <p>{data.productName}</p>
                                        <p>Price: <FaRupeeSign /> {data.productPrice} /hr</p>
                                    </div>
                                    <div>
                                        {isAdded ? null : (<ToastContainer />)}
                                        <button
                                            type='button'
                                            className='btn btn-primary'
                                            onClick={() => handleAddedCart(data)}>
                                            <AiOutlineShoppingCart />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <Footer />
        </div>
    );

}
export default ProductPage


