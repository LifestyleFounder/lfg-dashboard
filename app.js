/**
 * LFG Content Intelligence Dashboard
 * Premium Version - Feb 4, 2026
 * YouTube + Instagram Analytics & Research
 */

// ============================================
// PRE-POPULATED DATA (No API needed for core features)
// ============================================

const INITIAL_STATE = {
    version: 4,
    config: {
        ytApiKey: null,
        ytChannelId: 'UCsaposjX2IR0HY3YhrkUnMg',
        igHandle: 'thedanharrison',
    },
    youtube: {
        channel: {
            statistics: {
                subscriberCount: '625',
                viewCount: '36000',
                videoCount: '45'
            }
        },
        videos: [],
        lastFetch: '2026-02-04',
    },
    instagram: {
        profile: {
            handle: 'thedanharrison',
            name: 'Dan Harrison • Business Coach',
            bio: 'Installing AI into my business & documenting everything | 3x Skool Games 🏆',
            followers: 20856,
            following: 3257,
            posts: 119
        },
        snapshots: [
            {
                date: '2026-02-04',
                followers: 20856,
                following: 3257,
                posts: 119,
                avgLikes: 182,
                avgComments: 24,
                notes: 'Initial scrape via Apify. 0 Reels, 11 Images, 9 Carousels.'
            }
        ],
        topPosts: [
            { caption: '#godisgood (wedding)', engagement: 1191, type: 'Carousel', multiple: 5.8 },
            { caption: 'Coach/creator/expert CTA', engagement: 637, type: 'Image', multiple: 3.1 },
            { caption: '10 year anniversary', engagement: 312, type: 'Image', multiple: 1.5 }
        ]
    },
    creators: [
        {
            id: '1',
            name: 'Alex Hormozi',
            category: 'model',
            igHandle: '@hormozi',
            avgEngagement: 14758,
            topPost: '45,326 (3.1x) - $100M Money Models launch',
            notes: 'Content king. Big announcements work.'
        },
        {
            id: '2',
            name: 'Greg Isenberg',
            category: 'model',
            igHandle: '@gregisenberg',
            avgEngagement: 11340,
            topPost: '125,772 (11.1x) - "Google" hot take 🔥',
            notes: 'MASSIVE outlier. Study this hook format.'
        },
        {
            id: '3',
            name: 'Matt Gray',
            category: 'model',
            igHandle: '@matthgray',
            avgEngagement: 817,
            topPost: '2,079 (2.5x) - Freedom post',
            notes: 'Founder brand. Systems + lifestyle.'
        },
        {
            id: '4',
            name: 'Cormac',
            category: 'style-inspiration',
            igHandle: '@buildwithcormac',
            avgEngagement: 11070,
            topPost: '86,658 (7.8x) - "Peak life" 🔥',
            notes: 'Build in public. 22K from 67 posts. Study his format.'
        },
        {
            id: '5',
            name: 'Stu McLaren',
            category: 'competitor',
            igHandle: '@stumclaren',
            avgEngagement: 163,
            topPost: '602 (3.7x) - Re-intro post',
            notes: 'Membership expert. Re-intro posts work.'
        },
        {
            id: '6',
            name: 'Mike Crowson',
            category: 'collab',
            igHandle: '@mike_crowson',
            avgEngagement: 539,
            topPost: '5,286 (9.8x) - Wedding 🔥',
            notes: 'Personal milestones crush it.'
        },
        {
            id: '7',
            name: 'Matt Leitz',
            category: 'collab',
            igHandle: '@mattleitzofficial',
            avgEngagement: 305,
            topPost: '1,049 (3.4x) - Stop Watching',
            notes: 'Action-oriented hooks work.'
        },
        {
            id: '8',
            name: 'Russ Ruffino',
            category: 'competitor',
            igHandle: '@russruffino',
            avgEngagement: 9,
            topPost: '87 (9.7x)',
            notes: 'Low IG engagement. Not a focus.'
        }
    ],
    outliers: [
        {
            id: '1',
            platform: 'instagram',
            creatorName: 'Greg Isenberg',
            creatorHandle: '@gregisenberg',
            postUrl: 'https://www.instagram.com/gregisenberg/',
            caption: 'our kids will think we were crazy for using Google for 20 years...',
            engagement: 125772,
            avgEngagement: 11340,
            multiple: 11.1,
            type: '🔥 Hot Take / AI Future',
            detectedAt: '2026-02-04',
            insight: 'Contrarian future-looking hook. Makes people feel smart for agreeing.'
        },
        {
            id: '2',
            platform: 'instagram',
            creatorName: 'Cormac',
            creatorHandle: '@buildwithcormac',
            postUrl: 'https://www.instagram.com/buildwithcormac/',
            caption: 'peak life for a man in his 20s...',
            engagement: 86658,
            avgEngagement: 11070,
            multiple: 7.8,
            type: '✨ Aspirational Lifestyle',
            detectedAt: '2026-02-04',
            insight: 'Pure aspiration. Shows the life, not tactics.'
        },
        {
            id: '3',
            platform: 'instagram',
            creatorName: 'Alex Hormozi',
            creatorHandle: '@hormozi',
            postUrl: 'https://www.instagram.com/p/DLm63qQpxvw/',
            caption: '$100M Money Models - Book Announcement',
            engagement: 45326,
            avgEngagement: 14758,
            multiple: 3.1,
            type: '📢 Big Announcement',
            detectedAt: '2026-02-04',
            insight: 'Create events, not just posts. Announcements spike.'
        },
        {
            id: '4',
            platform: 'instagram',
            creatorName: 'Mike Crowson',
            creatorHandle: '@mike_crowson',
            postUrl: 'https://www.instagram.com/mike_crowson/',
            caption: 'Mr. and Mrs. Crowson 💍',
            engagement: 5286,
            avgEngagement: 539,
            multiple: 9.8,
            type: '💒 Personal Milestone',
            detectedAt: '2026-02-04',
            insight: 'Weddings, anniversaries, big life moments = 5-10x engagement.'
        },
        {
            id: '5',
            platform: 'instagram',
            creatorName: 'Dan Harrison (You)',
            creatorHandle: '@thedanharrison',
            postUrl: 'https://www.instagram.com/p/DIfL4yRz3Tk/',
            caption: '#godisgood - Wedding/Milestone',
            engagement: 1191,
            avgEngagement: 206,
            multiple: 5.8,
            type: '💒 Personal Milestone',
            detectedAt: '2026-02-04',
            insight: 'YOUR top post is also a personal milestone. Pattern confirmed.'
        }
    ],
    trends: [
        {
            topic: '"Our kids will think we were crazy for..."',
            heat: 'hot',
            examples: 'Using Google, manual research, no AI',
            action: 'Film a hot take using this hook format'
        },
        {
            topic: 'AI replacing traditional workflows',
            heat: 'hot',
            examples: 'Search, content creation, research',
            action: 'Document your AI installation journey'
        },
        {
            topic: 'Build in public / Day X',
            heat: 'hot',
            examples: '@buildwithcormac "day 3,681 of building"',
            action: 'Start a "installing AI" documentation series'
        },
        {
            topic: 'Personal milestones',
            heat: 'consistent',
            examples: 'Weddings, anniversaries, big moments',
            action: 'Don\'t skip life moments - they perform 5-10x'
        },
        {
            topic: 'Big announcements as events',
            heat: 'consistent',
            examples: 'Launches, reveals, major updates',
            action: 'Frame the 30-Day Challenge launch as an event'
        }
    ],
    contentIdeas: [
        {
            hook: 'Our kids will think we were crazy',
            angle: 'for manually scrolling Instagram to find what content works',
            status: 'ready',
            basedOn: 'Greg Isenberg outlier (11x)'
        },
        {
            hook: 'I built this while you were sleeping',
            angle: 'Content intelligence system that scrapes competitors',
            status: 'ready',
            basedOn: 'AI documentation series'
        },
        {
            hook: 'I stopped doing sales calls',
            angle: 'Built a community that sells for me instead',
            status: 'ready',
            basedOn: 'Core positioning'
        },
        {
            hook: 'AI didn\'t take my job',
            angle: 'It gave me my life back - now AI does 80% of the work',
            status: 'ready',
            basedOn: 'AI documentation series'
        },
        {
            hook: 'The coaches who survive AI',
            angle: 'Sell belonging, not information',
            status: 'ready',
            basedOn: 'Strategic conversation Feb 4'
        }
    ],
    lastUpdated: '2026-02-04T21:30:00Z'
};

