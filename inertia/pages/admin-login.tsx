import React, { useState } from 'react'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false) // Added loading state

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true) // Set loading to true

    const res = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    if (res.ok) {
      const data = await res.json()
      localStorage.setItem('token', data.token.token)
      window.open('/guests', '_self')
    } else {
      const errorData = await res.json()
      setError(errorData.error || 'Login failed')
    }

    setLoading(false) // Set loading to false after the request
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-100">
      <div className="p-8 rounded-2xl w-full max-w-lg">
        <h2
          className="text-5xl font-extrabold mb-6 text-center text-purple-600 tracking-tight"
          style={{
            fontFamily: `'Dancing Script', cursive, 'ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'Times', serif`,
            letterSpacing: '0.04em',
          }}
        >
          Admin Login
        </h2>

        {error && <div className="text-red-600 mb-4 text-center">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-purple-700 mb-2 font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-purple-200 rounded focus:outline-none focus:ring-2 focus:ring-purple-200 bg-purple-50"
              required
              autoComplete="email"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-purple-700 mb-2 font-semibold">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-purple-200 rounded focus:outline-none focus:ring-2 focus:ring-purple-200 bg-purple-50"
              required
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            disabled={loading} // Disable button while loading
            className={`w-full font-bold bg-gradient-to-r from-indigo-500 to-purple-400 hover:from-indigo-500 hover:to-purple-700 text-white py-3 rounded-full font-bold text-lg shadow transition disabled:opacity-50 ${
              loading
                ? 'bg-purple-300 text-white cursor-not-allowed'
                : 'bg-purple-500 text-white hover:bg-purple-600'
            }`}
          >
            {loading ? 'Logging in...' : 'Login'} {/* Show loading text */}
          </button>
        </form>
      </div>
    </div>
  )
}
