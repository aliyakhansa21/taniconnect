const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');

// Inisialisasi Supabase Cloud
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

// ============================================================
// Helper: Mendapatkan embedding dari Gemini Embedding API
// ============================================================
async function getEmbedding(text) {
    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-embedding-001:embedContent?key=${process.env.GEMINI_API_KEY}`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                content: { parts: [{ text }] }
            })
        }
    );

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Gagal mengambil embedding dari Gemini");
    }

    const data = await response.json();
    return data.embedding.values;
}


// ============================================================
// 1. ENDPOINT SEEDER -> GET http://localhost:5000/api/seed
//    Data komoditas bahan baku pertanian asli Indonesia
// ============================================================
router.get('/seed', async (req, res) => {
    try {
        const commodities = [
            {
                name: "Tomat Ceri Hidroponik",
                description: "Tomat ceri segar berukuran kecil, dipanen dari greenhouse hidroponik setiap pagi. Cocok untuk salad, garnish, dan saus pasta. Rasa manis alami dengan tekstur renyah.",
                category: "Sayuran",
                price_per_kg: 15000,
                distance_km: 5.2,
                has_oversupply_tag: true
            },
            {
                name: "Selada Keriting Organik",
                description: "Selada keriting hijau segar tanpa pestisida, ditanam secara organik bersertifikat. Ideal untuk salad, burger, dan wraps. Daun renyah dan tahan lama.",
                category: "Sayuran",
                price_per_kg: 12000,
                distance_km: 2.1,
                has_oversupply_tag: false
            },
            {
                name: "Cabai Rawit Merah",
                description: "Cabai rawit merah kualitas super dari dataran tinggi, tingkat kepedasan tinggi. Bahan utama sambal, bumbu masakan pedas, dan rendang. Dijual segar baru petik.",
                category: "Bumbu",
                price_per_kg: 45000,
                distance_km: 8.5,
                has_oversupply_tag: true
            },
            {
                name: "Bawang Merah Brebes",
                description: "Bawang merah asli Brebes, Jawa Tengah, aroma kuat dan rasa gurih. Bahan dasar bumbu dapur utama Indonesia untuk tumisan, sambal, dan rendang.",
                category: "Bumbu",
                price_per_kg: 32000,
                distance_km: 4.0,
                has_oversupply_tag: false
            },
            {
                name: "Bawang Putih Lokal",
                description: "Bawang putih lokal siung besar, aroma tajam dan rasa kuat. Bumbu dasar wajib untuk hampir semua masakan Indonesia, cocok untuk tumisan dan marinasi.",
                category: "Bumbu",
                price_per_kg: 38000,
                distance_km: 6.3,
                has_oversupply_tag: false
            },
            {
                name: "Kentang Dieng Premium",
                description: "Kentang segar dari dataran tinggi Dieng, tekstur lembut dan rasa manis alami. Cocok untuk sup, kentang goreng, perkedel, dan berbagai hidangan barat.",
                category: "Sayuran",
                price_per_kg: 18000,
                distance_km: 12.0,
                has_oversupply_tag: true
            },
            {
                name: "Wortel Organik Bandung",
                description: "Wortel organik segar dari dataran tinggi Lembang, Bandung. Warna oranye cerah, rasa manis. Ideal untuk jus, sup, salad, dan capcay.",
                category: "Sayuran",
                price_per_kg: 14000,
                distance_km: 3.5,
                has_oversupply_tag: false
            },
            {
                name: "Serai Segar",
                description: "Batang serai segar berkualitas, aroma harum citrus khas. Bumbu esensial untuk soto, tom yam, rendang, sambal matah, dan berbagai masakan nusantara.",
                category: "Bumbu",
                price_per_kg: 10000,
                distance_km: 7.1,
                has_oversupply_tag: true
            },
            {
                name: "Jeruk Nipis Lokal",
                description: "Jeruk nipis segar berkulit hijau tipis, air melimpah dan asam segar. Pelengkap sambal, soto, nasi goreng, dan minuman segar.",
                category: "Buah",
                price_per_kg: 16000,
                distance_km: 5.8,
                has_oversupply_tag: false
            },
            {
                name: "Daun Kemangi Segar",
                description: "Daun kemangi segar aroma khas yang kuat, lalapan wajib dan pelengkap pecel lele, ayam goreng, serta nasi bakar. Dipetik segar setiap hari.",
                category: "Sayuran",
                price_per_kg: 8000,
                distance_km: 1.5,
                has_oversupply_tag: false
            },
            {
                name: "Jahe Merah Emprit",
                description: "Jahe merah kualitas premium, rasa pedas hangat dan aroma kuat. Bahan utama jamu, wedang jahe, bandrek, dan bumbu masakan berkuah.",
                category: "Bumbu",
                price_per_kg: 42000,
                distance_km: 9.2,
                has_oversupply_tag: false
            },
            {
                name: "Timun Segar",
                description: "Timun hijau segar, renyah dan menyegarkan. Cocok untuk lalapan, acar, salad, garnish, dan sebagai bahan minuman detox.",
                category: "Sayuran",
                price_per_kg: 7000,
                distance_km: 2.8,
                has_oversupply_tag: true
            },
            {
                name: "Cabai Merah Besar",
                description: "Cabai merah besar kualitas A, warna merah cerah dan daging tebal. Bahan utama sambal, bumbu kari, dan masakan padang. Tingkat pedas sedang.",
                category: "Bumbu",
                price_per_kg: 35000,
                distance_km: 6.0,
                has_oversupply_tag: true
            },
            {
                name: "Kelapa Parut Segar",
                description: "Kelapa parut segar dari kelapa tua pilihan, santan kental dan gurih. Bahan dasar santan untuk rendang, gulai, sayur lodeh, dan kue tradisional.",
                category: "Buah",
                price_per_kg: 12000,
                distance_km: 10.5,
                has_oversupply_tag: false
            },
            {
                name: "Bayam Hijau Segar",
                description: "Bayam hijau segar dipetik pagi hari, daun lebar dan batang muda. Cocok untuk sayur bening, tumis bayam, smoothie hijau, dan sup.",
                category: "Sayuran",
                price_per_kg: 6000,
                distance_km: 1.8,
                has_oversupply_tag: true
            },
            {
                name: "Kunyit Segar",
                description: "Kunyit segar berwarna kuning pekat, aroma earthy khas. Bumbu utama untuk kari, nasi kuning, jamu kunyit asam, dan pewarna alami masakan.",
                category: "Bumbu",
                price_per_kg: 25000,
                distance_km: 4.5,
                has_oversupply_tag: false
            },
            {
                name: "Kangkung Segar",
                description: "Kangkung hijau segar batang muda, daun lebar dan renyah. Favorit untuk tumis kangkung, plecing kangkung, dan cah kangkung terasi.",
                category: "Sayuran",
                price_per_kg: 5000,
                distance_km: 2.0,
                has_oversupply_tag: true
            },
            {
                name: "Lengkuas Segar",
                description: "Lengkuas segar besar, aroma kuat dan rasa pedas hangat. Bumbu wajib rendang, soto, opor, dan aneka masakan berkuah khas nusantara.",
                category: "Bumbu",
                price_per_kg: 15000,
                distance_km: 5.5,
                has_oversupply_tag: false
            },
            {
                name: "Pisang Cavendish",
                description: "Pisang cavendish lokal kualitas ekspor, manis dan bertekstur lembut. Cocok untuk buah meja, smoothie, banana split, dan kue pisang.",
                category: "Buah",
                price_per_kg: 20000,
                distance_km: 8.0,
                has_oversupply_tag: true
            },
            {
                name: "Daun Bawang Segar",
                description: "Daun bawang hijau segar, aroma harum lembut. Bahan pelengkap sup, mie ayam, bakso, nasi goreng, dan martabak telur.",
                category: "Sayuran",
                price_per_kg: 9000,
                distance_km: 3.0,
                has_oversupply_tag: false
            }
        ];

        const logs = [];

        for (const item of commodities) {
            // Gabungkan nama + kategori + deskripsi untuk embedding yang kaya konteks
            const textToEmbed = `Nama Produk: ${item.name}. Kategori: ${item.category}. Deskripsi: ${item.description}`;

            const embedding = await getEmbedding(textToEmbed);

            const { error } = await supabase
                .from('items')
                .insert({
                    name: item.name,
                    description: item.description,
                    category: item.category,
                    price_per_kg: item.price_per_kg,
                    distance_km: item.distance_km,
                    has_oversupply_tag: item.has_oversupply_tag,
                    embedding: embedding
                });

            if (error) {
                logs.push(`❌ Gagal ${item.name}: ${error.message}`);
            } else {
                logs.push(`✅ Sukses ${item.name}`);
            }
        }

        return res.json({ success: true, message: "Seeding komoditas pertanian selesai!", detail: logs });

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

// ============================================================
// 2. ENDPOINT SEARCH -> GET http://localhost:5000/api/search?query=...
//    Pipeline: Gemini Embedding → Supabase pgvector Similarity Search
// ============================================================
router.get('/search', async (req, res) => {
    try {
        const queryText = req.query.query;

        if (!queryText) {
            return res.json({ success: true, data: [] });
        }

        // ── TAHAP 1: Embedding query langsung via Gemini Embedding API ──
        console.log(`[Search] Query asli: "${queryText}"`);
        const queryEmbedding = await getEmbedding(queryText);
        console.log(`[Search] Embedding berhasil dibuat`);

        // ── TAHAP 2: Vector Similarity Search di Supabase pgvector ──
        const { data: results, error: supabaseError } = await supabase.rpc('match_items', {
            query_embedding: queryEmbedding,
            match_threshold: 0.50,
            match_count: 10
        });

        if (supabaseError) {
            throw new Error(supabaseError.message);
        }

        return res.json({
            success: true,
            data: results
        });

    } catch (error) {
        console.error(`[Search Error]`, error.message);
        return res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;