// ============================================
// STATE MANAGEMENT
// ============================================

let state = JSON.parse(JSON.stringify(INITIAL_STATE));

function loadState() {
    const saved = localStorage.getItem('lfg-dashboard-v4');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            // Merge saved data with initial state (keeps new fields)
            state = { ...INITIAL_STATE, ...parsed };
        } catch (e) {
            console.log('Error loading state, using defaults');
            state = JSON.parse(JSON.stringify(INITIAL_STATE));
        }
    }
    updateLastUpdated();
}

function saveState() {
    localStorage.setItem('lfg-dashboard-v4', JSON.stringify(state));
    updateLastUpdated();
}

function resetToDefaults() {
    if (confirm('Reset all data to defaults? This will clear any custom settings.')) {
        localStorage.removeItem('lfg-dashboard-v4');
        state = JSON.parse(JSON.stringify(INITIAL_STATE));
        renderAll();
        showToast('Reset to defaults');
    }
}

function updateLastUpdated() {
    const el = document.getElementById('lastUpdated');
    if (el) {
        const now = new Date();
        el.textContent = `Last updated: ${now.toLocaleTimeString()}`;
    }
}

// ============================================
// UTILITY FUNCTIONS  
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
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function getInitials(name) {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
}

function getCategoryColor(category) {
    const colors = {
        'model': '#4CAF50',
        'competitor': '#FF9800', 
        'collab': '#2196F3',
        'style-inspiration': '#9C27B0'
    };
    return colors[category] || '#666';
}

