// FILE: src/pages/Register.jsx
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { register } from '../slices/authSlice'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error } = useSelector((state) => state.auth)

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(register({ name, email, password })).then(() => navigate('/'))
  }

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-3xl font-bold mb-4">Register</h1>
      {error && <p className="text-red-600">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border mb-4"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border mb-4"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border mb-4"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>
          {loading ? 'Loading...' : 'Register'}
        </button>
      </form>
    </div>
  )
}

export default Register