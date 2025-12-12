const { getRouter } = require('stremio-addon-sdk');
const fetch = require('node-fetch');

const TMDB_API_KEY = process.env.TMDB_API_KEY || '';

const manifest = {
    id: 'com.trailers.youtube.addon',
    version: '1.0.1',
    name: 'YouTube Trailers',
    description: 'Direct links to YouTube trailers - No buffering!',
    resources: ['stream'],
    types: ['movie', 'series'],
    catalogs: [],
    idPrefixes: ['tt'],
    background: 'https://images.unsplash.com/photo-1574267432644-f05f41dc1799?w=1920&h=1080&fit=crop',
    logo: 'https://cdn-icons-png.flaticon.com/512/1384/1384060.png',
    // Certificação Stremio Addons
    stremioAddonsConfig: {
        issuer: 'https://stremio-addons.net',
        signature: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..pB-EC9zlZduz6a-zU0OxsQ.R_CydhOhJx12LAA6b5K_c7GxYcxMu0e1FlAGC9elpvhCZJPtVMwdsTEnbMXROVZL9FNBERr9Z2kF45wFQN7uLN5fHXV3MmSqGmO2hHnic-oc3vcbzQ0rl2LUmo8uTXM8.1uu_6hsolyXULB6kmaghdQ'
    }
};

async function getTMDBInfo(imdbId, type) {
    if (!TMDB_API_KEY) return null;
    
    try {
        const url = `https://api.themoviedb.org/3/find/${imdbId}?api_key=${TMDB_API_KEY}&external_source=imdb_id`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (type === 'movie' && data.movie_results && data.movie_results.length > 0) {
            return { id: data.movie_results[0].id, name: data.movie_results[0].title, type: 'movie' };
        } else if (type === 'series' && data.tv_results && data.tv_results.length > 0) {
            return { id: data.tv_results[0].id, name: data.tv_results[0].name, type: 'tv' };
        }
        
        return null;
    } catch (error) {
        console.error('Error getting TMDB info:', error);
        return null;
    }
}

async function getTMDBTrailer(tmdbId, mediaType) {
    if (!TMDB_API_KEY) return null;
    
    try {
        const url = `https://api.themoviedb.org/3/${mediaType}/${tmdbId}/videos?api_key=${TMDB_API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        
        const trailer = data.results.find(v => 
            v.type === 'Trailer' && 
            v.site === 'YouTube' && 
            (v.iso_639_1 === 'en' || v.iso_639_1 === 'pt')
        ) || data.results.find(v => v.type === 'Trailer' && v.site === 'YouTube');
        
        if (trailer) {
            return `https://www.youtube.com/watch?v=${trailer.key}`;
        }
        
        return null;
    } catch (error) {
        console.error('Error getting TMDB trailer:', error);
        return null;
    }
}

const addonInterface = {
    manifest,
    get: async (resource, type, id) => {
        if (resource === 'stream') {
            const imdbId = id.split(':')[0];
            
            try {
                const tmdbInfo = await getTMDBInfo(imdbId, type);
                
                if (!tmdbInfo) {
                    return {
                        streams: [{
                            name: '🎬 Search Trailer on YouTube',
                            title: 'Search for trailer',
                            externalUrl: `https://www.youtube.com/results?search_query=${imdbId}+official+trailer`,
                            behaviorHints: { 
                                notWebReady: true,
                                bingeGroup: 'trailer'
                            }
                        }]
                    };
                }
                
                const trailerUrl = await getTMDBTrailer(tmdbInfo.id, tmdbInfo.type);
                
                if (trailerUrl) {
                    return {
                        streams: [{
                            name: '▶️ Watch Trailer',
                            title: `${tmdbInfo.name} - Official Trailer`,
                            externalUrl: trailerUrl,
                            behaviorHints: { 
                                notWebReady: true,
                                bingeGroup: 'trailer'
                            }
                        }]
                    };
                } else {
                    return {
                        streams: [{
                            name: '🔍 Search Trailer',
                            title: `Search for "${tmdbInfo.name}" trailer`,
                            externalUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(tmdbInfo.name + ' official trailer')}`,
                            behaviorHints: { 
                                notWebReady: true,
                                bingeGroup: 'trailer'
                            }
                        }]
                    };
                }
            } catch (error) {
                console.error('Error:', error);
                return { streams: [] };
            }
        }
        return { streams: [] };
    }
};

const router = getRouter(addonInterface);

module.exports = (req, res) => {
    router(req, res, () => {
        res.statusCode = 404;
        res.end();
    });
};
