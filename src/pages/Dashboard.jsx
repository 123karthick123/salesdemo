import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import StatCard from '../components/StatCard.jsx'
import { inr, sum, weekly, todaySales, paidToday, todayRevenue, PRODUCTS } from '../data.js'

const byProduct = Object.keys(PRODUCTS)
  .map((name) => ({ label: name, revenue: sum(paidToday.filter((s) => s.product === name), (s) => s.amount) }))
  .sort((a, b) => b.revenue - a.revenue)

const short = (n) => (n >= 100000 ? `₹${n / 100000}L` : n ? `₹${n / 1000}k` : '₹0')
const tip = <Tooltip formatter={(v) => [inr(v), 'Revenue']} cursor={{ fill: 'rgba(0,0,0,0.04)' }} />

export default function Dashboard() {
  const weekTotal = sum(weekly, (d) => d.revenue)
  return (
    <>
      <h1>Dashboard</h1>
      <div className="stats">
        <StatCard label="Revenue today" value={inr(todayRevenue)} note="Paid orders, so far" />
        <StatCard label="Orders today" value={todaySales.length} note={`${paidToday.length} paid`} />
        <StatCard label="Avg. paid order" value={inr(Math.round(todayRevenue / paidToday.length))} note="Today" />
        <StatCard label="Last 7 days" value={inr(weekTotal)} note="Includes today so far" />
      </div>
      <div className="charts">
        <section className="card">
          <h3>Revenue, last 7 days</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={weekly}>
              <CartesianGrid vertical={false} stroke="#e8e8e5" />
              <XAxis dataKey="label" tickLine={false} fontSize={12} />
              <YAxis tickFormatter={short} tickLine={false} axisLine={false} fontSize={12} />
              {tip}
              <Bar dataKey="revenue" fill="#2a78d6" radius={[4, 4, 0, 0]} maxBarSize={36} isAnimationActive={false} />
            </BarChart>
          </ResponsiveContainer>
        </section>
        <section className="card">
          <h3>Today's revenue by product</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={byProduct} layout="vertical">
              <CartesianGrid horizontal={false} stroke="#e8e8e5" />
              <XAxis type="number" tickFormatter={short} tickLine={false} axisLine={false} fontSize={12} />
              <YAxis type="category" dataKey="label" width={90} tickLine={false} fontSize={12} />
              {tip}
              <Bar dataKey="revenue" fill="#2a78d6" radius={[0, 4, 4, 0]} maxBarSize={20} isAnimationActive={false} />
            </BarChart>
          </ResponsiveContainer>
        </section>
      </div>
    </>
  )
}
