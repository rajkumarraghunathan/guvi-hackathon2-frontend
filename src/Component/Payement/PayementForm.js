import React, { useState } from 'react';
import axios from 'axios';
import API_URL from '../../API/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

const PaymentForm = (props) => {
    const [orderId, setOrderId] = useState('');

    const handlePayment = async () => {
        const accessToken = Cookies.get('accessToken');
        const role = Cookies.get('role');


        try {
            const response = await axios.post(`${API_URL}/create-order`, {
                amount: props.passedValue,
                currency: 'INR',

            }, {
                headers: {
                    cookies: accessToken,
                    role: role
                }
            });
            const { order } = response.data;
            const email = response.data.email
            setOrderId(order.id);


            const options = {
                key: 'rzp_test_EDX4Jw7hUw0OWQ',
                amount: order.amount,
                currency: order.currency,
                name: 'Equipment Rental Shop',
                description: 'Product Description',
                handler: function (response) {
                    console.log(orderId);
                    console.log(response);
                },
                prefill: {
                    name: 'Enter your name',
                    email: email,
                    contact: 'Enter your number',
                },
                notes: {
                    address: 'Your Address',
                },
            };
            const razorpay = new window.Razorpay(options);
            razorpay.open();


        } catch (error) {

            if (error.response.data.message === 'Forbidden') {
                toast(error.response.data.message)
            }
            if (error.response.data.error === 'Failed to create order') {
                toast(error.response.data.error)
            }
        }
    };

    return (
        <div>
            <ToastContainer />
            <button onClick={handlePayment} className='btn btn-warning'>Pay with Razorpay</button>
        </div>
    );
};

export default PaymentForm;
