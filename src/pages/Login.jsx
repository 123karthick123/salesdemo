import { useState } from 'react'

// Demo only: the check runs in the browser. Use a real backend for real logins.
const DEMO = { email: 'admin@demo.com', password: 'demo123' }

export default function Login({ onLogin }) {
  const [email, setEmail] = useState(DEMO.email)
  const [password, setPassword] = useState(DEMO.password)
  const [error, setError] = useState('')

  const submit = (e) => {
    e.preventDefault()
    if (email.trim() === DEMO.email && password === DEMO.password) onLogin(DEMO.email)
    else setError('Wrong email or password.')
  }

  return (
    <div className="login">
      <form onSubmit={submit} className="card">
        <h1>SalesDemo</h1>
        <p className="muted">Sign in to the demo dashboard</p>
        <label>Email<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></label>
        <label>Password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></label>
        {error && <p className="error" role="alert">{error}</p>}
        <button className="primary" type="submit">Sign in</button>
        <p className="muted small">Demo login: {DEMO.email} / {DEMO.password}</p>
      </form>
    </div>
  )
}
