import './App.css';
import Cart from './Component/Cart';
import Login from './Component/Login';
import ProductPage from './Component/ProductPage';
import { Routes, Route } from 'react-router-dom'
import Register from './Component/Register';
import AddProduct from './AddProduct';
import DeleteProduct from './Component/DeleteProduct';
import ForgotPassword from './Component/ForgetPassword';
import ResetPasswordForm from './Component/ResetPassword';
import AdminPage from './Component/AdminPage';
import AdminHomePage from './Component/AdminHomePage';
import PaymentForm from './Component/Payement/PayementForm';



function App() {




  return (

    <div className="App" >
      {/* <Header /> */}
      <Routes>
        <Route path='/LoginPage' element={<Login />} />
        <Route path='/Forget-password' element={<ForgotPassword />} />
        <Route path='/Reset-password/:resetToken' element={<ResetPasswordForm />} />
        <Route path='/RegisterPage' element={<Register />} />
        <Route path='/AdminPage' element={<AdminPage />} />
        <Route path='/Admin_Home_Page' element={<AdminHomePage />} />
        <Route path='/' element={<ProductPage />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/addProduct' element={<AddProduct />} />
        <Route path='/deleteProduct' element={<DeleteProduct />} />
      </Routes>
      {/* <Footer /> */}
    </div>

  );
}


export default App;
