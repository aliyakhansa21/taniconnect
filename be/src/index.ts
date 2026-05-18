import express, { type Request, type Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables (untuk nanti simpan API Key Gemini & Supabase)
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Mengizinkan FE Next.js untuk nembak API ke sini
app.use(express.json()); // Agar bisa menerima request body berupa JSON

// Route test sederhana
app.get('/', (req: Request, res: Response) => {
  res.send('TaniConnect Backend is running! 🚀');
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});