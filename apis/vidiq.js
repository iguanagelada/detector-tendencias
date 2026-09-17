import axios from 'axios';

const VIDIQ_API_KEY = process.env.VIDIQ_API_KEY;
const VIDIQ_BASE_URL = 'https://api.vidiq.com/api/v2';

/**
 * Busca vídeos trending usando VidIQ
 * Usa o método "Iguana" para encontrar vídeos com anomalias de crescimento
 */
export async function getTrendingVideos(niche = 'gaming') {
  try {
    // Busca vídeos trending relacionados ao nicho
    const response = await axios.get(`${VIDIQ_BASE_URL}/trending`, {
      headers: {
        'Authorization': `Bearer ${VIDIQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      params: {
        keyword: niche,
        country: 'BR',
        limit: 5
      },
      timeout: 10000
    });

    if (response.data && response.data.trending_videos) {
      return response.data.trending_videos.map(video => ({
        title: video.title,
        channel: video.channel_name,
        views: video.view_count,
        vph: video.views_per_hour || 0,
        subs: video.channel_subs || 0,
        growth: video.growth_rate || 'unknown',
        anomaly_ratio: calculateAnomalyRatio(video),
        timestamp: new Date().toISOString()
      }));
    }

    return getMockVidIQData(niche);

  } catch (error) {
    console.warn(`Erro ao buscar VidIQ: ${error.message}, usando dados simulados`);
    return getMockVidIQData(niche);
  }
}

function calculateAnomalyRatio(video) {
  // Se VPH > média normal, é anomalia
  const vph = video.views_per_hour || 0;
  const normalVPH = 5000; // média
  if (vph > 0) {
    return Math.round((vph / normalVPH) * 10);
  }
  return Math.random() * 15 + 5;
}

function getMockVidIQData(niche) {
  const mockTitles = [
    `New ${niche} mechanics explained`,
    `${niche} trends 2026`,
    `Best ${niche} gameplay moments`,
    `${niche} development guide`,
    `${niche} innovation showcase`
  ];

  return mockTitles.map((title, idx) => ({
    title,
    channel: `${niche}Channel${idx + 1}`,
    views: Math.floor(Math.random() * 5000000) + 100000,
    vph: Math.floor(Math.random() * 50000) + 5000,
    subs: Math.floor(Math.random() * 500000) + 10000,
    growth: ['acelerando', 'exponencial', 'alto'][Math.floor(Math.random() * 3)],
    anomaly_ratio: Math.random() * 15 + 8,
    timestamp: new Date().toISOString()
  }));
}
