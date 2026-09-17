# 🚀 DEPLOY AUTOMÁTICO - Detector de Tendências
# Só execute isto no PowerShell da pasta do projeto!

Write-Host "================================" -ForegroundColor Cyan
Write-Host "  🚀 DEPLOY AUTOMÁTICO" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Passo 1: Criar repositório no GitHub
Write-Host "PASSO 1️⃣: Criar Repositório no GitHub" -ForegroundColor Yellow
Write-Host ""
Write-Host "Você precisa criar um repositório vazio no GitHub." -ForegroundColor White
Write-Host "Vou abrir o site para você..." -ForegroundColor White
Write-Host ""

$escolha = Read-Host "Pressione ENTER para abrir GitHub (ou Digite 'S' se já criou o repo)"

if ($escolha -ne 'S') {
    Write-Host ""
    Write-Host "Abrindo GitHub..." -ForegroundColor Green
    Start-Process "https://github.com/new"

    Write-Host ""
    Write-Host "📝 No GitHub, faça isto:" -ForegroundColor Cyan
    Write-Host "  1. Repository name: detector-tendencias" -ForegroundColor White
    Write-Host "  2. Description: App inteligente de detecção de tendências" -ForegroundColor White
    Write-Host "  3. Deixe como PUBLIC" -ForegroundColor White
    Write-Host "  4. ❌ NÃO marque 'Add README'" -ForegroundColor White
    Write-Host "  5. Clique 'Create repository'" -ForegroundColor White
    Write-Host ""
    Write-Host "Quando terminar de criar, volte aqui e pressione ENTER" -ForegroundColor Yellow
    Read-Host "Pressione ENTER para continuar"
}

Write-Host ""
Write-Host "✅ Repositório criado!" -ForegroundColor Green
Write-Host ""

# Passo 2: Configurar Git
Write-Host "PASSO 2️⃣: Preparando seu código..." -ForegroundColor Yellow
Write-Host ""

# Remover origin anterior se existir
git remote remove origin 2>$null

# Adicionar novo remote
$username = "iguanagelada"
$repoUrl = "https://github.com/$username/detector-tendencias.git"

Write-Host "Conectando ao GitHub ($repoUrl)..." -ForegroundColor Cyan
git remote add origin $repoUrl

# Renomear branch para main
git branch -M main 2>$null

Write-Host "✅ Git configurado!" -ForegroundColor Green
Write-Host ""

# Passo 3: Fazer Push
Write-Host "PASSO 3️⃣: Enviando código para GitHub..." -ForegroundColor Yellow
Write-Host ""
Write-Host "Você será pedido para autenticar." -ForegroundColor White
Write-Host "⚠️  IMPORTANTE:" -ForegroundColor Red
Write-Host "  - Username: $username" -ForegroundColor White
Write-Host "  - Password: COPIE um Token de https://github.com/settings/tokens" -ForegroundColor White
Write-Host "    (Novo token → Marque 'repo' e 'workflow' → Generate → Copie)" -ForegroundColor White
Write-Host ""

git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "================================" -ForegroundColor Green
    Write-Host "  ✅ SUCESSO! Código enviado!" -ForegroundColor Green
    Write-Host "================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Seu código está em:" -ForegroundColor Cyan
    Write-Host "https://github.com/$username/detector-tendencias" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "PRÓXIMO PASSO: Deploy no Vercel" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "1. Vá em: https://vercel.com" -ForegroundColor White
    Write-Host "2. Clique 'Sign Up with GitHub'" -ForegroundColor White
    Write-Host "3. Clique 'New Project'" -ForegroundColor White
    Write-Host "4. Selecione 'detector-tendencias'" -ForegroundColor White
    Write-Host "5. Em 'Environment Variables', adicione:" -ForegroundColor White
    Write-Host "   - Name: VIDIQ_API_KEY" -ForegroundColor Cyan
    Write-Host "   - Value: vidiq_IHtqjNBp5uFj3i1t3Oxi_lHme6y5EU_gNvyjjs38" -ForegroundColor Cyan
    Write-Host "6. Clique 'Deploy'" -ForegroundColor White
    Write-Host ""
    Write-Host "Pronto! Em 2 minutos seu app estará ao vivo! 🚀" -ForegroundColor Green
    Write-Host ""

    $vercelChoice = Read-Host "Deseja abrir Vercel agora? (S/N)"
    if ($vercelChoice -eq 'S' -or $vercelChoice -eq 's') {
        Start-Process "https://vercel.com"
    }
} else {
    Write-Host ""
    Write-Host "❌ Erro ao fazer push!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Verifique:" -ForegroundColor Yellow
    Write-Host "  1. Você criou o repositório no GitHub?" -ForegroundColor White
    Write-Host "  2. Usou o token correto (não sua senha)?" -ForegroundColor White
    Write-Host "  3. Seu username é mesmo: $username ?" -ForegroundColor White
    Write-Host ""
    Write-Host "Dúvidas? Leia: GITHUB_VERCEL_GUIA.md" -ForegroundColor Cyan
}

Write-Host ""
Read-Host "Pressione ENTER para fechar"
