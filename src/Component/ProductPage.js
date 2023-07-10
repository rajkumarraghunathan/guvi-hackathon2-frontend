import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useDispatch } from "react-redux";
import { addToCart } from "../Action/action";
import API_URL from '../API/api';


const ProductPage = () => {

    const dispatch = useDispatch();

    const [getData, setGetData] = useState([])

    useEffect(() => {
        axios.get(`${API_URL}`)
            .then((res) => {
                setGetData(res.data)
                console.log(res.data);
            })
            .catch((error) => { console.log(error); })
    }, [])



    return (
        <div className='d-flex flex-wrap justify-content-center py-5'>
            {
                getData.map((data, index) => {
                    return (
                        <div className='p-2' key={index} >
                            <div className="card p-2" style={{ width: "18rem", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)" }}>
                                <img src={data.productImage} className="card-img-top" alt="Sample" style={{ height: '12rem' }} />
                                <div className="card-body row">
                                    <div className='col' >
                                        <p>{data.productName}</p>
                                        <p>Price :{data.productPrice}</p>
                                    </div>
                                    <div key={index} >
                                        <button type='button' className='btn btn-primary'
                                            onClick={() => {
                                                dispatch(addToCart(data));

                                            }}>
                                            <AiOutlineShoppingCart style={{ fontSize: '' }} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )

                })
            }
        </div>
    )
}

export default ProductPage


