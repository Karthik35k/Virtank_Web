import mysql from 'mysql2/promise'

export async function createPool() {
  const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'virtank',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  })
  return pool
}

let poolSingleton
export function getPool() {
  if (!poolSingleton) throw new Error('DB pool not initialized')
  return poolSingleton
}

export async function initDb() {
  poolSingleton = await createPool()
  return poolSingleton
}


