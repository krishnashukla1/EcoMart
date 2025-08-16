// FILE: src/components/ProductCard.jsx
import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="w-full h-56 flex items-center justify-center bg-gray-100">
        <img
          src={product.images[0] || 'https://via.placeholder.com/300'}
          alt={product.name}
          className="max-h-full max-w-full object-contain"
        />
      </div>
      <h3 className="text-lg font-bold mt-2">{product.name}</h3>
      <p className="text-gray-600">${product.price}</p>
      <Link
        to={`/products/${product._id}`}
        className="bg-blue-600 text-white px-4 py-2 rounded mt-2 block text-center"
      >
        View
      </Link>
    </div>
  )
}

export default ProductCard
