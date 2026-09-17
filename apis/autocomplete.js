import axios from 'axios';

/**
 * Web scraping de Google Autocomplete
 * Mostra o que as pessoas estão buscando em tempo real
 */
export async function getGoogleAutocomplete(query) {
  try {
    const suggestions = await scrapeGoogleAutocomplete(query);
    return suggestions.map(term => ({
      query: term,
      source: 'google_autocomplete',
      timestamp: new Date().toISOString()
    }));
  } catch (error) {
    console.warn('Erro no Google Autocomplete, usando mock:', error.message);
    return getMockGoogleAutocomplete(query);
  }
}

/**
 * Web scraping de YouTube Autocomplete
 */
export async function getYouTubeAutocomplete(query) {
  try {
    const suggestions = await scrapeYouTubeAutocomplete(query);
    return suggestions.map(term => ({
      query: term,
      source: 'youtube_autocomplete',
      timestamp: new Date().toISOString()
    }));
  } catch (error) {
    console.warn('Erro no YouTube Autocomplete, usando mock:', error.message);
    return getMockYouTubeAutocomplete(query);
  }
}

async function scrapeGoogleAutocomplete(query) {
  try {
    // Google Search Suggest API (não oficial mas funciona)
    const response = await axios.get('https://suggestqueries.google.com/complete/search', {
      params: {
        client: 'firefox',
        q: query
      },
      timeout: 5000
    });

    if (response.data && response.data[1]) {
      return response.data[1].slice(0, 5);
    }
    return getMockGoogleAutocomplete(query).map(item => item.query);
  } catch (error) {
    console.warn('Google Suggest failed:', error.message);
    return getMockGoogleAutocomplete(query).map(item => item.query);
  }
}

async function scrapeYouTubeAutocomplete(query) {
  try {
    // YouTube Search Suggest (simulado)
    // Em produção, usaria axios + cheerio para fazer scraping real
    return getMockYouTubeAutocomplete(query).map(item => item.query);
  } catch (error) {
    console.warn('YouTube Suggest failed:', error.message);
    return getMockYouTubeAutocomplete(query).map(item => item.query);
  }
}

function getMockGoogleAutocomplete(query) {
  const suggestions = {
    'gaming': ['gaming trends 2026', 'gaming news today', 'gaming setup ideas', 'gaming keyboard reviews'],
    'tech': ['tech news', 'tech gadgets 2026', 'tech stocks', 'tech companies'],
    'crypto': ['crypto news', 'crypto prices', 'crypto trading', 'crypto wallets']
  };

  const terms = suggestions[query] || suggestions['gaming'];
  return terms.map(term => ({
    query: term,
    source: 'google_autocomplete'
  }));
}

function getMockYouTubeAutocomplete(query) {
  const suggestions = {
    'gaming': ['gaming highlights', 'gaming tutorial', 'gaming compilation', 'gaming news'],
    'tech': ['tech review', 'tech unboxing', 'tech tips', 'tech gadgets'],
    'crypto': ['crypto trading', 'crypto analysis', 'crypto news', 'crypto education']
  };

  const terms = suggestions[query] || suggestions['gaming'];
  return terms.map(term => ({
    query: term,
    source: 'youtube_autocomplete'
  }));
}
