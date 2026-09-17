# 🎯 Detector de Tendências - Fase 1

Encontre tendências emergentes em tempo real de múltiplas fontes.

## 🚀 Como Rodar Localmente

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar `.env`
O arquivo `.env` já está configurado com sua chave VidIQ:
```
VIDIQ_API_KEY=vidiq_IHtqjNBp5uFj3i1t3Oxi_lHme6y5EU_gNvyjjs38
PORT=3001
NODE_ENV=development
```

### 3. Iniciar servidor
```bash
npm start
```

O servidor vai rodar em: **http://localhost:3001**

## 📊 Como Usar

1. **Digite um nicho** (gaming, tech, crypto, etc)
2. **Clique "Nova Busca"** para buscar tendências
3. **Clique "Ver Detalhes"** para ver todos os 4 métodos
4. **Clique "Gerar Mais"** para buscar novas tendências

## 🔄 Métodos Implementados (Fase 1)

- ✅ **Google Trends** - Termos emergentes com crescimento
- ✅ **YouTube (VidIQ)** - Vídeos com anomalias de crescimento
- ✅ **Google Autocomplete** - Buscas em tempo real
- ✅ **YouTube Autocomplete** - Conteúdo que as pessoas procuram

## 📋 Estrutura do Projeto

```
.
├── server.js              # Servidor Express
├── apis/
│   ├── vidiq.js          # Integração VidIQ
│   ├── googleTrends.js   # Google Trends
│   └── autocomplete.js    # Web scraping
├── public/
│   └── index.html        # Frontend
├── .env                  # Configurações
└── package.json
```

## 🔗 API Endpoints

### POST `/api/search-trends`
```bash
curl -X POST http://localhost:3001/api/search-trends \
  -H "Content-Type: application/json" \
  -d '{"niche": "gaming"}'
```

**Resposta:**
```json
{
  "success": true,
  "timestamp": "2026-09-17T10:30:00Z",
  "mega_trends": [
    {
      "id": "trend_0_...",
      "name": "generative AI game development",
      "growth": "alto",
      "likelihood": 87,
      "platforms": 2,
      "data": {
        "google_trends": [...],
        "youtube_iguana": [...],
        "google_autocomplete": [...],
        "youtube_autocomplete": [...]
      }
    }
  ]
}
```

## 🎯 Próximas Fases

### Fase 2 (Twitter/X + Reddit)
- Quando você tiver developer account Twitter
- Quando você conseguir Reddit API

### Fase 3 (Completo)
- TikTok API
- Instagram
- Outras fontes

## 🛠️ Troubleshooting

### Erro: "Cannot find module"
```bash
npm install
```

### Erro: "VIDIQ_API_KEY is undefined"
Verifique se `.env` está na raiz do projeto

### Porta 3001 já está em uso
Mude a porta:
```bash
PORT=3002 npm start
```

## 📱 Deploy (Próximo)

Quando estiver funcionando localmente:
1. Criar conta Vercel (vercel.com)
2. Conectar repositório GitHub
3. Deploy automático

## 📝 Notas

- Cada busca traz dados **NOVOS e DIFERENTES**
- Não usa banco de dados hardcoded
- Usa APIs reais (VidIQ) + Web scraping
- Pronto para scale infinito

---

**Status:** Fase 1 em desenvolvimento  
**Última atualização:** 17/09/2026
