'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

type Role = 'petani' | 'restoran'

export default function RegisterPage() {
  const supabase = createClient()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    password: '',
    role: 'restoran' as Role,
  })

  function update(field: string, value: string) {
    setForm(f => ({ ...f, [field]: value }))
    setError('')
  }

  async function handleRegister() {
    if (!form.full_name || !form.email || !form.password) {
      setError('Semua field wajib diisi.')
      return
    }
    if (form.password.length < 6) {
      setError('Password minimal 6 karakter.')
      return
    }

    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          full_name: form.full_name,
          role: form.role,
        },
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push(`/dashboard/${form.role}`)
  }

  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#F7FDF9',
      padding: 16,
    }}>
      <div style={{
        width: '100%',
        maxWidth: 400,
        background: 'white',
        borderRadius: 16,
        padding: 32,
        boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
      }}>
        {/* Logo */}
        <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 4 }}>
          <span style={{ color: '#1A7A4A' }}>Tani</span>
          <span style={{ color: '#0F4F2F' }}>Connect</span>
        </h1>
        <p style={{ color: '#718096', fontSize: 14, marginBottom: 24 }}>
          Buat akun untuk mulai bertransaksi
        </p>

        {/* Pilih Role */}
        <p style={{ fontSize: 13, fontWeight: 500, marginBottom: 8, color: '#1C2B2B' }}>
          Saya adalah...
        </p>
        <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
          {(['petani', 'restoran'] as Role[]).map(r => (
            <button
              key={r}
              onClick={() => update('role', r)}
              style={{
                flex: 1,
                padding: '10px 8px',
                borderRadius: 10,
                border: `2px solid ${form.role === r ? '#1A7A4A' : '#E2E8F0'}`,
                background: form.role === r ? '#E8F5E9' : 'white',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: 14,
                color: form.role === r ? '#1A7A4A' : '#718096',
                transition: 'all 0.15s',
              }}
            >
              {r === 'petani' ? '🌾 Petani' : '🍽️ Restoran'}
            </button>
          ))}
        </div>

        {/* Form */}
        {[
          { key: 'full_name', label: 'Nama Lengkap', type: 'text', placeholder: 'Contoh: Pak Slamet' },
          { key: 'email', label: 'Email', type: 'email', placeholder: 'email@contoh.com' },
          { key: 'password', label: 'Password', type: 'password', placeholder: 'Minimal 6 karakter' },
        ].map(field => (
          <div key={field.key} style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 13, fontWeight: 500, color: '#1C2B2B', display: 'block', marginBottom: 4 }}>
              {field.label}
            </label>
            <input
              type={field.type}
              placeholder={field.placeholder}
              value={form[field.key as keyof typeof form]}
              onChange={e => update(field.key, e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: 8,
                border: '1.5px solid #E2E8F0',
                fontSize: 14,
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>
        ))}

        {/* Error */}
        {error && (
          <p style={{
            background: '#FFF5F5',
            color: '#E53E3E',
            padding: '8px 12px',
            borderRadius: 8,
            fontSize: 13,
            marginBottom: 14,
          }}>
            {error}
          </p>
        )}

        {/* Submit */}
        <button
          onClick={handleRegister}
          disabled={loading}
          style={{
            width: '100%',
            padding: 13,
            background: loading ? '#718096' : '#1A7A4A',
            color: 'white',
            border: 'none',
            borderRadius: 10,
            fontSize: 15,
            fontWeight: 600,
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'background 0.15s',
          }}
        >
          {loading ? 'Mendaftar...' : 'Daftar Sekarang'}
        </button>

        <p style={{ textAlign: 'center', fontSize: 13, color: '#718096', marginTop: 16 }}>
          Sudah punya akun?{' '}
          <a href="/auth/login" style={{ color: '#1A7A4A', fontWeight: 500 }}>Masuk di sini</a>
        </p>
      </div>
    </main>
  )
}