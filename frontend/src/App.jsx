// FILE: src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import ProductList from './pages/ProductList'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Register from './pages/Register'
import Checkout from './pages/Checkout'
import Orders from './pages/Orders'
import OrderDetails from './pages/OrderDetails'
import PrivateRoute from './components/PrivateRoute'
import ProfilePage from './pages/ProfilePage'
import PaymentPage from './pages/PaymentPage'


function App() {
  return (
    <Router>
      <Header />
      <main className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/payment/:orderId" element={<PaymentPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/order/:id" element={<OrderDetails />} />
            <Route path="/orders/:id" element={<OrderDetails />} />
              <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </Router>
  )
}

export default App