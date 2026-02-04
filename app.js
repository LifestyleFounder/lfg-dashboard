/**
 * LFG Content Intelligence Dashboard
 * YouTube + Instagram Analytics & Research
 */

// ============================================
// State Management
// ============================================

const state = {
    config: {
        ytApiKey: null,
        ytChannelId: 'UCsaposjX2IR0HY3YhrkUnMg', // @iamdanharrison
        igHandle: 'thedanharrison',
    },
    youtube: {
        channel: null,
        videos: [],
        lastFetch: null,
    },
    instagram: {
        snapshots: [],
        profile: {
            handle: 'thedanharrison',
            name: 'Dan Harrison • Business Coach',
            followers: 20856,
            following: 3257,
            posts: 119,
            bio: 'Installing AI into my business & documenting everything | 3x Skool Games 🏆'
        },
        analytics: {
            lastUpdated: '2026-02-04',
            avgLikes: 182,
            avgComments: 24,
            avgEngagement: 206,
            reels: 0,
            images: 11,
            carousels: 9
        },
        topPosts: [
            { caption: '#godisgood (wedding)', engagement: 1191, type: 'Carousel', multiple: 5.8 },
            { caption: 'Coach/creator/expert CTA', engagement: 637, type: 'Image', multiple: 3.1 },
            { caption: '10 year anniversary', engagement: 312, type: 'Image', multiple: 1.5 },
            { caption: 'Quantum Leaps 2025', engagement: 292, type: 'Carousel', multiple: 1.4 },
            { caption: 'Half a million in debt', engagement: 211, type: 'Image', multiple: 1.0 }
        ]
    },
    creators: [],
    outliers: [],
};

// Load state from localStorage
function loadState() {
    const saved = localStorage.getItem('lfg-dashboard');
    if (saved) {
        const parsed = JSON.parse(saved);
        Object.assign(state, parsed);
    }
    
    // Initialize with default creators if empty
    if (state.creators.length === 0) {
        state.creators = getDefaultCreators();
        saveState();
    }
}

// Save state to localStorage
function saveState() {
    localStorage.setItem('lfg-dashboard', JSON.stringify(state));
}

// Default creator watchlist
function getDefaultCreators() {
    return [
        {
            id: '1',
            name: 'Alex Hormozi',
            category: 'model',
            ytChannelId: 'UCo2Ld2eB0n7NqsSLPMRrYfw',
            igHandle: '@hormozi',
            notes: 'Content king. Study his hooks, thumbnails, and retention strategies.',
        },
        {
            id: '2',
            name: 'Frank Kern',
            category: 'model',
            ytChannelId: 'UCyKZswR_GHRVL2qXdJtDvNg',
            igHandle: '@frankkerinwtf',
            notes: 'OG direct response marketer. Great storytelling and positioning.',
        },
        {
            id: '3',
            name: 'Stu McLaren',
            category: 'competitor',
            ytChannelId: 'UCl4i_MaUNvDvwYPpZIpz-Gg',
            igHandle: '@stumclaren',
            notes: 'Membership/community expert. Direct competitor in the space.',
        },
        {
            id: '4',
            name: 'Russ Ruffino',
            category: 'competitor',
            ytChannelId: 'UCLdhH3yNjL6vJsRF7CWhPMA',
            igHandle: '@russruffino',
            notes: 'High-ticket coaching. Watch his positioning and offer structure.',
        },
        {
            id: '5',
            name: 'Anthony Bradley',
            category: 'competitor',
            ytChannelId: '',
            igHandle: '@iamanthonybradley',
            notes: 'Direct competitor. Similar audience and offer.',
        },
        {
            id: '6',
            name: 'Mike Crowson',
            category: 'collab',
            ytChannelId: '',
            igHandle: '@mike_crowson',
            notes: 'Potential collab opportunity.',
        },
        {
            id: '7',
            name: 'Matt Leitz',
            category: 'collab',
            ytChannelId: '',
            igHandle: '@mattleitzofficial',
            notes: 'Potential collab opportunity.',
        },
        {
            id: '8',
            name: 'Chris Duncan',
            category: 'collab',
            ytChannelId: '',
            igHandle: '@chrismduncan',
            notes: 'Potential collab opportunity.',
        },
    ];
}

// ============================================
// Tab Navigation
// ============================================

function initTabs() {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.dataset.tab;
            switchTab(tabId);
        });
    });
}

