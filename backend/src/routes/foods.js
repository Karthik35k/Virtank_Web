import { Router } from 'express'
import { getPool } from '../db.js'

const router = Router()

const FOODS = [
  { id: '101', name: 'Paneer Bowl', price: 220, category: 'veg' },
  { id: '102', name: 'Chicken Wrap', price: 260, category: 'non-veg' },
  { id: '103', name: 'Veg Salad', price: 180, category: 'veg' }
]

router.get('/', async (req, res) => {
  try {
    const pool = getPool()
    const [rows] = await pool.query('SELECT id, name, price, category FROM foods ORDER BY id DESC')
    if (rows && rows.length) return res.json({ ok: true, items: rows })
  } catch {}
  res.json({ ok: true, items: FOODS })
})

export default router


