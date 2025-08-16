// // FILE: src/components/Header.jsx
// import { useState } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import { Link, useNavigate } from 'react-router-dom'
// import { logout } from '../slices/authSlice'
// import { FaShoppingCart, FaUser } from 'react-icons/fa'

// const Header = () => {
//   const { userInfo } = useSelector((state) => state.auth)
//   const { cartItems } = useSelector((state) => state.cart)
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   const [search, setSearch] = useState('')

//   const handleLogout = () => {
//     dispatch(logout())
//     navigate('/login')
//   }

//   const handleSearch = (e) => {
//     e.preventDefault()
//     navigate(`/products?search=${search}`)
//   }

//   return (
//     <header className="p-4 text-white bg-green-700">
//       <div className="container flex items-center justify-between mx-auto">
//         <Link to="/" className="text-2xl font-bold">E-com</Link>
//         <form onSubmit={handleSearch} className="flex">
//           <input
//             type="text"
//             placeholder="Search products..."
//             className="p-2 text-white rounded-l"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//           <button type="submit" className="p-2 bg-blue-700 rounded-r">Search</button>
//         </form>
//         <nav className="flex items-center space-x-4">
//           <Link to="/cart" className="flex items-center">
//             <FaShoppingCart />
//             <span className="ml-1">Cart ({cartItems.reduce((acc, item) => acc + item.qty, 0)})</span>
//           </Link>
//           {userInfo ? (
//             <div className="flex items-center space-x-4">
//               <Link to="/orders"><FaUser /> {userInfo.name}</Link>
//               <button onClick={handleLogout}>Logout</button>
//             </div>
//           ) : (
//             <Link to="/login">Login</Link>
//           )}
//         </nav>
//       </div>
//     </header>
//   )
// }

// export default Header

//=================

// // FILE: src/components/Header.jsx
// import { useState } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import { Link, useNavigate } from 'react-router-dom'
// import { logout } from '../slices/authSlice'
// import { FaShoppingCart, FaUser, FaSearch, FaSignOutAlt } from 'react-icons/fa'
// import { HiMenuAlt3 } from 'react-icons/hi'
// import { motion } from 'framer-motion'

// const Header = () => {
//   const { userInfo } = useSelector((state) => state.auth)
//   const { cartItems } = useSelector((state) => state.cart)
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   const [search, setSearch] = useState('')
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

//   const handleLogout = () => {
//     dispatch(logout())
//     navigate('/login')
//   }

//   const handleSearch = (e) => {
//     e.preventDefault()
//     navigate(`/products?search=${search}`)
//     setSearch('')
//   }

//   const cartItemsCount = cartItems.reduce((acc, item) => acc + item.qty, 0)

//   return (
//     <header className="sticky top-0 z-50 shadow-lg bg-gradient-to-r from-emerald-700 to-teal-600">
//       <div className="container px-4 py-3 mx-auto">
//         {/* Desktop Header */}
//         <div className="items-center justify-between hidden md:flex">
//           {/* Logo */}
//           <Link to="/" className="flex items-center">
//             <motion.div 
//               whileHover={{ scale: 1.05 }}
//               className="px-3 py-1 text-3xl font-bold bg-white rounded-lg shadow-md text-emerald-700"
//             >
//               EcoMart
//             </motion.div>
//           </Link>

//           {/* Search Bar */}
//           <form 
//             onSubmit={handleSearch} 
//             className="flex flex-1 max-w-xl mx-6"
//           >
//             <div className="relative w-full">
//               <input
//                 type="text"
//                 placeholder="Search products..."
//                 className="w-full px-4 py-2 pr-10 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-white"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//               />
//               <button 
//                 type="submit" 
//                 className="absolute text-white transform -translate-y-1/2 right-2 top-1/2 hover:text-white"
//               >
//                 <FaSearch />
//               </button>
//             </div>
//           </form>

//           {/* Navigation */}
//           <nav className="flex items-center space-x-6">
//             <Link 
//               to="/cart" 
//               className="relative flex items-center text-white transition-colors hover:text-emerald-100"
//             >
//               <FaShoppingCart className="text-xl" />
//               {cartItemsCount > 0 && (
//                 <motion.span 
//                   initial={{ scale: 0 }}
//                   animate={{ scale: 1 }}
//                   className="absolute flex items-center justify-center w-5 h-5 text-xs font-bold rounded-full -top-2 -right-2 bg-amber-400 text-emerald-800"
//                 >
//                   {cartItemsCount}
//                 </motion.span>
//               )}
//               <span className="hidden ml-2 lg:inline">Cart</span>
//             </Link>

