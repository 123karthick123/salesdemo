import { useState } from 'react'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import TodaySales from './pages/TodaySales.jsx'

export default function App() {
  const [user, setUser] = useState(null)
  const [page, setPage] = useState('dashboard')

  if (!user) return <Login onLogin={setUser} />

  const logout = () => { setUser(null); setPage('dashboard') }
  const tabs = [['dashboard', 'Dashboard'], ['today', "Today's Sales"]]

  return (
    <div className="layout">
      <aside>
        <h2>SalesDemo</h2>
        <nav>
          {tabs.map(([id, label]) => (
            <button key={id} className={page === id ? 'active' : ''} onClick={() => setPage(id)}>{label}</button>
          ))}
        </nav>
        <div className="user">
          <span>{user}</span>
          <button onClick={logout}>Log out</button>
        </div>
      </aside>
      <main>{page === 'dashboard' ? <Dashboard /> : <TodaySales />}</main>
    </div>
  )
}
