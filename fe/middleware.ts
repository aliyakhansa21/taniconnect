import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // ============================================================
  // MODE MOCKUP / DEMO — Middleware Supabase dinonaktifkan.
  // Dashboard dapat diakses langsung tanpa sesi backend.
  // Aktifkan kembali blok di bawah saat backend sudah siap.
  // ============================================================
  return NextResponse.next()

  // ---------- Kode asli Supabase (nonaktif saat demo) ----------
  // import { createServerClient } from '@supabase/ssr'
  //
  // let supabaseResponse = NextResponse.next({ request })
  // const supabase = createServerClient(
  //   process.env.NEXT_PUBLIC_SUPABASE_URL!,
  //   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  //   {
  //     cookies: {
  //       getAll() { return request.cookies.getAll() },
  //       setAll(cookiesToSet) {
  //         cookiesToSet.forEach(({ name, value, options }) =>
  //           supabaseResponse.cookies.set(name, value, options)
  //         )
  //       },
  //     },
  //   }
  // )
  // const { data: { user } } = await supabase.auth.getUser()
  //
  // if (!user && request.nextUrl.pathname.startsWith('/dashboard')) {
  //   return NextResponse.redirect(new URL('/auth/register', request.url))
  // }
  // if (user && request.nextUrl.pathname.startsWith('/auth')) {
  //   const profile = await supabase.from('profiles').select('role').eq('id', user.id).single()
  //   const role = profile.data?.role ?? 'restoran'
  //   return NextResponse.redirect(new URL(`/dashboard/${role}`, request.url))
  // }
  // return supabaseResponse
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth/:path*'],
}