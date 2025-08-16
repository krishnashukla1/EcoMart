// // FILE: src/components/PrivateRoute.jsx
// // import { useSelector } from 'react-redux'
// // import { Navigate, Outlet } from 'react-router-dom'

// // const PrivateRoute = () => {
// //   const { userInfo } = useSelector((state) => state.auth)
// //   return userInfo ? <Outlet /> : <Navigate to="/login" replace />
// // }

// // export default PrivateRoute

// //-----------------
// import { Routes, Route } from 'react-router-dom'
// import PrivateRoute from './PrivateRoute'
// import Login from './pages/Login'

// function AppRoutes() {
//   return (
//     <Routes>
//       <Route path="/login" element={<Login />} />

//       {/* <Route element={<PrivateRoute />}>
//         <Route path="/dashboard" element={<Dashboard />} />
//       </Route> */}
//     </Routes>
//   )
// }
//============
// FILE: src/components/PrivateRoute.jsx
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth)
  return userInfo ? <Outlet /> : <Navigate to="/login" replace />
}

export default PrivateRoute
