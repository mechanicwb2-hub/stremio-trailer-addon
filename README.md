# Stremio Trailer Add-on - Vercel Deploy

## 📁 Ficheiros incluídos (para GitHub):

1. **api/index.js** - Código principal do add-on
2. **vercel.json** - Configuração do Vercel
3. **package.json** - Dependências

## 🚀 Como usar:

### Opção 1: Upload Manual no GitHub (Mais Fácil)

1. Cria repositório no GitHub (público)
2. Upload cada ficheiro:
   - `Add file` → `Create new file` → `api/index.js` → cola conteúdo → Commit
   - `Add file` → `Create new file` → `vercel.json` → cola conteúdo → Commit
   - `Add file` → `Create new file` → `package.json` → cola conteúdo → Commit

### Opção 2: Git CLI

```bash
# Clone o teu repositório
git clone https://github.com/TEU-USERNAME/stremio-trailer-addon.git
cd stremio-trailer-addon

# Copia estes 3 ficheiros para a pasta
# (mantém a estrutura: api/index.js tem que estar dentro da pasta api/)

# Commit e push
git add .
git commit -m "Add Vercel serverless addon"
git push origin main
```

## 🔗 Deploy no Vercel:

1. vercel.com → Sign up with GitHub
2. New Project → Import "stremio-trailer-addon"
3. Deploy (sem mudar nada)
4. Settings → Environment Variables:
   - `TMDB_API_KEY` = tua chave TMDB
5. Deployments → Redeploy

## 🎬 Instalar no Stremio:

URL: `https://teu-projeto.vercel.app/manifest.json`

---

## 🔑 Obter TMDB API Key:

1. themoviedb.org → criar conta
2. Settings → API → Request API Key → Developer
3. Copia "API Key (v3 auth)"
