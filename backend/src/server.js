import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRouter from './routes/auth.js'
import foodsRouter from './routes/foods.js'
import ordersRouter from './routes/orders.js'
import { initDb } from './db.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ ok: true, service: 'virtank-backend' })
})

app.use('/api/auth', authRouter)
app.use('/api/foods', foodsRouter)
app.use('/api/orders', ordersRouter)

const PORT = process.env.PORT || 4000
initDb()
  .then(() => {
    app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`))
  })
  .catch((err) => {
    console.error('Failed to connect to MySQL. Continuing without DB. Error:', err.message)
    app.listen(PORT, () => console.log(`API listening (no DB) on http://localhost:${PORT}`))
  })