function getCategoryLabel(category) {
    const labels = {
        'model': '📚 Model',
        'competitor': '🎯 Competitor',
        'collab': '🤝 Collab',
        'style-inspiration': '✨ Style Inspo'
    };
    return labels[category] || category;
}

function showToast(message) {
    const container = document.getElementById('toasts');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// ============================================
// RENDER FUNCTIONS
// ============================================

function renderAll() {
    renderOverview();
    renderYouTube();
    renderInstagram();
    renderCreators();
    renderOutliers();
    renderTrends();
    renderContentIdeas();
}

function renderOverview() {
    // YouTube stats
    if (state.youtube?.channel?.statistics) {
        const stats = state.youtube.channel.statistics;
        const ytSubs = document.getElementById('ytSubs');
        const ytViews = document.getElementById('ytViews');
        if (ytSubs) ytSubs.textContent = formatNumber(stats.subscriberCount);
        if (ytViews) ytViews.textContent = formatNumber(stats.viewCount);
    }
    
    // Instagram stats
    if (state.instagram?.profile) {
        const profile = state.instagram.profile;
        const igFollowers = document.getElementById('igFollowers');
        if (igFollowers) igFollowers.textContent = formatNumber(profile.followers);
        
        // Engagement rate
        const latest = state.instagram.snapshots?.[state.instagram.snapshots.length - 1];
        if (latest && latest.followers && latest.avgLikes) {
            const rate = ((latest.avgLikes / latest.followers) * 100).toFixed(2);
            const igEngagement = document.getElementById('igEngagement');
            if (igEngagement) igEngagement.textContent = rate + '%';
        }
    }
    
    renderCreatorSummary();
    renderTopOutliers();
    renderTopTrends();
}

function renderCreatorSummary() {
    const container = document.getElementById('creatorSummary');
    if (!container) return;
    
    container.innerHTML = state.creators.map(c => `
        <div class="creator-pill" style="border-left: 3px solid ${getCategoryColor(c.category)}">
            <div class="creator-pill-avatar">${getInitials(c.name)}</div>
            <span>${c.name}</span>
            ${c.topPost?.includes('🔥') ? '<span class="fire">🔥</span>' : ''}
        </div>
    `).join('');
}

function renderTopOutliers() {
    const container = document.getElementById('topOutliers');
    if (!container) return;
    
    if (!state.outliers || state.outliers.length === 0) {
        container.innerHTML = '<div class="empty-state"><p>No outliers yet</p></div>';
        return;
    }
    
    container.innerHTML = state.outliers.slice(0, 4).map(o => `
        <div class="outlier-mini">
            <div class="outlier-mini-header">
                <span class="outlier-mini-creator">${o.creatorName}</span>
                <span class="outlier-mini-multiple">${o.multiple}x</span>
            </div>
            <div class="outlier-mini-caption">${o.caption.substring(0, 50)}...</div>
            <div class="outlier-mini-type">${o.type}</div>
        </div>
    `).join('');
}

function renderTopTrends() {
    const container = document.getElementById('topTrends');
    if (!container) return;
    
    if (!state.trends || state.trends.length === 0) {
        container.innerHTML = '<div class="empty-state"><p>No trends yet</p></div>';
        return;
    }
    
    container.innerHTML = state.trends.slice(0, 4).map(t => `
        <div class="trend-mini">
            <span class="trend-heat-icon">${t.heat === 'hot' ? '🔥' : '📈'}</span>
            <span class="trend-topic">${t.topic}</span>
        </div>
    `).join('');
}

function renderYouTube() {
    const setup = document.getElementById('ytSetup');
    const dashboard = document.getElementById('ytDashboard');
    
    if (!setup || !dashboard) return;
    
    // Always show dashboard with pre-populated data
    setup.classList.add('hidden');
    dashboard.classList.remove('hidden');
    
    if (state.youtube?.channel?.statistics) {
        const stats = state.youtube.channel.statistics;
        const el = (id) => document.getElementById(id);
        if (el('ytTotalSubs')) el('ytTotalSubs').textContent = formatNumber(stats.subscriberCount);
        if (el('ytTotalViews')) el('ytTotalViews').textContent = formatNumber(stats.viewCount);
        if (el('ytTotalVideos')) el('ytTotalVideos').textContent = formatNumber(stats.videoCount);
        
        const avgViews = Math.round(parseInt(stats.viewCount) / parseInt(stats.videoCount));
        if (el('ytAvgViews')) el('ytAvgViews').textContent = formatNumber(avgViews);
    }
    
    // Show API key input for live updates
    const apiSection = document.getElementById('ytApiSection');
    if (apiSection && state.config.ytApiKey) {
        document.getElementById('ytApiKey').value = '••••••••' + state.config.ytApiKey.slice(-4);
    }
}

function renderInstagram() {
    const latest = state.instagram?.snapshots?.[state.instagram.snapshots.length - 1];
    
    if (latest) {
        const el = (id) => document.getElementById(id);
        if (el('igManualFollowers')) el('igManualFollowers').textContent = formatNumber(latest.followers);
        if (el('igManualFollowing')) el('igManualFollowing').textContent = formatNumber(latest.following);
        if (el('igManualPosts')) el('igManualPosts').textContent = formatNumber(latest.posts);
        if (el('igManualLikes')) el('igManualLikes').textContent = formatNumber(latest.avgLikes);
    }
    
    renderInstagramHistory();
    renderInstagramTopPosts();
}

function renderInstagramHistory() {
    const tbody = document.getElementById('igHistoryBody');
    if (!tbody) return;
    
    if (!state.instagram?.snapshots || state.instagram.snapshots.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="empty">No data yet</td></tr>';
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

function renderInstagramTopPosts() {
    const container = document.getElementById('igTopPosts');
    if (!container || !state.instagram?.topPosts) return;
    
    container.innerHTML = state.instagram.topPosts.map(p => `
        <div class="top-post-card">
            <div class="top-post-engagement">${formatNumber(p.engagement)}</div>
            <div class="top-post-multiple">${p.multiple}x avg</div>
            <div class="top-post-caption">${p.caption}</div>
            <div class="top-post-type">${p.type}</div>
        </div>
    `).join('');
}

function renderCreators() {
    const container = document.getElementById('creatorGrid');
    if (!container) return;
    
    if (!state.creators || state.creators.length === 0) {
        container.innerHTML = '<div class="empty-state"><p>No creators tracked</p></div>';
        return;
    }
    
    container.innerHTML = state.creators.map(c => `
        <div class="creator-card" style="border-top: 3px solid ${getCategoryColor(c.category)}">
            <div class="creator-card-header">
                <div class="creator-avatar">${getInitials(c.name)}</div>
                <div class="creator-info">
                    <div class="creator-name">${c.name}</div>
                    <a href="https://instagram.com/${c.igHandle?.replace('@', '')}" target="_blank" class="creator-handle">${c.igHandle}</a>
                </div>
                <div class="creator-category">${getCategoryLabel(c.category)}</div>
            </div>
            <div class="creator-stats">
                <div class="creator-stat">
                    <span class="stat-label">Avg Engagement</span>
                    <span class="stat-value">${formatNumber(c.avgEngagement)}</span>
                </div>
                <div class="creator-stat">
                    <span class="stat-label">Top Post</span>
                    <span class="stat-value">${c.topPost || '--'}</span>
                </div>
            </div>
            <div class="creator-notes">${c.notes || ''}</div>
        </div>
    `).join('');
}

function renderOutliers() {
    const container = document.getElementById('outlierGrid');
    if (!container) return;
    
    if (!state.outliers || state.outliers.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <h3>No outliers detected</h3>
                <p>Run weekly scrapes to detect high-performing content.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = state.outliers.map(o => `
        <div class="outlier-card">
            <div class="outlier-header">
                <span class="outlier-creator">📸 ${o.creatorName}</span>
                <span class="outlier-multiple">${o.multiple}x avg</span>
            </div>
            <a href="${o.postUrl}" target="_blank" class="outlier-caption">"${o.caption}"</a>
            <div class="outlier-type">${o.type}</div>
            <div class="outlier-stats">
                <span>📊 ${formatNumber(o.engagement)} engagement</span>
                <span>👤 Avg: ${formatNumber(o.avgEngagement)}</span>
                <span>📅 ${o.detectedAt}</span>
            </div>
            <div class="outlier-insight">💡 ${o.insight}</div>
        </div>
    `).join('');
}

function renderTrends() {
    const container = document.getElementById('trendsList');
    if (!container) return;
    
    if (!state.trends || state.trends.length === 0) {
        container.innerHTML = '<div class="empty-state"><p>No trends tracked</p></div>';
        return;
    }
    
    container.innerHTML = state.trends.map(t => `
        <div class="trend-card ${t.heat}">
            <div class="trend-header">
                <span class="trend-heat-badge">${t.heat === 'hot' ? '🔥 HOT' : '📈 RISING'}</span>
            </div>
            <div class="trend-topic">${t.topic}</div>
            <div class="trend-examples"><strong>Examples:</strong> ${t.examples}</div>
            <div class="trend-action"><strong>Action:</strong> ${t.action}</div>
        </div>
    `).join('');
    
    // Also update the sidebar/overview version
    const hotTrends = document.getElementById('hotTrends');
    if (hotTrends) {
        hotTrends.innerHTML = state.trends.filter(t => t.heat === 'hot').map(t => 
            `<span class="trend-tag hot">${t.topic}</span>`
        ).join('');
    }
}

function renderContentIdeas() {
    const container = document.getElementById('contentIdeasList');
    if (!container) return;
    
    if (!state.contentIdeas || state.contentIdeas.length === 0) {
        container.innerHTML = '<div class="empty-state"><p>No content ideas yet</p></div>';
        return;
    }
    
    container.innerHTML = state.contentIdeas.map((idea, i) => `
        <div class="idea-card">
            <div class="idea-number">#${i + 1}</div>
            <div class="idea-content">
                <div class="idea-hook">"${idea.hook}"</div>
                <div class="idea-angle">${idea.angle}</div>
                <div class="idea-based-on">Based on: ${idea.basedOn}</div>
            </div>
            <div class="idea-status ${idea.status}">${idea.status === 'ready' ? '✅ Ready to film' : '📝 Draft'}</div>
        </div>
    `).join('');
}

// ============================================
// TAB NAVIGATION
// ============================================

function initTabs() {
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.dataset.tab;
            switchTab(tabId);
        });
    });
}

