// FILE: src/pages/Login.jsx
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../slices/authSlice'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error } = useSelector((state) => state.auth)

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(login({ email, password }))
      .unwrap()
      .then(() => navigate('/'))
  }

  return (
    <div className="container max-w-md p-4 mx-auto">
      <h1 className="mb-4 text-3xl font-bold">Login</h1>
      {error && <p className="p-2 mb-4 text-sm text-red-700 bg-red-100 rounded">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="w-full px-4 py-2 text-white rounded bg-emerald-600 hover:bg-emerald-700" disabled={loading}>
          {loading ? 'Loading...' : 'Login'}
        </button>
      </form>
    </div>
  )
}

export default Login
