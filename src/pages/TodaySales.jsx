import { useState } from 'react'
import StatCard from '../components/StatCard.jsx'
import { inr, sum, todaySales } from '../data.js'

const icons = { Paid: '✓', Pending: '…', Cancelled: '✕' }

export default function TodaySales() {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('All')

  const q = query.trim().toLowerCase()
  const list = todaySales.filter(
    (s) => (status === 'All' || s.status === status) && `${s.id} ${s.customer} ${s.product}`.toLowerCase().includes(q),
  )
  const total = (st) => inr(sum(todaySales.filter((s) => s.status === st), (s) => s.amount))
  const date = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <>
      <h1>Today's Sales</h1>
      <p className="muted">{date}</p>
      <div className="stats">
        {Object.keys(icons).map((st) => <StatCard key={st} label={st} value={total(st)} />)}
      </div>
      <section className="card">
        <div className="filters">
          <input placeholder="Search order, customer or product" aria-label="Search" value={query} onChange={(e) => setQuery(e.target.value)} />
          <select aria-label="Status" value={status} onChange={(e) => setStatus(e.target.value)}>
            {['All', ...Object.keys(icons)].map((o) => <option key={o}>{o}</option>)}
          </select>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Order</th><th>Time</th><th>Customer</th><th>Product</th><th className="num">Qty</th><th>Payment</th><th>Status</th><th className="num">Amount</th></tr>
            </thead>
            <tbody>
              {list.map((s) => (
                <tr key={s.id}>
                  <td>{s.id}</td><td>{s.time}</td><td>{s.customer}</td><td>{s.product}</td><td className="num">{s.qty}</td><td>{s.payment}</td>
                  <td><span className={`badge ${s.status.toLowerCase()}`}>{icons[s.status]} {s.status}</span></td>
                  <td className="num">{inr(s.amount)}</td>
                </tr>
              ))}
              {!list.length && <tr><td colSpan="8" className="muted">No matching orders.</td></tr>}
            </tbody>
          </table>
        </div>
        <p className="muted">Showing {list.length} of {todaySales.length} orders. Total shown: {inr(sum(list, (s) => s.amount))}</p>
      </section>
    </>
  )
}
