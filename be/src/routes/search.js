const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');

// Inisialisasi Supabase Cloud
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

// 1. ENDPOINT SEEDER -> GET http://localhost:5000/api/seed
router.get('/seed', async (req, res) => {
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

        const googleResponse = await fetch(
            `https://generativelanguage.googleapis.com/v1/models/gemini-embedding-001:embedContent?key=${process.env.GEMINI_API_KEY}`,
            {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                content: { parts: [{ text: textToEmbed }] }
            })
            }
        );

        if (!googleResponse.ok) {
            const errorData = await googleResponse.json();
            throw new Error(errorData.error?.message || "Gagal mengambil embedding dari Gemini");
        }

        const googleData = await googleResponse.json();
        const embedding = googleData.embedding.values;

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

    return res.json({ success: true, message: "Seeding selesai", detail: logs });

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

// 2. ENDPOINT SEARCH -> GET http://localhost:5000/api/search?query=...
router.get('/search', async (req, res) => {
    try {
        const queryText = req.query.query;

        if (!queryText) {
        return res.status(400).json({ success: false, error: "Query pencarian tidak boleh kosong" });
        }

        const googleResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-embedding-001:embedContent?key=${process.env.GEMINI_API_KEY}`,
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
    const queryEmbedding = googleData.embedding.values;

    const { data: results, error: supabaseError } = await supabase.rpc('match_items', {
        query_embedding: queryEmbedding,
        match_threshold: 0.3,
        match_count: 5
    });

    if (supabaseError) {
        throw new Error(supabaseError.message);
    }

    return res.json({ success: true, data: results });

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;