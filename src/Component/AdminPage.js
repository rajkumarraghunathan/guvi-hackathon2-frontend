import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import API_URL from '../API/api';


const AdminPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const role = 'Admin';
    const [name, setName] = useState('');

    const navigate = useNavigate();

    const handleInput = (event) => {
        event.preventDefault()
        const accessToken = Cookies.get('accessToken');
        axios.post(`${API_URL}/Signup`, {
            name: name,
            email: email,
            password: password,
            role
        }, {
            headers: {
                cookies: accessToken,
            },
            withCredentials: true
        }).then((response) => {
            if (response.data.message === 'New user was added Sucessfully................') {
                return navigate('/LoginPage')
            }
            else if (response.data.message === "User Already Exists") {
                return toast('User Already Exists')
            }
            else {
                return toast('Error While Added a User')
            }
        }).catch(err => {
            return toast(err.response.data.message)
        })
    }
    return (
        <div className='container' >
            <div className='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
                <div className="card" style={{ width: "18rem" }}>
                    <div className="card-body">
                        <h5 className="card-title">Admin Register</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Create an account</h6>
                        <form onSubmit={handleInput}>
                            <div className="mb-3 pt-3 ">
                                <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                                <input type="text" className="form-control " value={name} onChange={e => setName(e.target.value)} />

                            </div>

                            {/* ---------------------------------------------------------------------------------------------------------------------------------------------------- */}

                            <div className="mb-3 pt-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                <input type="email" className="form-control" aria-describedby="emailHelp" value={email} onChange={e => setEmail(e.target.value)} />

                            </div>

                            {/* ---------------------------------------------------------------------------------------------------------------------------------------------------- */}

                            <div className="mb-3 pt-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} />
                            </div>

                            {/* ---------------------------------------------------------------------------------------------------------------------------------------------------- */}

                            <div className="mb-3 pt-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Role</label>
                                <select className="form-select form-select-sm" aria-label=".form-select-sm example">
                                    <option value='Admin'>Admin</option>
                                </select>

                            </div>
                            {/* ---------------------------------------------------------------------------------------------------------------------------------------------------- */}


                            {/* ---------------------------------------------------------------------------------------------------------------------------------------------------- */}



                            {/* ---------------------------------------------------------------------------------------------------------------------------------------------------- */}
                            <div className='d-flex justify-content-center mb-2'>
                                <Link to='/LoginPage' className='px-3'>Login</Link>
                                <Link to='/RegisterPage'>Register</Link>
                            </div>

                            {/* ---------------------------------------------------------------------------------------------------------------------------------------------------- */}

                            <div className='d-grid'>
                                <button type="submit" className="btn submit-button">Submit</button>
                            </div>

                            {/* ---------------------------------------------------------------------------------------------------------------------------------------------------- */}

                        </form>
                        <ToastContainer />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminPage