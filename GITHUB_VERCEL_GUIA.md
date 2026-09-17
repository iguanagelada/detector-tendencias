# 📚 Guia Completo: GitHub + Vercel (Iniciante)

Este guia explica **exatamente** o que fazer, passo por passo. Não pule nenhum passo!

---

## PARTE 1: Preparando o Repositório Git Local

### Passo 1: Abrir Terminal/PowerShell

1. Abra a pasta do projeto: `C:\Users\joaov\Documents\Claude Code`
2. Clique direito → **"Open in Terminal"** (ou PowerShell)
3. A janela preta que abrir é o seu terminal

### Passo 2: Verificar Git

Digite este comando e pressione Enter:
```
git --version
```

**Se aparecer um número** (tipo `git version 2.40.0`) → Git já está instalado ✅

**Se aparecer erro** → Baixe em https://git-scm.com/downloads e instale

### Passo 3: Configurar Git (primeira vez)

Se é a primeira vez usando Git, execute estes comandos NO TERMINAL:

```
git config --global user.name "Seu Nome Aqui"
```

Depois:

```
git config --global user.email "seu-email@gmail.com"
```

**Exemplo:**
```
git config --global user.name "João Silva"
git config --global user.email "joao@gmail.com"
```

### Passo 4: Verificar Status do Git

Digite no terminal:
```
git status
```

Se aparecer `On branch master` ou `On branch main` → está funcionando ✅

---

## PARTE 2: Criar Repositório no GitHub

### Passo 5: Criar Conta GitHub (se não tiver)

1. Acesse https://github.com
2. Clique em **"Sign up"** (superior direito)
3. Preencha:
   - Email: seu email real
   - Senha: uma senha forte
   - Username: seu nome de usuário (tipo "joao-silva-123")
4. Clique **"Create account"**
5. Confirme o email que GitHub enviou

### Passo 6: Criar um Novo Repositório

1. Faça login no GitHub
2. Clique no ícone **"+"** (superior direito) → **"New repository"**
3. Preencha assim:
   - **Repository name:** `detector-tendencias` (ou o nome que quiser)
   - **Description:** "App inteligente de detecção de tendências em redes sociais"
   - **Public** (deixe público para Vercel conseguir acessar)
   - ❌ NÃO marque "Add a README.md" (pule isso)
   - ❌ NÃO marque "Add .gitignore"
   - ❌ NÃO marque "Choose a license"
4. Clique **"Create repository"**

**Você verá uma tela com código** - deixe aberta, vamos usar em breve!

---

## PARTE 3: Subir Código para GitHub

### Passo 7: Conectar seu Repositório Local ao GitHub

Você verá uma tela assim no GitHub com instruções. Siga exatamente:

Na pasta do seu projeto (no terminal), execute estes comandos UM POR UM:

#### Primeiro comando:
```
git remote add origin https://github.com/SEU_USUARIO/detector-tendencias.git
```

**Substitua:**
- `SEU_USUARIO` → seu username do GitHub (tipo: joao-silva-123)

**Exemplo real:**
```
git remote add origin https://github.com/joao-silva-123/detector-tendencias.git
```

#### Segundo comando:
```
git branch -M main
```

#### Terceiro comando:
```
git push -u origin main
```

**Quando pedir username/password:**
- Username: seu username do GitHub
- Password: **NÃO é sua senha!** É um "Personal Access Token"

**Como criar o Token:**
1. Vá em https://github.com/settings/tokens
2. Clique **"Generate new token"**
3. Marque estes checkboxes:
   - ☑️ repo (acesso ao repositório)
   - ☑️ workflow (para CI/CD)
4. Clique **"Generate token"**
5. **COPIE o token** que aparecer (ele só aparece uma vez!)
6. Cole este token no terminal quando pedir password

### Passo 8: Verificar se Funcionou

Vá para https://github.com/SEU_USUARIO/detector-tendencias

Se você ver seus arquivos lá → **Sucesso! ✅**

---

## PARTE 4: Deploy no Vercel

### Passo 9: Criar Conta Vercel

1. Acesse https://vercel.com
2. Clique **"Sign Up"** → Escolha **"Sign up with GitHub"**
3. **Autorize** Vercel acessar seu GitHub
4. Preencha os dados

### Passo 10: Importar Projeto do GitHub

1. No Vercel, clique **"New Project"**
2. Verá sua lista de repositórios do GitHub
3. Procure por **"detector-tendencias"** (ou o nome que deu)
4. Clique **"Import"**

### Passo 11: Configurar Variáveis de Ambiente

Na tela que aparecer:
1. Procure por **"Environment Variables"**
2. Adicione:
   - **Name:** `VIDIQ_API_KEY`
   - **Value:** `vidiq_IHtqjNBp5uFj3i1t3Oxi_lHme6y5EU_gNvyjjs38`
3. Clique **"Add"**

### Passo 12: Deploy!

1. Clique o botão **"Deploy"** (bem grande)
2. **Aguarde 1-2 minutos** enquanto Vercel constrói seu app
3. Quando terminar, verá:
   ```
   ✅ Deployment successful!
   ```

### Passo 13: Acessar seu App

Verá um link tipo:
```
https://seu-projeto-abc123.vercel.app
```

**Clique nele!** Seu app está ao vivo! 🚀

---

## Resumo Visual

```
Seu Computador
   ↓ (git push)
GitHub (repositório na nuvem)
   ↓ (Vercel lê daqui)
Vercel (deploy automático)
   ↓ (usuários acessam)
https://seu-projeto.vercel.app ✅
```

---

## Se Algo Deu Errado?

### Erro: "fatal: remote origin already exists"
**Solução:**
```
git remote remove origin
```
Depois repita o Passo 7

### Erro: "Authentication failed"
**Solução:**
- Você usou a senha errada
- Gere um novo Personal Access Token em https://github.com/settings/tokens
- Tente novamente com o novo token

### Vercel mostra erro "Module not found"
**Solução:**
1. No Vercel, vá em **Settings** → **Environment Variables**
2. Verifique se `VIDIQ_API_KEY` está lá
3. Clique **"Redeploy"** para tentar novamente

### App funciona local mas não no Vercel
**Solução:**
1. Verifique que a variável `VIDIQ_API_KEY` está configurada
2. Verifique que o arquivo `vercel.json` está no repositório
3. Verifique que `package.json` tem todas as dependências

---

## Pronto! 🎉

Você agora tem:
- ✅ Código no GitHub (versionado, seguro)
- ✅ App ao vivo no Vercel (acessível por qualquer um)
- ✅ Deploy automático (toda vez que faz `git push`, Vercel atualiza)

**Próximas buscas no app vão já estar em produção!**

---

## Dicas Extras

### Atualizar o App depois (depois que estiver tudo funcionando)

Quando quiser fazer mudanças:
1. Edite os arquivos locais
2. No terminal:
   ```
   git add .
   git commit -m "Descrição da mudança"
   git push
   ```
3. Vercel automaticamente redeploy (em 1-2 minutos)

### Ver Logs do Vercel

Se algo não está funcionando:
1. Vá em https://vercel.com/dashboard
2. Clique no seu projeto
3. Vá em **"Deployments"**
4. Clique no último deploy
5. Vá em **"Logs"** para ver erros

---

**Dúvidas? Siga este guia passo a passo que funciona!** 💪
