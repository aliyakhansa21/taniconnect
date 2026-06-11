const { Router } = require('express')
const { verifyToken } = require('../middleware/verifyToken.js')
const { supabaseAdmin } = require('../lib/supabaseAdmin.js')

const router = Router()

// GET /api/orders
router.get('/', verifyToken, async (req, res) => {
  const userId = req.user.id

  const { data, error } = await supabaseAdmin
    .from('orders')
    .select(`
      id, status, total_price, notes, created_at, updated_at,
      order_items(id, quantity, price_per_unit, subtotal),
      buyer:profiles!buyer_id(full_name),
      seller:profiles!seller_id(full_name)
    `)
    .or(`buyer_id.eq.${userId},seller_id.eq.${userId}`)
    .order('created_at', { ascending: false })

  if (error) {
    res.status(500).json({ error: error.message })
    return
  }

  res.json({ data })
})

// POST /api/orders
router.post('/', verifyToken, async (req, res) => {
  if (req.user?.role !== 'restoran') {
    res.status(403).json({ error: 'Hanya restoran yang bisa membuat order' })
    return
  }

  const { seller_id, items, notes } = req.body

  if (!seller_id || !items?.length) {
    res.status(400).json({ error: 'seller_id dan items wajib diisi' })
    return
  }

  const itemIds = items.map(i => i.item_id)
  const { data: dbItems } = await supabaseAdmin
    .from('items')
    .select('id, price_per_kg')
    .in('id', itemIds)

  if (!dbItems) {
    res.status(400).json({ error: 'Item tidak ditemukan' })
    return
  }

  let total_price = 0
  const orderItems = items.map(item => {
    const dbItem = dbItems.find(i => i.id === item.item_id)
    const subtotal = dbItem.price_per_kg * item.quantity
    total_price += subtotal
    return {
      listing_id: item.item_id,
      quantity: item.quantity,
      price_per_unit: dbItem.price_per_kg,
      subtotal,
    }
  })

  const { data: order, error: orderError } = await supabaseAdmin
    .from('orders')
    .insert({ buyer_id: req.user.id, seller_id, total_price, notes })
    .select()
    .single()

  if (orderError) {
    res.status(500).json({ error: orderError.message })
    return
  }

  await supabaseAdmin
    .from('order_items')
    .insert(orderItems.map(item => ({ ...item, order_id: order.id })))

  res.status(201).json({ data: order })
})

// PATCH /api/orders/:id/status
router.patch('/:id/status', verifyToken, async (req, res) => {
  const { id } = req.params
  const { status } = req.body

  const validStatus = ['dipesan', 'dikonfirmasi', 'diproses', 'dikirim', 'selesai']
  if (!validStatus.includes(status)) {
    res.status(400).json({ error: 'Status tidak valid' })
    return
  }

  const { data, error } = await supabaseAdmin
    .from('orders')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id)
    .or(`buyer_id.eq.${req.user.id},seller_id.eq.${req.user.id}`)
    .select()
    .single()

  if (error) {
    res.status(500).json({ error: error.message })
    return
  }

  res.json({ data })
})

module.exports = router