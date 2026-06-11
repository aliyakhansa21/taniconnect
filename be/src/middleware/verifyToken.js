const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()

async function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Token tidak ditemukan' })
    return
  }

  const token = authHeader.split(' ')[1]

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
  )

  const { data: { user }, error } = await supabase.auth.getUser(token)

  if (error || !user) {
    res.status(401).json({ error: 'Token tidak valid atau sudah expired' })
    return
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  req.user = {
    id: user.id,
    email: user.email ?? '',
    role: profile?.role ?? 'restoran',
  }

  next()
}

module.exports = { verifyToken }