function switchTab(tabId) {
    // Update tab buttons
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelector(`.tab[data-tab="${tabId}"]`).classList.add('active');
    
    // Update tab content
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
}

// ============================================
// YouTube API
// ============================================

async function fetchYouTubeChannel(channelId) {
    if (!state.config.ytApiKey) return null;
    
    const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&id=${channelId}&key=${state.config.ytApiKey}`;
    
    try {
        const res = await fetch(url);
        const data = await res.json();
        
        if (data.items && data.items.length > 0) {
            return data.items[0];
        }
    } catch (err) {
        console.error('Error fetching YouTube channel:', err);
    }
    return null;
}

async function fetchYouTubeVideos(channelId, maxResults = 20) {
    if (!state.config.ytApiKey) return [];
    
    // First get uploads playlist ID
    const channel = await fetchYouTubeChannel(channelId);
    if (!channel) return [];
    
    const uploadsPlaylistId = channel.contentDetails?.relatedPlaylists?.uploads;
    if (!uploadsPlaylistId) {
        // Fallback: search for videos
        return fetchYouTubeVideosBySearch(channelId, maxResults);
    }
    
    // Get videos from playlist
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${uploadsPlaylistId}&maxResults=${maxResults}&key=${state.config.ytApiKey}`;
    
    try {
        const res = await fetch(url);
        const data = await res.json();
        
        if (data.items) {
            const videoIds = data.items.map(item => item.contentDetails.videoId).join(',');
            return fetchYouTubeVideoStats(videoIds);
        }
    } catch (err) {
        console.error('Error fetching YouTube videos:', err);
    }
    return [];
}

async function fetchYouTubeVideosBySearch(channelId, maxResults = 20) {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=${maxResults}&order=date&type=video&key=${state.config.ytApiKey}`;
    
    try {
        const res = await fetch(url);
        const data = await res.json();
        
        if (data.items) {
            const videoIds = data.items.map(item => item.id.videoId).join(',');
            return fetchYouTubeVideoStats(videoIds);
        }
    } catch (err) {
        console.error('Error searching YouTube videos:', err);
    }
    return [];
}

async function fetchYouTubeVideoStats(videoIds) {
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoIds}&key=${state.config.ytApiKey}`;
    
    try {
        const res = await fetch(url);
        const data = await res.json();
        return data.items || [];
    } catch (err) {
        console.error('Error fetching video stats:', err);
    }
    return [];
}

// ============================================
// Outlier Detection
// ============================================

function calculateOutliers(videos, threshold = 3) {
    if (videos.length < 5) return [];
    
    // Calculate average views
    const views = videos.map(v => parseInt(v.statistics?.viewCount || 0));
    const avgViews = views.reduce((a, b) => a + b, 0) / views.length;
    
    // Find outliers (videos with views > threshold * average)
    const outliers = videos.filter(v => {
        const viewCount = parseInt(v.statistics?.viewCount || 0);
        return viewCount > avgViews * threshold;
    }).map(v => ({
        ...v,
        multiplier: (parseInt(v.statistics?.viewCount || 0) / avgViews).toFixed(1),
        avgViews: Math.round(avgViews),
    }));
    
    return outliers.sort((a, b) => parseFloat(b.multiplier) - parseFloat(a.multiplier));
}

async function detectAllOutliers() {
    const threshold = parseInt(document.getElementById('outlierThreshold')?.value || 3);
    const outliers = [];
    
    for (const creator of state.creators) {
        if (creator.ytChannelId && state.config.ytApiKey) {
            const videos = await fetchYouTubeVideos(creator.ytChannelId, 50);
            const creatorOutliers = calculateOutliers(videos, threshold);
            
            creatorOutliers.forEach(o => {
                outliers.push({
                    ...o,
                    creatorName: creator.name,
                    creatorCategory: creator.category,
                });
            });
        }
    }
    
    state.outliers = outliers.sort((a, b) => parseFloat(b.multiplier) - parseFloat(a.multiplier));
    saveState();
    renderOutliers();
}

// ============================================
// UI Rendering
// ============================================

