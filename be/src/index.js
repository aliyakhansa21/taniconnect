const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(helmet())
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? 'https://taniconnect.vercel.app'
    : 'http://localhost:3000',
  credentials: true,
}))
app.use(express.json())

// Health check
app.get('/health', (_, res) => {
  res.json({ status: 'ok', service: 'TaniConnect API', timestamp: new Date().toISOString() })
})

// Routes
const searchRoutes = require('./routes/search.js')
const listingsRoutes = require('./routes/listings.js')
const ordersRoutes = require('./routes/orders.js')
const testGeminiRoutes = require('./routes/test-gemini.js')
const testEmbeddingRoutes = require('./routes/test-embedding.js')

app.use('/api', searchRoutes)
app.use('/api/listings', listingsRoutes)
app.use('/api/orders', ordersRoutes)
app.use('/api', testGeminiRoutes)       // bisa dihapus setelah testing
app.use('/api', testEmbeddingRoutes)    // bisa dihapus setelah testing

// 404
app.use((_, res) => {
  res.status(404).json({ error: 'Endpoint tidak ditemukan' })
})

app.listen(PORT, () => {
  console.log(`TaniConnect BE running on http://localhost:${PORT}`)
  console.log(`Health: http://localhost:${PORT}/health`)
})