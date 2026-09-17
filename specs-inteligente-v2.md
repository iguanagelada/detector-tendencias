# Especificação Técnica: App Inteligente de Tendências Emergentes

**Data:** 17/09/2026  
**Versão:** MVP 2.0 - Com Detecção de Anomalias  
**Nicho:** Gaming (Geral)  
**Filosofia:** Encontrar o que está NASCENDO, não o que já é grande

---

## 1. O Problema com a Versão Anterior

❌ "Gaming Trends 2026" → hashtag genérica, inútil  
❌ "New Game Release" → todos sabem, não é tendência  
❌ "Gaming Challenge 2026" → alguém sempre tá criando desafio novo  

**O que realmente importa:**
✅ Um novo estilo de gameplay que 3 canais pequenos descobriram essa semana  
✅ Uma ferramenta de IA que apareceu no YouTube 5 dias atrás e já viralizou  
✅ Um jogo indie que começou humilde mas está crescendo 500% ao dia  
✅ Um termo/conceito que não existia 2 semanas atrás  

---

## 2. A Inteligência por Trás (Algoritmo)

### PRINCÍPIO GERAL: Procurar Anomalias, Não Volumes

```
Volume Alto ≠ Tendência
Crescimento Exponencial = Tendência
```

### Classificação de Trends:

```
🔴 MADURO (ignore)
   └─ Crescimento < 5% em 7 dias
   └─ Tema existe há > 6 meses
   └─ Canais grandes (>1M subs) falando sobre
   └─ Exemplo: "Best Gaming Console" (sempre existiu)

🟡 ESTABELECIDO (pesquisar, mas não prioridade)
   └─ Crescimento 5-50% em 7 dias
   └─ Tema existe há 1-6 meses
   └─ Mix de canais grandes + pequenos
   └─ Exemplo: "Ray Tracing Performance" (já conhecido)

🟢 EMERGENTE (PRIORIDADE!)
   └─ Crescimento > 100% em 7 dias
   └─ Crescimento ACELERADO (%, semana 1 < semana 2)
   └─ Tema tem < 1 mês
   └─ Canais pequenos falando primeiro
   └─ Aparecendo em múltiplas plataformas simultaneamente
   └─ Exemplo: "New AI-powered Gaming Tool" (nascendo AGORA)

🔥 VIRAL PURO (Detectar quando fica grande)
   └─ Crescimento > 500% em 3 dias
   └─ Apareceu em 5+ plataformas em 2 dias
   └─ Pode ficar GIGANTE
   └─ Exemplo: "Novo console leak" (todo mundo quer saber)
```

---

## 3. Algoritmos de Detecção por Fonte

### 🔍 GOOGLE TRENDS - Detecção de Emergência

**Não buscar:** Termos que já estão grandes  
**Buscar:** Crescimento ACELERADO + NOVO

```python
def is_emerging_trend(query):
    data_7d = get_trend_volume(query, period="7d")
    data_30d = get_trend_volume(query, period="30d")
    
    # Crescimento da última semana
    growth_7d = (data_7d[-1] - data_7d[0]) / data_7d[0]
    
    # Crescimento da semana anterior
    growth_prev_7d = (data_30d[-8] - data_30d[-15]) / data_30d[-15]
    
    # É emergente se:
    # 1. Crescimento acelerou (semana 2 > semana 1)
    if growth_7d > growth_prev_7d * 1.5:  # 50% mais rápido
        return True
    
    # 2. Crescimento explosivo recente (>100% em 7 dias)
    if growth_7d > 1.0:  # 100%+
        return True
    
    # 3. Termo praticamente novo (volume baixo mas crescendo)
    if data_7d[0] < 10 and data_7d[-1] > 50:
        return True
    
    return False
```

**O que mostrar:**
- ✅ Nome da tendência
- ✅ Taxa de crescimento: 150% em 7 dias (vs normal 5%)
- ✅ Idade: Surgiu há 8 dias
- ✅ Momentum: Acelerou 30% comparado à semana anterior
- ✅ Previsão: Pode atingir X buscas em 7 dias
- ❌ NÃO mostrar: "Gaming Trends 2026"

**Exemplo de Saída Real:**

```
🎯 EMERGING TREND: "Directional Audio in Games"
├─ Growth: ↑ 280% em 7 dias
├─ Age: 9 dias (NOVO!)
├─ Momentum: Acelerou +45% vs semana anterior
├─ Next Week Forecast: 450K+ searches
├─ Current Volume: 125K searches/dia
└─ Related: "3D audio gaming", "Spatial audio"
```

---