function renderOverview() {
    // YouTube stats
    if (state.youtube.channel) {
        const stats = state.youtube.channel.statistics;
        document.getElementById('ytSubs').textContent = formatNumber(stats.subscriberCount);
        document.getElementById('ytViews').textContent = formatNumber(stats.viewCount);
    }
    
    // Instagram stats (from latest snapshot)
    if (state.instagram.snapshots.length > 0) {
        const latest = state.instagram.snapshots[state.instagram.snapshots.length - 1];
        document.getElementById('igFollowers').textContent = formatNumber(latest.followers);
        if (latest.followers && latest.avgLikes) {
            const engagement = ((latest.avgLikes / latest.followers) * 100).toFixed(2);
            document.getElementById('igEngagement').textContent = engagement + '%';
        }
    }
    
    // Creator summary
    renderCreatorSummary();
    
    // Top outliers
    renderTopOutliers();
}

function renderCreatorSummary() {
    const container = document.getElementById('creatorSummary');
    if (!container) return;
    
    container.innerHTML = state.creators.map(c => `
        <div class="creator-pill">
            <div class="creator-pill-avatar">${getInitials(c.name)}</div>
            <span>${c.name}</span>
        </div>
    `).join('');
}

function renderTopOutliers() {
    const container = document.getElementById('topOutliers');
    if (!container) return;
    
    if (state.outliers.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <p>No outliers detected yet</p>
                <small>Add YouTube API key to start tracking</small>
            </div>
        `;
        return;
    }
    
    const top5 = state.outliers.slice(0, 5);
    container.innerHTML = top5.map(o => `
        <div class="outlier-card">
            <div class="outlier-header">
                <span class="outlier-creator">${o.creatorName}</span>
                <span class="outlier-multiplier">${o.multiplier}x</span>
            </div>
            <div class="outlier-title">${o.snippet?.title || 'Unknown'}</div>
            <div class="outlier-meta">
                <span>${formatNumber(o.statistics?.viewCount)} views</span>
                <span>Avg: ${formatNumber(o.avgViews)}</span>
            </div>
        </div>
    `).join('');
}

function renderYouTubeDashboard() {
    const setup = document.getElementById('ytSetup');
    const dashboard = document.getElementById('ytDashboard');
    
    if (state.config.ytApiKey && state.config.ytChannelId) {
        setup.classList.add('hidden');
        dashboard.classList.remove('hidden');
        
        if (state.youtube.channel) {
            const stats = state.youtube.channel.statistics;
            document.getElementById('ytTotalSubs').textContent = formatNumber(stats.subscriberCount);
            document.getElementById('ytTotalViews').textContent = formatNumber(stats.viewCount);
            document.getElementById('ytTotalVideos').textContent = formatNumber(stats.videoCount);
            
            const avgViews = Math.round(parseInt(stats.viewCount) / parseInt(stats.videoCount));
            document.getElementById('ytAvgViews').textContent = formatNumber(avgViews);
        }
        
        renderYouTubeVideos();
    } else {
        setup.classList.remove('hidden');
        dashboard.classList.add('hidden');
        
        // Pre-fill if saved
        if (state.config.ytApiKey) {
            document.getElementById('ytApiKey').value = state.config.ytApiKey;
        }
        if (state.config.ytChannelId) {
            document.getElementById('ytChannelId').value = state.config.ytChannelId;
        }
    }
}

function renderYouTubeVideos() {
    const container = document.getElementById('ytVideoList');
    if (!container || state.youtube.videos.length === 0) {
        if (container) {
            container.innerHTML = '<div class="empty-state"><p>No videos loaded yet</p></div>';
        }
        return;
    }
    
    const videos = state.youtube.videos.slice(0, 10);
    container.innerHTML = videos.map(v => `
        <div class="video-row">
            <img class="video-thumb" src="${v.snippet?.thumbnails?.medium?.url || ''}" alt="">
            <div class="video-title">${v.snippet?.title || 'Unknown'}</div>
            <div class="video-stat">
                <div class="video-stat-value">${formatNumber(v.statistics?.viewCount)}</div>
                <div class="video-stat-label">Views</div>
            </div>
            <div class="video-stat">
                <div class="video-stat-value">${formatNumber(v.statistics?.likeCount)}</div>
                <div class="video-stat-label">Likes</div>
            </div>
            <div class="video-stat">
                <div class="video-stat-value">${formatNumber(v.statistics?.commentCount)}</div>
                <div class="video-stat-label">Comments</div>
            </div>
        </div>
    `).join('');
}

function renderInstagram() {
    const latest = state.instagram.snapshots[state.instagram.snapshots.length - 1];
    
    if (latest) {
        document.getElementById('igManualFollowers').textContent = formatNumber(latest.followers);
        document.getElementById('igManualFollowing').textContent = formatNumber(latest.following);
        document.getElementById('igManualPosts').textContent = formatNumber(latest.posts);
        document.getElementById('igManualLikes').textContent = formatNumber(latest.avgLikes);
    }
    
    renderInstagramHistory();
}

function renderInstagramHistory() {
    const tbody = document.getElementById('igHistoryBody');
    if (!tbody) return;
    
    if (state.instagram.snapshots.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="empty">No data yet — add your first snapshot</td></tr>';
        return;
    }
    
    tbody.innerHTML = state.instagram.snapshots.slice().reverse().map(s => {
        const engagement = s.followers && s.avgLikes ? ((s.avgLikes / s.followers) * 100).toFixed(2) : '--';
        return `
            <tr>
                <td>${s.date}</td>
                <td>${formatNumber(s.followers)}</td>
                <td>${formatNumber(s.following)}</td>
                <td>${formatNumber(s.posts)}</td>
                <td>${formatNumber(s.avgLikes)}</td>
                <td>${engagement}%</td>
            </tr>
        `;
    }).join('');
}

function renderCreators() {
    const container = document.getElementById('creatorGrid');
    if (!container) return;
    
    if (state.creators.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <p>No creators in your watchlist</p>
                <button class="btn btn-primary" onclick="openAddCreatorModal()">Add Creator</button>
            </div>
        `;
        return;
    }
    
    container.innerHTML = state.creators.map(c => `
        <div class="creator-card">
            <div class="creator-avatar">${getInitials(c.name)}</div>
            <div class="creator-info">
                <h3>${c.name}</h3>
                <span class="category ${c.category}">${formatCategory(c.category)}</span>
                <div class="creator-handles">
                    ${c.igHandle ? `<a href="https://instagram.com/${c.igHandle.replace('@', '')}" target="_blank">${c.igHandle}</a>` : ''}
                    ${c.igHandle && c.ytChannelId ? ' · ' : ''}
                    ${c.ytChannelId ? `<a href="https://youtube.com/channel/${c.ytChannelId}" target="_blank">YouTube</a>` : ''}
                </div>
                ${c.notes ? `<p style="font-size: 12px; color: var(--sage); margin-top: 8px;">${c.notes}</p>` : ''}
            </div>
        </div>
    `).join('');
}

