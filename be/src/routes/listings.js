const { Router } = require('express')
const { verifyToken } = require('../middleware/verifyToken.js')
const { supabaseAdmin } = require('../lib/supabaseAdmin.js')

const router = Router()

// GET /api/listings
router.get('/', async (req, res) => {
  const { data, error } = await supabaseAdmin
    .from('items')
    .select('id, name, description, category, price_per_kg, stock, photo_url, has_oversupply_tag, distance_km, location')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (error) {
    res.status(500).json({ error: error.message })
    return
  }

  res.json({ data })
})

// POST /api/listings — petani tambah produk baru
router.post('/', verifyToken, async (req, res) => {
  if (req.user?.role !== 'petani') {
    res.status(403).json({ error: 'Hanya petani yang bisa menambah listing' })
    return
  }

  const { name, description, category, price_per_kg, stock, photo_url, lat, lng } = req.body

  if (!name || !category || !price_per_kg || !stock) {
    res.status(400).json({ error: 'Field name, category, price_per_kg, stock wajib diisi' })
    return
  }

  const locationValue = lat && lng ? `POINT(${lng} ${lat})` : null

  const { data, error } = await supabaseAdmin
    .from('items')
    .insert({
      seller_id: req.user.id,
      name, description, category,
      price_per_kg, stock, photo_url,
      location: locationValue,
    })
    .select()
    .single()

  if (error) {
    res.status(500).json({ error: error.message })
    return
  }

  res.status(201).json({ data })
})

// PATCH /api/listings/:id
router.patch('/:id', verifyToken, async (req, res) => {
  const { id } = req.params

  const { data: item } = await supabaseAdmin
    .from('items')
    .select('seller_id')
    .eq('id', id)
    .single()

  if (!item || item.seller_id !== req.user?.id) {
    res.status(403).json({ error: 'Bukan listing milikmu' })
    return
  }

  const { data, error } = await supabaseAdmin
    .from('items')
    .update(req.body)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    res.status(500).json({ error: error.message })
    return
  }

  res.json({ data })
})

module.exports = router