function switchTab(tabId) {
    // Update tab buttons
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    const activeTab = document.querySelector(`.tab[data-tab="${tabId}"]`);
    if (activeTab) activeTab.classList.add('active');
    
    // Update content
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    const activeContent = document.getElementById(tabId);
    if (activeContent) activeContent.classList.add('active');
}

// ============================================
// ACTIONS
// ============================================

function refreshAll() {
    showToast('Refreshing data...');
    renderAll();
    showToast('Data refreshed!');
}

async function saveYouTubeConfig() {
    const apiKey = document.getElementById('ytApiKey')?.value?.trim();
    const channelId = document.getElementById('ytChannelId')?.value?.trim();
    
    if (apiKey && !apiKey.includes('•')) {
        state.config.ytApiKey = apiKey;
    }
    if (channelId) {
        state.config.ytChannelId = channelId;
    }
    
    saveState();
    showToast('YouTube config saved!');
    
    // Try to fetch live data if API key provided
    if (state.config.ytApiKey && state.config.ytChannelId) {
        await fetchYouTubeData();
    }
}

async function fetchYouTubeData() {
    if (!state.config.ytApiKey || !state.config.ytChannelId) return;
    
    showToast('Fetching YouTube data...');
    
    try {
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${state.config.ytChannelId}&key=${state.config.ytApiKey}`
        );
        const data = await response.json();
        
        if (data.items && data.items[0]) {
            state.youtube.channel = data.items[0];
            state.youtube.lastFetch = new Date().toISOString();
            saveState();
            renderAll();
            showToast('YouTube data updated!');
        }
    } catch (e) {
        console.error('YouTube fetch error:', e);
        showToast('Error fetching YouTube data');
    }
}

function addInstagramSnapshot() {
    const followers = prompt('Enter current followers:');
    const avgLikes = prompt('Enter average likes per post:');
    
    if (followers && avgLikes) {
        state.instagram.snapshots.push({
            date: new Date().toISOString().split('T')[0],
            followers: parseInt(followers),
            following: state.instagram.profile.following,
            posts: state.instagram.profile.posts,
            avgLikes: parseInt(avgLikes),
            avgComments: 0,
            notes: 'Manual entry'
        });
        saveState();
        renderInstagram();
        showToast('Snapshot added!');
    }
}

// ============================================
// MODAL HANDLING
// ============================================

function openModal(modalId) {
    const modal = document.getElementById(modalId || 'modalOverlay');
    if (modal) modal.classList.add('active');
}

function closeModal() {
    document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
}

// ============================================
// INITIALIZE
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    loadState();
    initTabs();
    renderAll();
    
    // Close modals on overlay click
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay')) {
                closeModal();
            }
        });
    });
    
    // Close modal on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
    
    console.log('📊 LFG Content Intelligence Dashboard loaded!');
    console.log('Data version:', state.version);
});
