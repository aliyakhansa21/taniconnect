const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000; 

// Middleware
app.use(cors()); 
app.use(express.json()); 

// Route test sederhana
app.get('/', (req, res) => {
  res.send('TaniConnect Backend is running pakai JavaScript! 🚀');
});

// Route semantic search
const searchRoutes = require('./routes/search.js');
app.use('/api', searchRoutes);

const testGeminiRoutes = require('./routes/test-gemini.js');
app.use('/api', testGeminiRoutes);

const testEmbeddingRoutes = require('./routes/test-embedding.js');
app.use('/api', testEmbeddingRoutes);

app.listen(PORT, () => {
  console.log(`Server Backend TaniConnect berjalan mulus di http://localhost:${PORT}`);
});