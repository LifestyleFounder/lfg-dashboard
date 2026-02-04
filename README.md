# LFG Content Intelligence Dashboard

YouTube + Instagram analytics and content research tool for Dan Harrison.

## Quick Start

1. Open `index.html` in your browser
2. That's it — the dashboard works locally with no server needed

## Features

### 📊 Your Analytics
- **YouTube**: Connect your API key + Channel ID for automatic stats
- **Instagram**: Manual weekly snapshots (Meta API requires business account setup)

### 👀 Creator Watch
Pre-loaded with 8 creators from your Instagram strategy:
- **Models**: Alex Hormozi, Frank Kern
- **Competitors**: Stu McLaren, Russ Ruffino, Anthony Bradley
- **Collab Opportunities**: Mike Crowson, Matt Leitz, Chris Duncan

Add more creators anytime. If they have a YouTube channel ID, the dashboard will track their videos.

### 🎯 Outlier Detector
Finds videos that significantly outperformed the creator's average (3x+ by default). These are proven concepts worth studying and adapting.

Adjust the threshold:
- 2x = mild outperformers
- 3x = solid outliers (default)
- 5x = strong signals
- 10x = viral hits

### 📡 Trend Radar
Trending topics in coaching/Skool/business space. Currently static — future version will pull live data.

## Setup YouTube API

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create a new project (or use existing)
3. Enable "YouTube Data API v3"
4. Create an API key
5. Paste into the dashboard

**Find your Channel ID:**
- Go to youtube.com/account_advanced
- Copy the Channel ID (starts with UC...)

## Data Storage

All data is stored in browser localStorage. To export:
- Open browser console
- Run: `localStorage.getItem('lfg-dashboard')`

## Files

```
dashboard/
├── index.html    # Main dashboard
├── styles.css    # Styling (LFG brand colors)
├── app.js        # Application logic
├── README.md     # This file
└── data/         # (reserved for future data files)
```

## Future Enhancements

- [ ] Instagram API integration (needs business account + FB Page)
- [ ] Live trend detection via API
- [ ] Email/notification when outliers detected
- [ ] Historical charts for growth over time
- [ ] Export reports as PDF
- [ ] Competitor upload alerts

---

Built by Geeves 🎯
