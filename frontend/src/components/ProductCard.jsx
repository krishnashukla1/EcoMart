// FILE: src/components/ProductCard.jsx
import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => {
  if (!product) return null

  return (
    <div className="p-4 bg-white rounded shadow">
      <div className="flex items-center justify-center w-full h-56 bg-gray-100">
        <img
          src={product?.images?.[0] || 'https://via.placeholder.com/300'}
          alt={product?.name || 'Product'}
          className="object-contain max-w-full max-h-full"
        />
      </div>
      <h3 className="mt-2 text-lg font-bold">{product?.name}</h3>
      <p className="text-gray-600">${product?.price}</p>
      <Link
        to={`/products/${product?._id}`}
        className="block px-4 py-2 mt-2 text-center text-white bg-blue-600 rounded"
      >
        View
      </Link>
    </div>
  )
}

export default ProductCard
