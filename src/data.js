// All data here is made up.
export const inr = (n) => '₹' + n.toLocaleString('en-IN')
export const sum = (list, f) => list.reduce((t, x) => t + f(x), 0)

export const PRODUCTS = {
  Laptop: 52000, Smartphone: 18500, Headphones: 2499, Monitor: 11999, Keyboard: 1499, 'Smart Watch': 6999,
}

// [time, customer, product, qty, payment, status]
const rows = [
  ['09:12', 'Aarav Sharma', 'Laptop', 1, 'Card', 'Paid'],
  ['09:40', 'Priya Nair', 'Headphones', 2, 'UPI', 'Paid'],
  ['10:05', 'Rohan Mehta', 'Smartphone', 1, 'UPI', 'Paid'],
  ['10:31', 'Sneha Iyer', 'Keyboard', 3, 'Cash', 'Paid'],
  ['10:58', 'Vikram Singh', 'Monitor', 2, 'Card', 'Pending'],
  ['11:20', 'Ananya Das', 'Smart Watch', 1, 'UPI', 'Paid'],
  ['11:47', 'Karan Patel', 'Smartphone', 2, 'Card', 'Paid'],
  ['12:06', 'Meera Reddy', 'Headphones', 1, 'Cash', 'Cancelled'],
  ['12:25', 'Arjun Kapoor', 'Laptop', 1, 'Card', 'Pending'],
  ['12:49', 'Divya Menon', 'Monitor', 1, 'UPI', 'Paid'],
  ['13:10', 'Sanjay Gupta', 'Keyboard', 2, 'UPI', 'Paid'],
  ['13:34', 'Neha Joshi', 'Smart Watch', 2, 'Card', 'Paid'],
]

export const todaySales = rows.map(([time, customer, product, qty, payment, status], i) => ({
  id: 'ORD-' + (1001 + i), time, customer, product, qty, payment, status, amount: PRODUCTS[product] * qty,
}))

export const paidToday = todaySales.filter((s) => s.status === 'Paid')
export const todayRevenue = sum(paidToday, (s) => s.amount)

// Last 7 days, ending today (today's figure comes from the orders above)
const past = [182400, 214900, 167300, 238600, 276100, 198700]
export const weekly = [...past, todayRevenue].map((revenue, i) => {
  const d = new Date()
  d.setDate(d.getDate() - (6 - i))
  return { label: i === 6 ? 'Today' : d.toLocaleDateString('en-IN', { weekday: 'short' }), revenue }
})
