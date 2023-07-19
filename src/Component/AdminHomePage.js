import React from 'react'
import { Link } from 'react-router-dom'

const AdminHomePage = () => {
    return (
        <div className='container'>
            <div className='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
                <button className='btn btn-primary '>
                    <Link className=' text-light p-2 ' to='/' style={{ textDecoration: 'none' }}>Home</Link>
                </button>
                <button className='btn btn-success '>
                    <Link className=' text-light ' to='/addProduct' style={{ textDecoration: 'none' }}>Add Product</Link>
                </button>
                <button className='btn btn-danger'>
                    <Link className=' text-light ' to='/deleteProduct' style={{ textDecoration: 'none' }}>Delete Product</Link>
                </button>
            </div>
        </div>
    )
}

export default AdminHomePage