### ▶️ YOUTUBE - Método Iguana Inteligente (VidIQ)

**Objetivo:** Encontrar canais pequenos cuja performance é ANÔMALA

```python
def find_iguana_videos(niche="gaming"):
    small_channels = get_channels(
        subs_min=1000,
        subs_max=100000,  # ← CHAVE: Canais pequenos
        niche=niche
    )
    
    anomalies = []
    
    for channel in small_channels:
        # Histórico de views/hora
        historical_vph = channel.average_vph_last_30d  # Ex: 500 VPH
        
        # Vídeos recentes (últimos 7 dias)
        recent_videos = channel.get_videos(last_7_days=True)
        
        for video in recent_videos:
            current_vph = video.current_vph
            
            # É anômalo se cresce 5x+ do seu padrão
            anomaly_ratio = current_vph / historical_vph
            
            if anomaly_ratio > 5:  # 5x acima da média
                anomalies.append({
                    'video': video,
                    'anomaly_ratio': anomaly_ratio,
                    'quality_score': calculate_quality(video),
                    'theme': extract_theme(video.title)
                })
    
    # Ordena por anomalia mais forte
    return sorted(anomalies, 
                  key=lambda x: x['anomaly_ratio'],
                  reverse=True)
```

**O que mostrar:**

```
🎥 IGUANA VIDEO: "We Made a Game Using Only AI"
├─ Channel: IndieDevs (28K inscritos)
├─ Views: 850K em 5 dias
├─ VPH: 12,000 (15x acima da média do canal!)
├─ Anomaly Score: ⚠️⚠️⚠️ MUITO ANÔMALO
├─ Quality: Ruim (editado em celular, áudio com ruído)
├─ Theme Detected: "AI Game Development"
├─ Why it Matters: Tema novo + Canal pequeno = Tendência nascendo
└─ Action: Procurar outros videos sobre "AI Game Dev"
```

**Algoritmo do Método Iguana:**
1. Pega vídeos de canais <100k inscritos
2. Compara VPH atual vs média histórica do canal
3. Se ratio > 5x = ANÔMALO
4. Extrai tema automaticamente
5. Procura outros vídeos com mesmo tema
6. Se múltiplos canais pequenos descobriram o mesmo tema = **TENDÊNCIA EMERGENTE**

---

### 𝕏 TWITTER - Busca Inteligente de Termos

**Não buscar:** #GamingTrends2026, #NewGameRelease  
**Buscar:** Termos específicos que explodiram em menções

```python
def find_emerging_terms(niche="gaming"):
    # Termos que explodiram em menção comparado a semana anterior
    
    all_terms = search_niche_terms(niche)
    
    emerging = []
    for term in all_terms:
        mentions_this_week = count_mentions(term, days=7)
        mentions_prev_week = count_mentions(term, days_range=(14, 7))
        
        growth = mentions_this_week / max(mentions_prev_week, 1)
        
        # É emergente se:
        # 1. Cresceu 300%+ em menções
        # 2. Tem menos de 10k menções absolutas (não é já grande)
        
        if growth > 3.0 and mentions_this_week < 100000:
            emerging.append({
                'term': term,
                'growth': growth,
                'mentions': mentions_this_week,
                'sentiment': analyze_sentiment(term),
                'influencers': get_top_voices(term)
            })
    
    return sorted(emerging, key=lambda x: x['growth'], reverse=True)
```

**O que mostrar:**

```
𝕏 EMERGING TERM: "AI Director in Games"
├─ Growth: ↑ 520% de menções em 7 dias
├─ Volume: 24K menções (ainda PEQUENO = novo!)
├─ Sentiment: 78% Positivo
├─ Top Voices: @indiedev_studio (15K replies), @gamedev_ai (12K)
├─ Key Posts:
│  ├─ "Made a game director AI that actually works" (42K likes)
│  └─ "This AI director feature changed everything" (28K likes)
└─ Action: Acompanhar esses criadores, pode ficar grande
```

---

### 🎵 TIKTOK - Detecção de Sounds/Hashtags Novos

**Não buscar:** #GamingChallenge2026 (genérico)  
**Buscar:** Sounds/Hashtags criados há < 1 mês com crescimento

