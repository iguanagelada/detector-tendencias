# 🚀 Deploy na Vercel

Seu app está **100% pronto** para deploy! Aqui estão as opções:

## Opção 1: Deploy via Dashboard Vercel (RECOMENDADO - Mais fácil)

### Passo 1: Criar conta Vercel
1. Acesse: https://vercel.com/signup
2. Faça signup (pode usar GitHub, Google, etc)

### Passo 2: Importar seu projeto
1. Clique em "New Project"
2. Selecione "Import Git Repository"
3. Cole a URL de seu repositório GitHub (ou crie um novo)

### Passo 3: Configurar Variáveis de Ambiente
1. Em "Environment Variables", adicione:
   ```
   VIDIQ_API_KEY = vidiq_IHtqjNBp5uFj3i1t3Oxi_lHme6y5EU_gNvyjjs38
   ```

### Passo 4: Deploy
1. Clique em "Deploy"
2. Aguarde ~1 minuto
3. Pronto! 🎉 Seu app estará no ar em: `https://seu-projeto.vercel.app`

---

## Opção 2: Deploy via CLI (Avançado)

### Passo 1: Autenticar Vercel
```bash
vercel login
```

### Passo 2: Deploy
```bash
cd "C:\Users\joaov\Documents\Claude Code"
vercel --prod --env VIDIQ_API_KEY="vidiq_IHtqjNBp5uFj3i1t3Oxi_lHme6y5EU_gNvyjjs38"
```

### Passo 3: Confirmar domínio
Siga os prompts e confirme o deploy

---

## Depois do Deploy

### Testar a URL ao vivo
Seu app estará em: `https://trending-detector.vercel.app`

### Mudanças futuras
Toda vez que fazer `git push`, Vercel automaticamente:
1. Detecta a mudança
2. Reconstrói o app
3. Faz deploy

---

## Troubleshooting

### Erro: "Module not found"
```
npm install
```

### Erro: "VIDIQ_API_KEY is undefined"
Verifique se adicionou a variável de ambiente no dashboard Vercel

### Servidor lento ao iniciar
Normal! Vercel reconstrui serverless functions na primeira requisição

---

## O que está incluído no Deploy

✅ Backend Node.js + Express  
✅ Frontend React com UI bonita  
✅ Integração VidIQ (sua chave)  
✅ Google Trends API  
✅ Web Scraping (Google/YouTube Autocomplete)  
✅ Modal com detalhes expandidos  
✅ Infinitas buscas com dados NOVOS  

---

**Seu app estará TOTALMENTE FUNCIONAL em produção!** 🎯
