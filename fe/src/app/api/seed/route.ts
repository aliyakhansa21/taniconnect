import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  try {
    const menuItems = [
      {
        name: "Nasi Goreng Spesial",
        description: "Nasi goreng dengan bumbu rempah rahasia, telur mata sapi, ayam suwir, dan kerupuk udang.",
        category: "Makanan Utama"
      },
      {
        name: "Es Teh Manis",
        description: "Teh melati segar diseduh dengan gula asli dan es batu kristal.",
        category: "Minuman"
      },
      {
        name: "Mie Goreng Jawa",
        description: "Mie kuning basah dimasak dengan bumbu kemiri, kol, sawi, dan potongan bakso sapi.",
        category: "Makanan Utama"
      }
    ];

    const logs = [];

    for (const item of menuItems) {
      const textToEmbed = `Nama Menu: ${item.name}. Kategori: ${item.category}. Deskripsi: ${item.description}`;

      const apiKey = process.env.GEMINI_API_KEY;
      
      // FIX: Menggunakan jalur resmi v1 dengan model gemini-embedding-001
      const googleResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-embedding-001:embedContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            content: {
              parts: [{ text: textToEmbed }]
            }
          })
        }
      );

      if (!googleResponse.ok) {
        const errorData = await googleResponse.json();
        throw new Error(errorData.error?.message || "Gagal mengambil embedding dari Gemini");
      }

      const googleData = await googleResponse.json();
      const embedding = googleData.embedding.values; // Menghasilkan 768 dimensi

      // Simpan ke Supabase
      const { error } = await supabase
        .from('items')
        .insert({
          name: item.name,
          description: item.description,
          category: item.category,
          embedding: embedding
        });

      if (error) {
        logs.push(`Gagal ${item.name}: ${error.message}`);
      } else {
        logs.push(`Sukses ${item.name}`);
      }
    }

    return NextResponse.json({ success: true, message: "Proses selesai", detail: logs });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}