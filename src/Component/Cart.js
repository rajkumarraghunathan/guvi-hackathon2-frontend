import React, { useState } from 'react'
import { AiFillDelete } from 'react-icons/ai';
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../Action/action";

const Cart = () => {

    const dispatch = useDispatch();

    const products = useSelector((store) => store);
    const [InputValue, setInputValue] = useState(1);
    console.log(InputValue);


    return (
        <>
            <h1>Welcome to the Cart</h1>
            <div className='container d-flex flex-wrap justify-content-center py-5'>

                {
                    products.length ?
                        (products.map((data, index) => {
                            return (

                                <div className='p-2' key={index}>

                                    <div className="card p-2" style={{ width: "18rem", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)" }}>
                                        <img src={data.productImage} className="card-img-top" alt="Sample" placeholder='Enter the Quanity' style={{ height: '12rem' }} />
                                        <div className="card-body row">
                                            <div className='col' >
                                                <p>{data.productName}</p>
                                                <p>{data.productPrice}</p>
                                                <p>{data.quantity}</p>
                                                <div className='my-2'>Total Price:{data.productPrice * data.quantity}</div>
                                                {/* <input type="text" className="form-control" placeholder="Username" value={InputValue} onChange={(event) => { setInputValue(event.target.value) }} /> */}
                                            </div>

                                            <div className='mt-2'>
                                                <button type='button' className='btn btn-primary' onClick={() => { dispatch(removeFromCart(data)) }}>
                                                    <AiFillDelete style={{ fontSize: '' }} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })) : (<div><h3 style={{ color: "red" }}>Cart is Empty</h3></div>)
                }
            </div>
        </>
    )
}

export default Cart