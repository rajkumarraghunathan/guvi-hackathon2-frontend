import './App.css';
import Cart from './Component/Cart';
import Footer from './Component/Footer';
import Header from './Component/Header';
import ProductPage from './Component/ProductPage';

import { Routes, Route } from 'react-router-dom'

function App() {
  return (

    <div className="App" style={{ height: '100vh' }}>
      <Header />
      <Routes>
        <Route path='/' element={<ProductPage />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
      <Footer />
    </div>

  );
}


export default App;
