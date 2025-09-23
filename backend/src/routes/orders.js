import { Router } from 'express'
import { v4 as uuid } from 'uuid'
import { getPool } from '../db.js'

const router = Router()

const ORDERS = []

router.get('/', async (req, res) => {
  try {
    const pool = getPool()
    const [rows] = await pool.query('SELECT id, userId, total, status, createdAt FROM orders ORDER BY createdAt DESC')
    if (rows) return res.json({ ok: true, orders: rows })
  } catch {}
  res.json({ ok: true, orders: ORDERS })
})

router.post('/', async (req, res) => {
  const { items, total, userId } = req.body || {}
  const order = { id: uuid(), items: items || [], total: total || 0, userId: userId || 'guest', status: 'created', createdAt: new Date().toISOString() }
  try {
    const pool = getPool()
    await pool.execute('INSERT INTO orders (id, userId, total, status, createdAt) VALUES (?,?,?,?,?)', [order.id, order.userId, order.total, order.status, order.createdAt])
  } catch {}
  ORDERS.unshift(order)
  res.status(201).json({ ok: true, order })
})

export default router