```python
def find_emerging_tiktok_trends(niche="gaming"):
    # Sounds/hashtags muito novos (< 30 dias)
    sounds = get_sounds(
        created_before_days=30,
        niche=niche
    )
    
    trending_new = []
    
    for sound in sounds:
        # Crescimento de views do som
        views_this_week = sound.views_last_7_days
        age_days = sound.age_in_days
        
        # Velocidade de crescimento (views por dia)
        velocity = views_this_week / age_days
        
        if velocity > 50000:  # 50k views/dia = crescimento forte
            trending_new.append({
                'sound': sound.name,
                'created_days_ago': age_days,
                'views': views_this_week,
                'velocity': velocity,
                'used_by_top_creators': sound.used_by_large_creators
            })
    
    return sorted(trending_new, 
                  key=lambda x: x['velocity'], 
                  reverse=True)
```

**O que mostrar:**

```
🎵 EMERGING TIKTOK SOUND: "epic_ai_boss_fight"
├─ Age: 14 dias (NOVO!)
├─ Views: 45M views no som
├─ Velocity: 180K views/dia (crescendo RÁPIDO)
├─ Used By: @xqc (200K videos), @pokimane (150K videos)
├─ Theme: Gaming boss fights with AI elements
├─ Prediction: Pode ser som VIRAL em 7 dias
└─ Action: Criar conteúdo com esse som AGORA
```

---

### 🔗 GOOGLE & YOUTUBE AUTOCOMPLETE - Procurar Termos Novos

**Não buscar:** "gaming laptop" (termo antigo, estável)  
**Buscar:** Termos que apareceram recentemente no autocomplete

```python
def find_new_autocomplete_terms(base_keyword="gaming"):
    # Termos sugeridos que não existiam 30 dias atrás
    
    current_suggestions = get_autocomplete(base_keyword)
    suggestions_30d_ago = get_autocomplete_archive(base_keyword, days_ago=30)
    
    new_suggestions = set(current_suggestions) - set(suggestions_30d_ago)
    
    # Novos termos = Buscas crescentes que o Google detectou
    emerging_terms = []
    
    for term in new_suggestions:
        volume = get_search_volume(term)
        
        # Novo + Volume crescente = tendência
        if volume > 1000:  # Tem buscas reais
            emerging_terms.append({
                'term': term,
                'volume': volume,
                'age': "Apareceu há < 30 dias",
                'growth_trend': "Crescimento"
            })
    
    return emerging_terms
```

**O que mostrar:**

```
🔤 NEW AUTOCOMPLETE TERM (não existia 30 dias atrás)
├─ "gaming with AI assist"
├─ Volume: 8.5K buscas/semana
├─ Status: Novo + Crescendo
├─ Google acredita: Isso vai ser procurado MUITO em breve
└─ Action: Conteúdo sobre isso pode bombar
```

---

## 4. Sistema de Intersecção (A Mágica)

**Quando uma tendência aparece em MÚLTIPLAS plataformas SIMULTANEAMENTE = FORTE**

```python
def detect_intersection(timeframe_days=14):
    """
    Encontra termos que apareceram em múltiplas 
    plataformas dentro de 14 dias
    """
    
    google_trends = find_emerging_google_trends(days=timeframe_days)
    youtube_trends = find_iguana_themes(days=timeframe_days)
    twitter_terms = find_emerging_terms(days=timeframe_days)
    tiktok_sounds = find_emerging_tiktok_trends(days=timeframe_days)
    
    intersections = {}
    
    # Procura tema comum
    for g_trend in google_trends:
        theme = extract_theme(g_trend['query'])
        
        # Esse tema aparece também em YouTube?
        youtube_match = find_videos_with_theme(youtube_trends, theme)
        
        # Aparece em Twitter?
        twitter_match = find_terms_with_theme(twitter_terms, theme)
        
        # Aparece em TikTok?
        tiktok_match = find_sounds_with_theme(tiktok_sounds, theme)
        
        platforms_count = (
            (1 if youtube_match else 0) +
            (1 if twitter_match else 0) +
            (1 if tiktok_match else 0)
        )
        
        # É uma intersecção forte se:
        # - Aparece em 3+ plataformas
        # - Todas no mesmo tema
        if platforms_count >= 3:
            intersections[theme] = {
                'google': g_trend,
                'youtube': youtube_match,
                'twitter': twitter_match,
                'tiktok': tiktok_match,
                'strength': platforms_count,
                'likelihood_to_go_viral': 95  # Muito alta!
            }
    
    return intersections
```

**O que mostrar:**

