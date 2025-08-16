// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000/api", // adjust to match your backend
// });

// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default API;

//-------------------------
import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`, // ✅ dynamic backend URL
  // baseURL: `${import.meta.env.VITE_API_URL}`, // ✅ dynamic backend URL

});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
