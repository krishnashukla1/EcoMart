import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { fetchCart, updateCartItem, removeFromCart, clearCart } from '../slices/cartSlice'
import { FaTrash } from 'react-icons/fa'

const Cart = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { cartItems, loading, error } = useSelector((state) => state.cart)

  useEffect(() => {
    dispatch(fetchCart())
  }, [dispatch])

  const handleUpdateQty = (itemId, qty) => {
    dispatch(updateCartItem({ itemId, qty }))
  }

  const handleRemoveItem = (itemId) => {
    if (window.confirm('Are you sure you want to remove this item?')) {
      dispatch(removeFromCart(itemId))
    }
  }

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      dispatch(clearCart())
    }
  }

  const handleCheckout = () => {
    navigate('/checkout')
  }

  if (loading) return <div className="py-8 text-center">Loading cart...</div>
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>
  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="container p-4 mx-auto text-center">
        <p>Your cart is empty. <Link to="/products" className="text-blue-600">Go shopping</Link></p>
      </div>
    )
  }

  const subtotal = cartItems.reduce(
    (acc, item) => acc + (item.product?.price || 0) * item.qty,
    0
  )

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-3xl font-bold">Shopping Cart</h1>
      
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left border border-gray-300">Product</th>
              <th className="p-3 text-right border border-gray-300">Price</th>
              <th className="p-3 text-center border border-gray-300">Quantity</th>
              <th className="p-3 text-right border border-gray-300">Subtotal</th>
              <th className="p-3 text-center border border-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => {
              const product = item.product || {
                _id: 'missing',
                name: 'Product unavailable',
                price: 0,
                stock: 0,
                images: []
              }

              return (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="p-3 border border-gray-300">
                    <div className="flex items-center">
                      {product.images?.[0] && (
                        <img 
                          src={product.images[0]} 
                          alt={product.name}
                          className="object-cover w-16 h-16 mr-3 rounded"
                          onError={(e) => {
                            e.target.onerror = null
                            e.target.src = '/placeholder-product.jpg'
                          }}
                        />
                      )}
                      <div>
                        <h3 className="font-medium">{product.name}</h3>
                        {product._id === 'missing' && (
                          <p className="text-xs text-red-500">This product is no longer available</p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="p-3 text-right border border-gray-300">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="p-3 text-center border border-gray-300">
                    <select
                      value={item.qty}
                      onChange={(e) => handleUpdateQty(item._id, Number(e.target.value))}
                      className="p-1 border rounded"
                      disabled={product._id === 'missing'}
                    >
                      {[...Array(Math.max(1, product.stock)).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                      ))}
                    </select>
                  </td>
                  <td className="p-3 text-right border border-gray-300">
                    ${(product.price * item.qty).toFixed(2)}
                  </td>
                  <td className="p-3 text-center border border-gray-300">
                    <button
                      onClick={() => handleRemoveItem(item._id)}
                      className="text-red-500 hover:text-red-700"
                      title="Remove item"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
          <tfoot>
            <tr className="font-semibold bg-gray-100">
              <td colSpan="3" className="p-3 text-right border border-gray-300">Total:</td>
              <td className="p-3 text-right border border-gray-300">
                ${subtotal.toFixed(2)}
              </td>
              <td className="p-3 border border-gray-300"></td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="flex flex-col items-end mt-6 space-y-4 md:flex-row md:justify-between md:space-y-0">
        <div className="text-xl font-semibold">
          Subtotal: ${subtotal.toFixed(2)}
        </div>
        <div className="space-x-2">
          <button
            onClick={handleClear}
            className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
          >
            Clear Cart
          </button>
          <button
            onClick={handleCheckout}
            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
            disabled={cartItems.some(item => item.product?._id === 'missing')}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart