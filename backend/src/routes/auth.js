import { Router } from 'express'
import { getPool } from '../db.js'

const router = Router()

// Demo users
const USERS = [
  { id: 'u1', email: 'user@virtank.com', password: 'user123', role: 'user' },
  { id: 'a1', email: 'admin@virtank.com', password: 'admin123', role: 'admin' }
]

router.post('/login', async (req, res) => {
  const { email, password } = req.body || {}
  try {
    const pool = getPool()
    const [rows] = await pool.execute('SELECT id, email, role FROM users WHERE email=? AND password=? LIMIT 1', [email, password])
    const row = rows[0]
    if (row) return res.json({ ok: true, user: row, token: 'demo-token' })
  } catch {}
  const user = USERS.find(u => u.email === email && u.password === password)
  if (!user) return res.status(401).json({ ok: false, error: 'Invalid credentials' })
  res.json({ ok: true, user: { id: user.id, email: user.email, role: user.role }, token: 'demo-token' })
})

router.post('/logout', (req, res) => {
  res.json({ ok: true })
})

export default router


