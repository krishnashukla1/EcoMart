import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Login from "./Login"
import Register from "./Register"
import { useState } from "react"

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true)
  const { userInfo } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  // 🔑 Redirect logged-in users straight to home
  useEffect(() => {
    if (userInfo) {
      navigate("/")
    }
  }, [userInfo, navigate])

  return (
    <div className="container max-w-md p-4 mx-auto">
      {isLogin ? <Login /> : <Register />}

      <div className="mt-4 text-center">
        {isLogin ? (
          <p>
            Don’t have an account?{" "}
            <button
              onClick={() => setIsLogin(false)}
              className="font-semibold text-emerald-600 hover:underline"
            >
              Register
            </button>
          </p>
        ) : (
          <p>
            Already registered?{" "}
            <button
              onClick={() => setIsLogin(true)}
              className="font-semibold text-emerald-600 hover:underline"
            >
              Login
            </button>
          </p>
        )}
      </div>
    </div>
  )
}

export default Auth
