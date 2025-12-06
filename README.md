# 🎬 Stremio YouTube Trailers Add-on

A serverless Stremio add-on that provides **direct links to YouTube trailers** - No more buffering or broken trailer players!

> **Author:** [MechanicWB](https://github.com/mechanicwb)

## ✨ Features

- ✅ **Direct YouTube links** - Opens trailers in your browser/YouTube app
- ✅ **No buffering** - Bypasses Stremio's built-in trailer player
- ✅ **Always online** - Deployed on Vercel (serverless)
- ✅ **Free forever** - Uses TMDB's free API
- ✅ **Auto-updating** - Updates automatically via GitHub
- ✅ **Works with movies & series** - Full TMDB integration

## 🚀 Quick Install

**Just add this URL to Stremio:**

```
https://stremio-trailer-addon.vercel.app/manifest.json
```

**How to install:**
1. Open Stremio
2. Go to **Add-ons** 
3. Click the **puzzle icon** (🧩) in the top right
4. Paste the URL above
5. Click **Install**

Done! Now click any movie/series and you'll see "▶️ Watch Trailer"

## 🛠️ Deploy Your Own

Want to run your own instance? Easy!

### Prerequisites

- GitHub account
- Vercel account (free)
- TMDB API key (free)

### Step 1: Get TMDB API Key

1. Sign up at [themoviedb.org](https://www.themoviedb.org/)
2. Go to Settings → API
3. Request API Key → Choose "Developer"
4. Fill out the form (put anything reasonable)
5. Copy your "API Key (v3 auth)"

### Step 2: Deploy to Vercel

#### Option A: Deploy Button (Easiest)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR-USERNAME/stremio-trailer-addon)

#### Option B: Manual Deploy

1. **Fork/Clone this repository**

2. **Create new GitHub repository** with these files:
   ```
   stremio-trailer-addon/
   ├── api/
   │   └── index.js
   ├── vercel.json
   └── package.json
   ```

3. **Sign up on [Vercel](https://vercel.com/)** using GitHub

4. **Import your repository:**
   - Click "Add New..." → "Project"
   - Select your repository
   - Click "Import"

5. **Configure Environment Variables:**
   - Go to Settings → Environment Variables
   - Add: `TMDB_API_KEY` = your TMDB API key
   - Select: Production, Preview, Development

6. **Redeploy:**
   - Go to Deployments
   - Click "..." → "Redeploy"

7. **Get your URL:**
   ```
   https://your-project.vercel.app/manifest.json
   ```

8. **Install in Stremio** using your URL!

## 📁 Project Structure

```
├── api/
│   └── index.js          # Serverless function (main logic)
├── vercel.json           # Vercel configuration
├── package.json          # Dependencies
└── README.md             # This file
```

## 🔧 How It Works

1. You click "Watch Trailer" in Stremio
2. Add-on receives the IMDB ID
3. Queries TMDB API to find the movie/series
4. Gets the official YouTube trailer
5. Returns a link that opens in your browser

**Key difference:** Uses `externalUrl` instead of `url` to force external opening, preventing the "Video is not supported" error.

## 🎨 Customization

### Change Images

Edit `api/index.js` and modify the manifest:

```javascript
const manifest = {
    name: 'Your Addon Name',
    description: 'Your description',
    background: 'https://your-background-image-url.jpg',  // 1920x1080
    logo: 'https://your-logo-url.png',                    // 512x512
    version: '1.0.1'
};
```

**Recommended image sources:**
- Backgrounds: [Unsplash](https://unsplash.com/) (1920x1080)
- Logos: [Flaticon](https://www.flaticon.com/) (512x512 PNG)

### Change Name/Description

Update the `manifest` object in `api/index.js`:

```javascript
name: 'My Custom Name',
description: 'My custom description'
```

Commit to GitHub → Vercel auto-deploys → Changes appear in Stremio after reinstalling!

## 🐛 Troubleshooting

### "Failed to get addon manifest"
- Check if your URL is correct and ends with `/manifest.json`
- Test the URL in your browser - should show JSON

### "Video is not supported"
- Make sure you're using the latest version (check `version` in manifest)
- The fix uses `externalUrl` instead of `url`

### Trailers not appearing
- Verify TMDB_API_KEY is set in Vercel Environment Variables
- Redeploy after adding the API key
- Some movies/series may not have trailers available

### Add-on not updating
- Uninstall and reinstall in Stremio
- Clear Stremio cache

## 📊 Dependencies

- [stremio-addon-sdk](https://github.com/Stremio/stremio-addon-sdk) - Stremio add-on framework
- [node-fetch](https://github.com/node-fetch/node-fetch) - HTTP requests
- [TMDB API](https://www.themoviedb.org/documentation/api) - Movie/series metadata

## 🆓 Cost

**100% Free:**
- ✅ Vercel hosting (unlimited serverless functions)
- ✅ TMDB API (free tier: 1000+ requests/day)
- ✅ No credit card required

## 🙏 Credits

- **Created by:** [MechanicWB](https://github.com/mechanicwb)
- **Powered by:** [Vercel](https://vercel.com/), [TMDB](https://www.themoviedb.org/)
- **Framework:** [Stremio Add-on SDK](https://github.com/Stremio/stremio-addon-sdk)

## 📝 License

MIT License - Feel free to use, modify, and distribute!

## 🤝 Contributing

Found a bug? Have a feature request? 

1. Open an issue
2. Submit a pull request
3. Share on [r/StremioAddons](https://reddit.com/r/StremioAddons)

## ⭐ Support

If this helped you, consider:
- ⭐ Starring this repo
- 🔄 Sharing with others
- 💬 Leaving feedback

---

**Made with ❤️ for the Stremio community**

[Report Issue](https://github.com/YOUR-USERNAME/stremio-trailer-addon/issues) • [View on Vercel](https://vercel.com)
