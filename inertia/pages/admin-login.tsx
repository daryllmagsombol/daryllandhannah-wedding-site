import React, { useState } from 'react'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

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
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-100">
      <div className="p-8 rounded-2xl w-full max-w-lg border border-purple-200">
        <h2
          className="text-3xl font-extrabold mb-6 text-center text-purple-600 tracking-tight"
          style={{
            fontFamily: `'Dancing Script', cursive, 'ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'Times', serif`,
            letterSpacing: '0.04em',
          }}
        >
          Admin Login
        </h2>
        <div className="flex justify-center mb-6">
          <svg width="48" height="48" fill="none" viewBox="0 0 48 48">
            <circle cx="24" cy="24" r="24" fill="#EDE9FE" />
            <path
              d="M24 34c-6-4-10-7.5-10-12.5A6.5 6.5 0 0124 15a6.5 6.5 0 0110 6.5C34 26.5 30 30 24 34z"
              fill="#A78BFA"
            />
          </svg>
        </div>
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
            className="w-full bg-purple-500 text-white py-2 rounded-full font-bold shadow hover:bg-purple-600 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}
