// // FILE: src/components/ProductCard.jsx
// import { Link } from 'react-router-dom'

// const ProductCard = ({ product }) => {
//   if (!product) return null

//   return (
//     <div className="p-4 bg-white rounded shadow">
//       <div className="flex items-center justify-center w-full h-56 bg-gray-100">
//         <img
//           src={product?.images?.[0] || 'https://via.placeholder.com/300'}
//           alt={product?.name || 'Product'}
//           className="object-contain max-w-full max-h-full"
//         />
//       </div>
//       <h3 className="mt-2 text-lg font-bold">{product?.name}</h3>
//       <p className="text-gray-600">${product?.price}</p>
//       <Link
//         to={`/products/${product?._id}`}
//         className="block px-4 py-2 mt-2 text-center text-white bg-blue-600 rounded"
//       >
//         View
//       </Link>
//     </div>
//   )
// }

// export default ProductCard

//========---------------
// FILE: src/components/ProductCard.jsx
import { Link } from 'react-router-dom'
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'

const ProductCard = ({ product }) => {
  if (!product) return null

  // ⭐ Generate rating stars (Amazon style)
  const renderStars = (rating) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<FaStar key={i} className="text-yellow-500" />)
      } else if (rating >= i - 0.5) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-500" />)
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-500" />)
      }
    }
    return stars
  }

  return (
    <div className="p-4 transition-transform transform bg-white shadow-md rounded-2xl hover:shadow-xl hover:scale-105">
      {/* Product Image */}
      <div className="flex items-center justify-center w-full h-56 overflow-hidden rounded-lg bg-gray-50">
        <img
          src={product?.images?.[0] || 'https://via.placeholder.com/300'}
          alt={product?.name || 'Product'}
          className="object-contain max-w-full max-h-full"
        />
      </div>

      {/* Product Info */}
      <div className="mt-3">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{product?.name}</h3>
        <p className="text-sm text-gray-500 line-clamp-2">{product?.description}</p>
        
        <p className="mt-1 text-sm text-gray-600">
          <span className="font-medium text-gray-700">Brand:</span> {product?.brand}
        </p>

        {/* Rating */}
        <div className="flex items-center mt-1 space-x-1">
          {renderStars(product?.rating || 0)}
          <span className="ml-2 text-sm text-gray-600">({product?.rating})</span>
        </div>

        {/* Price */}
        <p className="mt-2 text-xl font-bold text-green-600">₹{product?.price}</p>

        {/* Button */}
        <Link
          to={`/products/${product?._id}`}
          className="block w-full px-4 py-2 mt-3 text-center text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          View Product
        </Link>
      </div>
    </div>
  )
}

export default ProductCard

//--------

