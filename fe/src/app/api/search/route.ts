import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(request: Request) {
  try {
    // 1. Ambil keyword pencarian dari URL parameter (misal: ?query=minuman seger)
    const { searchParams } = new URL(request.url);
    const queryText = searchParams.get('query');

    if (!queryText) {
      return NextResponse.json({ success: false, error: "Query pencarian tidak boleh kosong" }, { status: 400 });
    }

    // 2. Inisialisasi Supabase
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // 3. Ubah teks pencarian user menjadi vektor menggunakan Gemini
    const apiKey = process.env.GEMINI_API_KEY;
    const googleResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-embedding-001:embedContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: { parts: [{ text: queryText }] }
        })
      }
    );

    if (!googleResponse.ok) {
      const errorData = await googleResponse.json();
      throw new Error(errorData.error?.message || "Gagal membuat embedding pencarian");
    }

    const googleData = await googleResponse.json();
    const queryEmbedding = googleData.embedding.values; // Vektor dari kata kunci user

    // 4. Panggil fungsi RPC 'match_items' di Supabase untuk mencari data tercocok
    const { data: results, error: supabaseError } = await supabase.rpc('match_items', {
      query_embedding: queryEmbedding,
      match_threshold: 0.3, // Standar tingkat kemiripan (0.3 - 0.5 sudah cukup bagus)
      match_count: 5        // Batasi maksimal 5 hasil teratas yang muncul
    });

    if (supabaseError) {
      throw new Error(supabaseError.message);
    }

    // 5. Kembalikan hasil pencarian semantik ke frontend
    return NextResponse.json({ success: true, data: results });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}