function renderOutliers() {
    const container = document.getElementById('outlierGrid');
    if (!container) return;
    
    if (state.outliers.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <h3>No outliers detected</h3>
                <p>Add creators to your watchlist and connect YouTube API to start detecting outliers.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = state.outliers.map(o => `
        <div class="outlier-card">
            <div class="outlier-header">
                <span class="outlier-creator">${o.creatorName}</span>
                <span class="outlier-multiplier">${o.multiplier}x avg</span>
            </div>
            <a href="https://youtube.com/watch?v=${o.id}" target="_blank" class="outlier-title">${o.snippet?.title || 'Unknown'}</a>
            <div class="outlier-meta">
                <span>📊 ${formatNumber(o.statistics?.viewCount)} views</span>
                <span>👤 Avg: ${formatNumber(o.avgViews)}</span>
                <span>📅 ${formatDate(o.snippet?.publishedAt)}</span>
            </div>
        </div>
    `).join('');
}

// ============================================
// Actions
// ============================================

async function saveYouTubeConfig() {
    const apiKey = document.getElementById('ytApiKey').value.trim();
    const channelId = document.getElementById('ytChannelId').value.trim();
    
    if (!apiKey || !channelId) {
        alert('Please enter both API Key and Channel ID');
        return;
    }
    
    state.config.ytApiKey = apiKey;
    state.config.ytChannelId = channelId;
    saveState();
    
    // Test connection
    const channel = await fetchYouTubeChannel(channelId);
    if (channel) {
        state.youtube.channel = channel;
        
        // Also fetch channel details for uploads playlist
        const detailUrl = `https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet,contentDetails&id=${channelId}&key=${apiKey}`;
        const res = await fetch(detailUrl);
        const data = await res.json();
        if (data.items?.[0]) {
            state.youtube.channel = data.items[0];
        }
        
        // Fetch videos
        state.youtube.videos = await fetchYouTubeVideos(channelId, 20);
        state.youtube.lastFetch = new Date().toISOString();
        saveState();
        
        renderYouTubeDashboard();
        renderOverview();
        updateLastUpdated();
    } else {
        alert('Could not connect to YouTube. Please check your API key and Channel ID.');
    }
}

function saveIgSnapshot() {
    const date = document.getElementById('igDate').value;
    const followers = parseInt(document.getElementById('igInputFollowers').value) || 0;
    const following = parseInt(document.getElementById('igInputFollowing').value) || 0;
    const posts = parseInt(document.getElementById('igInputPosts').value) || 0;
    const avgLikes = parseInt(document.getElementById('igInputLikes').value) || 0;
    
    if (!date || !followers) {
        alert('Please enter at least date and followers');
        return;
    }
    
    state.instagram.snapshots.push({
        date,
        followers,
        following,
        posts,
        avgLikes,
    });
    
    saveState();
    closeModal();
    renderInstagram();
    renderOverview();
}

function saveCreator() {
    const name = document.getElementById('creatorName').value.trim();
    const category = document.getElementById('creatorCategory').value;
    const ytChannelId = document.getElementById('creatorYtChannel').value.trim();
    const igHandle = document.getElementById('creatorIgHandle').value.trim();
    const notes = document.getElementById('creatorNotes').value.trim();
    
    if (!name) {
        alert('Please enter a creator name');
        return;
    }
    
    state.creators.push({
        id: Date.now().toString(),
        name,
        category,
        ytChannelId,
        igHandle,
        notes,
    });
    
    saveState();
    closeModal();
    renderCreators();
    renderCreatorSummary();
}

async function refreshAll() {
    if (state.config.ytApiKey && state.config.ytChannelId) {
        // Refresh your channel
        const detailUrl = `https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet,contentDetails&id=${state.config.ytChannelId}&key=${state.config.ytApiKey}`;
        const res = await fetch(detailUrl);
        const data = await res.json();
        if (data.items?.[0]) {
            state.youtube.channel = data.items[0];
        }
        
        state.youtube.videos = await fetchYouTubeVideos(state.config.ytChannelId, 20);
        state.youtube.lastFetch = new Date().toISOString();
        
        // Detect outliers from tracked creators
        await detectAllOutliers();
        
        saveState();
        renderAll();
        updateLastUpdated();
    }
}

function refreshTrends() {
    // In a real implementation, this would fetch trending data
    // For now, we'll keep the static trends
    alert('Trend data is currently static. In a future version, this will fetch live trending topics.');
}

// ============================================
// Modal Handling
// ============================================

function openIgMetricsModal() {
    document.getElementById('modalOverlay').classList.add('active');
    document.getElementById('igMetricsModal').classList.add('active');
    document.getElementById('igDate').value = new Date().toISOString().split('T')[0];
}

function openAddCreatorModal() {
    document.getElementById('modalOverlay').classList.add('active');
    document.getElementById('addCreatorModal').classList.add('active');
    
    // Clear form
    document.getElementById('creatorName').value = '';
    document.getElementById('creatorYtChannel').value = '';
    document.getElementById('creatorIgHandle').value = '';
    document.getElementById('creatorNotes').value = '';
}

function closeModal() {
    document.getElementById('modalOverlay').classList.remove('active');
    document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
}

// ============================================
// Utilities
// ============================================

function formatNumber(num) {
    if (!num) return '--';
    const n = parseInt(num);
    if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
    if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
    return n.toLocaleString();
}

function formatDate(dateStr) {
    if (!dateStr) return '--';
    return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
}

function formatCategory(cat) {
    const labels = {
        model: 'Model',
        competitor: 'Competitor',
        collab: 'Collab',
    };
    return labels[cat] || cat;
}

function getInitials(name) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

function updateLastUpdated() {
    const el = document.getElementById('lastUpdated');
    if (el) {
        el.textContent = 'Last updated: ' + new Date().toLocaleTimeString();
    }
}

// ============================================
// Render All
// ============================================

function renderAll() {
    renderOverview();
    renderYouTubeDashboard();
    renderInstagram();
    renderCreators();
    renderOutliers();
}

// ============================================
// Initialize
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    loadState();
    initTabs();
    renderAll();
    
    // Close modal on overlay click
    document.getElementById('modalOverlay').addEventListener('click', (e) => {
        if (e.target.id === 'modalOverlay') {
            closeModal();
        }
    });
    
    // Close modal on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
});