//             {userInfo ? (
//               <div className="flex items-center space-x-4">
//                 <Link 
//                   to="/profile" 
//                   className="flex items-center text-white transition-colors hover:text-emerald-100"
//                 >
//                   <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500">
//                     <FaUser className="text-white" />
//                   </div>
//                   <span className="hidden ml-2 lg:inline">{userInfo.name.split(' ')[0]}</span>
//                 </Link>
//                 <button 
//                   onClick={handleLogout}
//                   className="flex items-center text-white transition-colors hover:text-emerald-100"
//                   title="Logout"
//                 >
//                   <FaSignOutAlt className="text-xl" />
//                   <span className="hidden ml-2 lg:inline">Logout</span>
//                 </button>
//               </div>
//             ) : (
//               <Link 
//                 to="/login" 
//                 className="px-4 py-2 font-medium transition-colors bg-white rounded-full shadow-md text-emerald-700 hover:bg-emerald-100"
//               >
//                 Login
//               </Link>
//             )}
//           </nav>
//         </div>

//         {/* Mobile Header */}
//         <div className="flex items-center justify-between md:hidden">
//           <button 
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             className="p-2 text-white"
//           >
//             <HiMenuAlt3 className="text-2xl" />
//           </button>

//           <Link to="/" className="text-2xl font-bold text-white">
//             EcoMart
//           </Link>

//           <Link to="/cart" className="relative p-2 text-white">
//             <FaShoppingCart className="text-xl" />
//             {cartItemsCount > 0 && (
//               <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs font-bold rounded-full bg-amber-400 text-emerald-800">
//                 {cartItemsCount}
//               </span>
//             )}
//           </Link>
//         </div>

//         {/* Mobile Menu */}
//         {mobileMenuOpen && (
//           <motion.div 
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="p-4 mt-3 bg-white rounded-lg shadow-xl md:hidden"
//           >
//             <form onSubmit={handleSearch} className="mb-4">
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="Search products..."
//                   className="w-full px-4 py-2 pr-10 text-white border rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-400"
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                 />
//                 <button 
//                   type="submit" 
//                   className="absolute transform -translate-y-1/2 right-2 top-1/2 text-emerald-700"
//                 >
//                   <FaSearch />
//                 </button>
//               </div>
//             </form>

//             <nav className="space-y-3">
//               {userInfo ? (
//                 <>
//                   <Link 
//                     to="/profile" 
//                     onClick={() => setMobileMenuOpen(false)}
//                     className="flex items-center p-2 text-gray-700 rounded-lg hover:text-emerald-600 hover:bg-emerald-50"
//                   >
//                     <FaUser className="mr-2" />
//                     My Account
//                   </Link>
//                   <Link 
//                     to="/orders" 
//                     onClick={() => setMobileMenuOpen(false)}
//                     className="flex items-center p-2 text-gray-700 rounded-lg hover:text-emerald-600 hover:bg-emerald-50"
//                   >
//                     My Orders
//                   </Link>
//                   <button
//                     onClick={() => {
//                       handleLogout()
//                       setMobileMenuOpen(false)
//                     }}
//                     className="flex items-center w-full p-2 text-gray-700 rounded-lg hover:text-emerald-600 hover:bg-emerald-50"
//                   >
//                     <FaSignOutAlt className="mr-2" />
//                     Logout
//                   </button>
//                 </>
//               ) : (
//                 <Link 
//                   to="/login" 
//                   onClick={() => setMobileMenuOpen(false)}
//                   className="block px-4 py-2 font-medium text-center text-white transition-colors rounded-full bg-emerald-600 hover:bg-emerald-700"
//                 >
//                   Login
//                 </Link>
//               )}
//             </nav>
//           </motion.div>
//         )}
//       </div>
//     </header>
//   )
// }

// export default Header

//==================

