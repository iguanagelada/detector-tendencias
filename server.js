import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import { getTrendingVideos } from './apis/vidiq.js';
import { getGoogleTrends } from './apis/googleTrends.js';
import { getGoogleAutocomplete, getYouTubeAutocomplete } from './apis/autocomplete.js';

dotenv.config();

// Production deployment
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Rota de teste
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Rota principal: buscar tendências
app.post('/api/search-trends', async (req, res) => {
  try {
    const { niche = 'gaming' } = req.body;
    const timestamp = new Date().toISOString();

    console.log(`[${timestamp}] Buscando tendências para: ${niche}`);

    // Executa todas as buscas em paralelo
    const [googleTrends, vidiqData, googleAutocomplete, youtubeAutocomplete] =
      await Promise.all([
        getGoogleTrends(niche),
        getTrendingVideos(niche),
        getGoogleAutocomplete(niche),
        getYouTubeAutocomplete(niche)
      ]);

    // Processa dados
    const megaTrends = processTrends({
      googleTrends,
      vidiqData,
      googleAutocomplete,
      youtubeAutocomplete,
      niche
    });

    res.json({
      success: true,
      timestamp,
      generation: Date.now(),
      mega_trends: megaTrends,
      methods_used: ['google_trends', 'youtube_iguana', 'google_autocomplete', 'youtube_autocomplete']
    });

  } catch (error) {
    console.error('Erro na busca:', error.message);
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Processa e combina dados de todas as fontes
function processTrends({ googleTrends, vidiqData, googleAutocomplete, youtubeAutocomplete, niche }) {
  const trends = [];

  // Combina dados do Google Trends
  if (googleTrends && googleTrends.length > 0) {
    googleTrends.slice(0, 2).forEach((trend, idx) => {
      trends.push({
        id: `trend_${idx}_${Date.now()}`,
        name: trend.query || trend.title,
        source: 'google_trends',
        growth: trend.growth || 'alto',
        platforms: 1,
        likelihood: Math.random() * 30 + 70,
        timestamp: new Date().toISOString(),
        data: {
          google_trends: [trend],
          youtube_iguana: vidiqData.slice(0, 1),
          google_autocomplete: googleAutocomplete.slice(0, 2),
          youtube_autocomplete: youtubeAutocomplete.slice(0, 2)
        }
      });
    });
  }

  // Combina dados do VidIQ
  if (vidiqData && vidiqData.length > 0) {
    vidiqData.slice(0, 2).forEach((video, idx) => {
      trends.push({
        id: `trend_yt_${idx}_${Date.now()}`,
        name: video.title || 'YouTube Trend',
        source: 'youtube_iguana',
        growth: 'acelerando',
        platforms: 2,
        likelihood: Math.random() * 30 + 75,
        timestamp: new Date().toISOString(),
        data: {
          google_trends: googleTrends.slice(0, 1),
          youtube_iguana: [video],
          google_autocomplete: googleAutocomplete.slice(0, 2),
          youtube_autocomplete: youtubeAutocomplete.slice(0, 2)
        }
      });
    });
  }

  // Ordena por likelihood (crescimento provável)
  trends.sort((a, b) => b.likelihood - a.likelihood);

  // Retorna apenas top 2
  return trends.slice(0, 2).map(trend => ({
    ...trend,
    data: {
      google_trends: trend.data.google_trends || [],
      youtube_iguana: trend.data.youtube_iguana || [],
      google_autocomplete: trend.data.google_autocomplete || [],
      youtube_autocomplete: trend.data.youtube_autocomplete || []
    }
  }));
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📊 API: http://localhost:${PORT}/api/search-trends`);
});
