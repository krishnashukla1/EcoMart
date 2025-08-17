import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import { useState } from "react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // 🔑 Redirect logged-in users straight to home
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  return (
    // <div className="container max-w-md p-4 mx-auto">
    //   {isLogin ? <Login /> : <Register />}

    //   <div className="mt-4 text-center">
    //     {isLogin ? (
    //       <p>
    //         Don’t have an account?{" "}
    //         <button
    //           onClick={() => setIsLogin(false)}
    //           className="font-semibold text-emerald-600 hover:underline"
    //         >
    //           Register
    //         </button>
    //       </p>
    //     ) : (
    //       <p>
    //         Already registered?{" "}
    //         <button
    //           onClick={() => setIsLogin(true)}
    //           className="font-semibold text-emerald-600 hover:underline"
    //         >
    //           Login
    //         </button>
    //       </p>
    //     )}
    //   </div>
    // </div>

    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="w-full max-w-md p-6 bg-white border border-gray-200 shadow-lg rounded-2xl">
        {/* Form Section */}
        {isLogin ? <Login /> : <Register />}

        {/* Toggle Section */}
        <div className="mt-6 text-center">
          {isLogin ? (
            <p className="text-gray-600">
              Don’t have an account?{" "}
              <button
                onClick={() => setIsLogin(false)}
                className="font-semibold transition text-emerald-600 hover:underline hover:text-emerald-700"
              >
                Register
              </button>
            </p>
          ) : (
            <p className="text-gray-600">
              Already registered?{" "}
              <button
                onClick={() => setIsLogin(true)}
                className="font-semibold transition text-emerald-600 hover:underline hover:text-emerald-700"
              >
                Login
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