// FILE: src/components/Header.jsx
import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../slices/authSlice'
import { 
  FaShoppingCart, 
  FaUser, 
  FaSearch, 
  FaSignOutAlt, 
  FaHome, 
  FaBox, 
  FaMapMarkerAlt 
} from 'react-icons/fa'
import { HiMenuAlt3 } from 'react-icons/hi'
import { motion } from 'framer-motion'

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth)
  const { cartItems } = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)
  const searchRef = useRef(null)

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchFocused(false)
      }
      if (!event.target.closest('.user-dropdown-trigger') && 
          !event.target.closest('.user-dropdown-content')) {
        setUserDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (search.trim()) {
      navigate(`/products?search=${search.trim()}`)
      setSearch('')
      setSearchFocused(false)
    }
  }

  const handleNavigate = (path) => {
    setUserDropdownOpen(false)
    setMobileMenuOpen(false)
    navigate(path)
  }

  const cartItemsCount = cartItems.reduce((acc, item) => acc + item.qty, 0)

  return (
    <header className="sticky top-0 z-50 shadow-lg bg-gradient-to-r from-emerald-700 to-teal-600">
      <div className="container px-4 py-3 mx-auto">
        {/* Desktop Header */}
        <div className="items-center justify-between hidden md:flex">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="px-3 py-1 text-3xl font-bold bg-white rounded-lg shadow-md text-emerald-700"
            >
              EcoMart
            </motion.div>
          </Link>

          {/* Enhanced Search Bar */}
          <div className="flex flex-1 max-w-xl mx-6" ref={searchRef}>
            <form 
              onSubmit={handleSearch} 
              className={`relative w-full transition-all duration-200 ${searchFocused ? 'ring-2 ring-white rounded-lg' : ''}`}
            >
              <input
                type="text"
                placeholder="Search products..."
                className={`w-full py-2 px-4 pr-10 rounded-full focus:outline-none transition-colors duration-200 ${
                  searchFocused ? 'bg-white text-gray-800' : 'bg-white text-gray-800 hover:bg-white'
                }`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setSearchFocused(true)}
              />
              <button 
                type="submit" 
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${
                  searchFocused ? 'text-emerald-700' : 'text-gray-500'
                } hover:text-emerald-800 transition-colors`}
              >
                <FaSearch />
              </button>
            </form>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-6">
            <Link 
              to="/cart" 
              className="relative flex items-center text-white transition-colors hover:text-emerald-100"
            >
              <FaShoppingCart className="text-xl" />
              {cartItemsCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute flex items-center justify-center w-5 h-5 text-xs font-bold rounded-full -top-2 -right-2 bg-amber-400 text-emerald-800"
                >
                  {cartItemsCount}
                </motion.span>
              )}
              <span className="hidden ml-2 lg:inline">Cart</span>
            </Link>

            {userInfo ? (
              <div className="relative">
                <button 
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center text-white transition-colors hover:text-emerald-100 user-dropdown-trigger"
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500">
                    <FaUser className="text-white" />
                  </div>
                  <span className="hidden ml-2 lg:inline">{userInfo.name.split(' ')[0]}</span>
                </button>

                {userDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 z-50 w-64 py-2 mt-2 bg-white rounded-lg shadow-xl user-dropdown-content"
                  >
                    <div className="px-4 py-3 border-b">
                      <p className="font-semibold text-gray-800">{userInfo.name}</p>
                      <p className="text-sm text-gray-600">{userInfo.email}</p>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => handleNavigate('/orders')}
                        className="flex items-center w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-emerald-50 hover:text-emerald-600"
                      >
                        <FaBox className="mr-2" />
                        My Orders
                      </button>
                      <button
                        onClick={() => handleNavigate('/profile')}
                        className="flex items-center w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-emerald-50 hover:text-emerald-600"
                      >
                        <FaUser className="mr-2" />
                        My Profile
                      </button>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-emerald-50 hover:text-emerald-600"
                      >
                        <FaSignOutAlt className="mr-2" />
                        Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            ) : (
              <Link 
                to="/login" 
                className="px-4 py-2 font-medium transition-colors bg-white rounded-full shadow-md text-emerald-700 hover:bg-emerald-100"
              >
                Login
              </Link>
            )}
          </nav>
        </div>

        {/* Mobile Header */}
        <div className="flex items-center justify-between md:hidden">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white"
          >
            <HiMenuAlt3 className="text-2xl" />
          </button>

          <Link to="/" className="text-2xl font-bold text-white">
            EcoMart
          </Link>

          <Link to="/cart" className="relative p-2 text-white">
            <FaShoppingCart className="text-xl" />
            {cartItemsCount > 0 && (
              <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs font-bold rounded-full bg-amber-400 text-emerald-800">
                {cartItemsCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 mt-3 bg-white rounded-lg shadow-xl md:hidden"
          >
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-4 py-2 pr-10 text-gray-800 bg-white border rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button 
                  type="submit" 
                  className="absolute transform -translate-y-1/2 right-2 top-1/2 text-emerald-700"
                >
                  <FaSearch />
                </button>
              </div>
            </form>

            <nav className="space-y-3">
              {userInfo ? (
                <>
                  <div className="px-4 py-2 border-b">
                    <p className="font-semibold text-gray-800">{userInfo.name}</p>
                    <p className="text-sm text-gray-600">{userInfo.email}</p>
                  </div>
                  
                  <button
                    onClick={() => handleNavigate('/orders')}
                    className="flex items-center w-full p-2 text-left text-gray-700 rounded-lg hover:text-emerald-600 hover:bg-emerald-50"
                  >
                    <FaBox className="mr-2" />
                    My Orders
                  </button>
                  <button
                    onClick={() => handleNavigate('/profile')}
                    className="flex items-center w-full p-2 text-left text-gray-700 rounded-lg hover:text-emerald-600 hover:bg-emerald-50"
                  >
                    <FaUser className="mr-2" />
                    My Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full p-2 text-left text-gray-700 rounded-lg hover:text-emerald-600 hover:bg-emerald-50"
                  >
                    <FaSignOutAlt className="mr-2" />
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => handleNavigate('/login')}
                  className="w-full px-4 py-2 font-medium text-center text-white transition-colors rounded-full bg-emerald-600 hover:bg-emerald-700"
                >
                  Login
                </button>
              )}
            </nav>
          </motion.div>
        )}
      </div>

      {/* Close dropdowns when clicking outside */}
      {(userDropdownOpen || searchFocused) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setUserDropdownOpen(false)
            setSearchFocused(false)
          }}
        />
      )}
    </header>
  )
}

export default Header