```
🔥 MEGA TREND (Aparecendo em TUDO):

TEMA: "Physics-Based Game Mechanics with AI"

├─ 🔍 Google Trends
│  └─ "AI physics engine games" ↑ 250% (8 dias)
│
├─ ▶️ YouTube (Método Iguana)
│  ├─ @gamedev_small: "AI Physics Broke Our Game" (5M views)
│  ├─ @tiny_studio: "Smart Physics with AI" (2M views)
│  └─ Anomaly: 10x-15x acima da média desses canais
│
├─ 𝕏 Twitter
│  ├─ "AI physics engine" ↑ 420% menções
│  ├─ 35K tweets (crescendo)
│  └─ Top: @gamedev_ai "Finally someone got it right"
│
├─ 🎵 TikTok
│  └─ Sound "ai_physics_magic" criado há 10 dias
│     └─ 120M views (crescimento exponencial)
│
└─ 🎯 VERDICT: TENDÊNCIA MUITO FORTE
   Likelihood: 95% vai ficar GRANDE em 30 dias
   Action: Crie conteúdo sobre isso AGORA
```

---

## 5. Dashboard - O Que Mostrar

### Primeira Seção: MEGA TRENDS (Intersecções)

```
🔥 MEGA TRENDS - Aparecendo em Múltiplas Plataformas

1. "Physics-Based AI Gaming"
   Força: ⭐⭐⭐⭐⭐ (5/5 plataformas)
   Likelihood: 95% → Viral em 30 dias
   First Appeared: 12 dias atrás (YouTube)
   
2. "Gaming AI Assistants"
   Força: ⭐⭐⭐⭐ (4/5 plataformas)
   Likelihood: 85%
   First Appeared: 18 dias atrás (Google)
```

### Segunda Seção: EMERGENTES POR PLATAFORMA

```
🔍 GOOGLE TRENDS - Crescimento Anômalo
├─ "VR Haptics Gaming" ↑ 320% (Novo tema)
├─ "Cloud Gaming Latency Fix" ↑ 280% (Novo termo)
└─ "Neural Network Game Design" ↑ 250% (Novo)

▶️ YOUTUBE - Método Iguana
├─ "Game Development with ChatGPT" (28K subs, 3.2M views)
│  └─ Anomaly: 18x acima da média (MUITO ANÔMALO!)
├─ "Indie Game Using Only AI" (15K subs, 1.8M views)
│  └─ Anomaly: 12x acima da média

𝕏 TWITTER
├─ "Neural Rendering in Games" ↑ 580% menções
├─ "AI Game Balancing" ↑ 420% menções

🎵 TIKTOK
├─ Sound "ai_dev_moment" (8 dias, 85M views)
├─ Sound "neural_gaming" (12 dias, 62M views)
```

### Terceira Seção: TIMELINE DE SURGIMENTO

```
Qual tendência surgiu primeiro e como se espalhou:

1. 7 dias atrás: "AI Physics" apareceu em YouTube (canal pequeno)
   ↓
2. 5 dias atrás: "AI Physics" começou em Google Trends
   ↓
3. 3 dias atrás: "AI Physics" explodiu no Twitter (150K menções/dia)
   ↓
4. 2 dias atrás: Som relacionado viralizou no TikTok (60M views)
   ↓
5. AGORA: Canais médios começam a falar (500K subs)
   
🎯 PRÓXIMO: Canais GIGANTES vão descobrir (1M+ subs)
⏱️ ETA: 3-7 dias

→ Se você criar conteúdo AGORA, você vai estar nos primeiros
```

---

## 6. Fluxo Técnico da Busca Inteligente

```
┌─────────────────────────────────┐
│ Usuário clica "Buscar Trends"   │
└────────────┬────────────────────┘
             │
    ┌────────▼─────────┐
    │ BUSCA INTELIGENTE │
    └────────┬─────────┘
             │
    ┌────────▼──────────────────────────┐
    │ 1. Google Trends (Anomalias)       │
    │    Crescimento > 100% ou acelerado │
    └────────┬──────────────────────────┘
             │
    ┌────────▼──────────────────────────┐
    │ 2. YouTube (Método Iguana)         │
    │    Canais <100k, VPH 5x+          │
    └────────┬──────────────────────────┘
             │
    ┌────────▼──────────────────────────┐
    │ 3. Twitter (Termos que explodiram) │
    │    Crescimento > 300% menções     │
    └────────┬──────────────────────────┘
             │
    ┌────────▼──────────────────────────┐
    │ 4. TikTok (Novos sounds/hashtags)  │
    │    Age < 30 dias, velocity alto    │
    └────────┬──────────────────────────┘
             │
    ┌────────▼──────────────────────────┐
    │ 5. Google/YouTube Autocomplete     │
    │    Termos que não existiam há 30d  │
    └────────┬──────────────────────────┘
             │
    ┌────────▼──────────────────────────┐
    │ 6. INTERSECÇÃO INTELIGENTE         │
    │    Procura por tema comum          │
    │    Em 3+ plataformas = MEGA TREND  │
    └────────┬──────────────────────────┘
             │
    ┌────────▼──────────────────────────┐
    │ 7. RANKING E ORDENAÇÃO             │
    │    Por força de intersecção        │
    │    Por likelihood viral            │
    │    Por recência                    │
    └────────┬──────────────────────────┘
             │
    ┌────────▼──────────────────────────┐
    │ RESULTADO COMPILADO E INTELIGENTE  │
    └────────────────────────────────────┘
```

