# ⚡ COMECE AQUI - Deploy em 5 Minutos

## 🎯 Você só precisa fazer 3 coisas:

### 1️⃣ Execute o Script (CLIQUE 2X NISTO)

Na pasta do projeto, procure por:
```
DEPLOY_AUTOMATICO.ps1
```

**Clique 2x nele!** (Se der erro de segurança, veja a solução abaixo)

### 2️⃣ Siga as Instruções na Tela

O script vai:
- Abrir GitHub automaticamente
- Pedir você criar um repositório vazio
- Enviar seu código para lá

**Respostas rápidas:**
- Username: `iguanagelada` ✅ (já está pronto)
- Password: Gere um Token em https://github.com/settings/tokens
  - Clique **"Generate new token"**
  - Marque ☑️ repo e ☑️ workflow
  - Clique **"Generate token"**
  - **COPIE** e cole no terminal

### 3️⃣ Deploy no Vercel

Quando o script terminar, ele vai mostrar um link para Vercel.

Siga estes 5 passos lá:
1. Clique "Sign Up with GitHub"
2. Clique "New Project"
3. Selecione "detector-tendencias"
4. Adicione a variável:
   - **Name:** `VIDIQ_API_KEY`
   - **Value:** `vidiq_IHtqjNBp5uFj3i1t3Oxi_lHme6y5EU_gNvyjjs38`
5. Clique **"Deploy"** e aguarde 2 minutos

---

## 🔧 Se o Script Não Funcionar

### Erro: "não é permitido executar scripts"

1. Abra PowerShell como **Administrador**
   - Clique com direito no ícone do PowerShell → "Executar como administrador"

2. Digite:
```
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

3. Responda `S` (Sim)

4. Agora tente rodar o script novamente

### Erro: "repositório já existe"

1. Abra PowerShell na pasta do projeto
2. Digite:
```
git remote remove origin
```
3. Tente novamente

### Erro: "autenticação falhou"

- Você usou sua **senha** do GitHub (errado ❌)
- Você precisa usar um **Personal Access Token** (certo ✅)
- Gere em: https://github.com/settings/tokens

---

## ✅ Checklist

- [ ] Executei o script `DEPLOY_AUTOMATICO.ps1`
- [ ] Criei o repositório no GitHub
- [ ] Enviei o código com sucesso
- [ ] Vejo meu código em `https://github.com/iguanagelada/detector-tendencias`
- [ ] Fiz deploy no Vercel
- [ ] Acessei `https://seu-projeto.vercel.app`
- [ ] App está funcionando! 🎉

---

## 🆘 Ainda Não Funcionou?

Se o script não funcionou, faça **manualmente** (é mais fácil do que parece):

1. Abra PowerShell na pasta do projeto
2. Digite isto tudo de uma vez:

```powershell
git config --global user.name "Seu Nome"
git config --global user.email "seu-email@gmail.com"
git remote remove origin
git remote add origin https://github.com/iguanagelada/detector-tendencias.git
git branch -M main
git push -u origin main
```

Quando pedir senha → Use seu Personal Access Token

---

**Dúvidas? Leia o arquivo `GITHUB_VERCEL_GUIA.md` para explicações detalhadas!**

**Pronto para começar? Execute o script! 🚀**
