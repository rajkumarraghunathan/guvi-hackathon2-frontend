import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import API_URL from '../API/api';




const Header = () => {
    const navigate = useNavigate();
    const [showButton, setShowButton] = useState(true)
    const [isAdmin, setIsAdmin] = useState(true)


    useEffect(() => {
        const cookies = Cookies.get();
        let role = cookies.role;
        if (!cookies.accessToken) {
            return setShowButton(true);
        }
        else {
            if (role === 'Admin') {
                setIsAdmin(false)
            }
            setShowButton(false);

        }
    }, []);

    const handleLogout = async () => {
        const accessToken = Cookies.get('accessToken');

        await axios.get(`${API_URL}/logout`,
            {
                headers: {
                    cookies: accessToken,
                },
                withCredentials: true
            }).then((response) => {
                const redirectUrl = response.data.redirectUrl;
                if (response.data.message === 'User signed-out!') {
                    Cookies.remove('accessToken');
                    Cookies.remove('role')
                    setShowButton(true);

                    navigate(redirectUrl)
                }
            }).catch(error => console.log(error));

    };



    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link to="/" style={{ textDecoration: "none" }}><h3>Rental Page</h3></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item px-2">
                            <Link to="/" style={{ textDecoration: "none", color: "white" }}>Home</Link>
                        </li>
                        {isAdmin ? (<></>) : (<li className="nav-item px-2">
                            <Link className='px-2' to="/AddProduct" style={{ textDecoration: "none" }}>Add Product</Link>
                            <Link to="/Admin_Home_Page" style={{ textDecoration: "none" }}>DashBoard</Link>
                        </li>)}
                        <li className="nav-item px-2 ms-5">
                            <form className="d-flex">
                                <input className="form-control inputBox" type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn btn-success searchButton" type="submit">Search</button>
                            </form>
                        </li>
                    </ul>
                    <form className='me-2'>
                        <button type='button' onClick={() => navigate('/cart')} className='btn btn-outline-warning text-white'><AiOutlineShoppingCart />cart</button>
                    </form>
                    <div>
                        {showButton ? (<button className='btn btn-success'> <Link to="/LoginPage" className='text-white' style={{ textDecoration: "none" }}>Login</Link></button>) :
                            (<button className='btn btn-danger' onClick={handleLogout}>Logout</button>)}
                    </div>
                    <div>
                    </div>

                </div>
            </div>
        </nav>
    )
}

export default Header