---

## 7. Exemplo de Saída Real vs Saída Antiga

### ❌ SAÍDA ANTIGA (Inútil):
```
𝕏 Twitter Trends:
├─ #GamingTrends2026 (500K posts)
├─ #NewGameRelease (320K posts)
└─ #GamingCommunity (180K posts)

🎵 TikTok:
├─ #GamingChallenge2026 (45K videos)
└─ #NewGame (28K videos)

→ Você: "E daí? Não sei o que fazer com isso"
```

### ✅ SAÍDA NOVA (Inteligente):
```
🔥 MEGA TREND: "Game Development with Generative AI"
├─ Força: ⭐⭐⭐⭐⭐ (5 plataformas)
├─ Timeline: YouTube (8d) → Google (6d) → Twitter (3d) → TikTok (1d)
├─ Likelihood: 92% viral em 30 dias
│
├─ 🔍 Google: "generative AI game development" ↑ 380% (novo termo)
├─ ▶️ YouTube (Iguana): 4 canais <50k subs com vídeos 10x+ views
├─ 𝕏 Twitter: "AI game development" ↑ 650% menções em 7 dias
├─ 🎵 TikTok: 3 sons novos sobre tema, 250M views combinadas
│
└─ 🎯 AÇÃO CONCRETA:
   1. Crie tutorial "Como fazer jogo com AI"
   2. Colabore com criadores desses 4 canais
   3. Você estará nos PRIMEIROS quando ficar viral
```

---

## 8. APIs e Ferramentas Necessárias

### Para Detecção de Anomalias:
- ✅ **VidIQ API** (você já tem) - para análise de canais pequenos
- ✅ **Google Trends (PyTrends)** - para crescimento
- ✅ **Twitter API v2** - para análise de termos
- ✅ **TikTok API** - para análise de sounds (ou scraping)
- 🆕 **Machine Learning básico** - para detectar padrões

### Para Arquivamento e Histórico:
- 🟢 **Banco de dados** (apenas para 14 dias de histórico)
  - Guardar: termos, crescimento %, plataforma, data
  - Limpar automaticamente após 14 dias
  - Propósito: calcular intersecções

---

## 9. Requisitos Técnicos Atualizados

### Backend (Mais Complexo que V1):
```
Python 3.9+
├─ pytrends (Google Trends)
├─ tweepy (Twitter API)
├─ aiohttp (requisições paralelas)
├─ numpy/scipy (cálculos estatísticos)
├─ scikit-learn (detecção de anomalias)
└─ redis (cache de 14 dias)
```

### Novo: Machine Learning Simples
- Usar **Isolation Forest** para detectar anomalias em VPH
- Usar **SimpleExpSmoothing** para prever crescimento
- Usar **DBSCAN** para cluster temas similares

### Timeline Afetada:
- **Semana 1:** Setup + algoritmos base (Google, YouTube, Twitter)
- **Semana 2:** Detecção de anomalias + intersecções + TikTok
- **Semana 3:** ML simples + UI bonita + deploy

---

## 10. Checklist Final

```
BACKEND
☐ Algoritmo de anomalia em Google Trends
☐ Algoritmo de Método Iguana (YouTube)
☐ Busca inteligente em Twitter
☐ Busca em TikTok (sounds novos)
☐ Autocomplete novo (Google/YouTube)
☐ Sistema de intersecção
☐ Sistema de ranking
☐ Cache de 14 dias (Redis)

FRONTEND
☐ Seção MEGA TRENDS (intersecções)
☐ Seção por plataforma
☐ Timeline de surgimento
☐ Anomaly scores visuais
☐ Likelihood bar (% chance viral)
☐ Ações concretas sugeridas

INTELIGÊNCIA
☐ Detecção de anomalias (Isolation Forest)
☐ Previsão de crescimento
☐ Clustering de temas
☐ Análise de momentum
```

---

**Versão:** 2.0 - INTELIGENTE  
**Status:** Pronto para desenvolvimento inteligente  
**Última atualização:** 17/09/2026
