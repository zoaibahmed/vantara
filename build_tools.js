const fs = require('fs');
const path = require('path');

console.log('Writing full automation and responsive app enhancements...');

// ==========================================
// 1. UPDATE server/routes/admin.js
// ==========================================
const adminRoutesPath = 'D:/music-streaming/server/routes/admin.js';
let adminRoutesCode = fs.readFileSync(adminRoutesPath, 'utf8');

if (!adminRoutesCode.includes('AutoMusicIngestService')) {
    const ingestImport = `const { runIngestion, getIngestionStatus } = require('../services/AutoMusicIngestService');\n`;
    adminRoutesCode = ingestImport + adminRoutesCode;

    const newEndpoints = `
// Automated Music Ingestion Endpoints
router.post('/auto-ingest', async (req, res) => {
    try {
        const { query, limit, genreName } = req.body;
        // Run ingestion asynchronously or return immediate confirmation
        runIngestion({
            query: query || 'trending hit songs 2026',
            limit: parseInt(limit) || 5,
            genreName: genreName || 'Pop'
        }).catch(err => console.error('[AutoIngest Error]:', err));

        sendResponse(res, 200, true, { message: 'Automated ingestion initiated successfully.' });
    } catch (error) {
        sendResponse(res, 500, false, null, error.message);
    }
});

router.get('/auto-ingest/status', (req, res) => {
    try {
        const status = getIngestionStatus();
        sendResponse(res, 200, true, status);
    } catch (error) {
        sendResponse(res, 500, false, null, error.message);
    }
});

module.exports = router;
`;
    adminRoutesCode = adminRoutesCode.replace('module.exports = router;', newEndpoints);
    fs.writeFileSync(adminRoutesPath, adminRoutesCode, 'utf8');
    console.log('Updated server/routes/admin.js with auto-ingest endpoints');
}

// ==========================================
// 2. UPDATE server/services/CronService.js
// ==========================================
const cronServicePath = 'D:/music-streaming/server/services/CronService.js';
const cronServiceCode = `const cron = require('node-cron');
const User = require('../models/User');
const Song = require('../models/Song');
const Genre = require('../models/Genre');
const { runIngestion } = require('./AutoMusicIngestService');

const initCronJobs = () => {
    // Reset daily limits at midnight
    cron.schedule('0 0 * * *', async () => {
        try {
            await User.updateMany({}, { $set: { dailyListenCount: 0, lastListenResetAt: new Date() } });
            console.log('Daily listen counts reset');
        } catch (error) {
            console.error('Error resetting daily limits:', error);
        }
    });

    // Recalculate trending songs every 4 hours
    cron.schedule('0 */4 * * *', async () => {
        try {
            console.log('Recalculating trends...');
        } catch (error) {
            console.error('Error recalculating trends:', error);
        }
    });

    // Auto-ingest new music every 6 hours automatically
    cron.schedule('0 */6 * * *', async () => {
        try {
            console.log('[Cron] Running scheduled music ingestion for global top tracks...');
            const queries = ['top hits 2026', 'trending pop music', 'top electronic dance music'];
            const randomQuery = queries[Math.floor(Math.random() * queries.length)];
            await runIngestion({ query: randomQuery, limit: 3, genreName: 'Pop' });
        } catch (error) {
            console.error('[Cron] Auto-ingestion error:', error.message);
        }
    });
};

module.exports = { initCronJobs };
`;
fs.writeFileSync(cronServicePath, cronServiceCode, 'utf8');
console.log('Updated server/services/CronService.js');

// ==========================================
// 3. CREATE client/src/hooks/useNetworkStatus.js
// ==========================================
const useNetworkStatusCode = `import { useState, useEffect } from 'react';

export const useNetworkStatus = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [isChecking, setIsChecking] = useState(false);

    const checkRealConnection = async () => {
        if (!navigator.onLine) {
            setIsOnline(false);
            return false;
        }
        setIsChecking(true);
        try {
            // Ping with cache busting
            const response = await fetch('/api/health?t=' + Date.now(), { method: 'HEAD', cache: 'no-store' });
            const online = response.ok || response.status < 500;
            setIsOnline(online);
            setIsChecking(false);
            return online;
        } catch (e) {
            // If API fetch fails, fallback to simple online flag
            setIsOnline(navigator.onLine);
            setIsChecking(false);
            return navigator.onLine;
        }
    };

    useEffect(() => {
        const handleOnline = () => checkRealConnection();
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        const interval = setInterval(checkRealConnection, 20000);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
            clearInterval(interval);
        };
    }, []);

    return { isOnline, isChecking, checkRealConnection };
};

export default useNetworkStatus;
`;
fs.writeFileSync('D:/music-streaming/client/src/hooks/useNetworkStatus.js', useNetworkStatusCode, 'utf8');
console.log('Created client/src/hooks/useNetworkStatus.js');

// ==========================================
// 4. CREATE client/src/components/UI/OfflineModal.jsx
// ==========================================
const offlineModalCode = `import React from 'react';
import { WifiOff, RefreshCw } from 'lucide-react';
import useNetworkStatus from '../../hooks/useNetworkStatus';

const OfflineModal = () => {
    const { isOnline, isChecking, checkRealConnection } = useNetworkStatus();

    if (isOnline) return null;

    return (
        <div className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6 animate-in fade-in duration-300">
            <div className="max-w-md w-full bg-dark-900 border border-red-500/20 rounded-3xl p-8 text-center shadow-2xl relative overflow-hidden">
                <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 animate-pulse">
                    <WifiOff size={40} />
                </div>
                <h2 className="text-2xl font-black text-white tracking-tighter uppercase mb-3">No Internet Connection</h2>
                <p className="text-dark-100 text-sm font-medium leading-relaxed mb-8">
                    This music streaming app requires an active internet connection to load tracks, audio streams, and artwork. Please reconnect to continue.
                </p>
                <button
                    onClick={checkRealConnection}
                    disabled={isChecking}
                    className="w-full py-4 bg-primary text-black font-black uppercase tracking-widest text-xs rounded-2xl flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20"
                >
                    <RefreshCw size={18} className={isChecking ? 'animate-spin' : ''} />
                    <span>{isChecking ? 'Checking Connection...' : 'Retry Connection'}</span>
                </button>
            </div>
        </div>
    );
};

export default OfflineModal;
`;
fs.writeFileSync('D:/music-streaming/client/src/components/UI/OfflineModal.jsx', offlineModalCode, 'utf8');
console.log('Created client/src/components/UI/OfflineModal.jsx');

// ==========================================
// 5. CREATE client/src/components/Layout/MobileBottomNav.jsx
// ==========================================
const mobileBottomNavCode = `import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, Library, Sparkles, User } from 'lucide-react';
import useAuthStore from '../../store/useAuthStore';

const MobileBottomNav = () => {
    const { isAuthenticated, openAuthModal, user } = useAuthStore();

    const navItems = [
        { icon: Home, label: 'Home', path: '/' },
        { icon: Search, label: 'Search', path: '/search' },
        { icon: Sparkles, label: 'AI DJ', path: '/ai-playlist' },
        { icon: Library, label: 'Library', path: '/library' },
        {
            icon: User,
            label: 'Profile',
            path: isAuthenticated ? '/profile' : '#auth',
            onClick: !isAuthenticated ? (e) => { e.preventDefault(); openAuthModal(); } : undefined
        }
    ];

    return (
        <nav
            className="md:hidden fixed bottom-0 left-0 right-0 z-40 h-16 border-t flex items-center justify-around px-2 backdrop-blur-xl transition-all"
            style={{ backgroundColor: 'rgba(18, 18, 18, 0.95)', borderTopColor: 'var(--border)' }}
        >
            {navItems.map((item) => (
                <NavLink
                    key={item.label}
                    to={item.path}
                    onClick={item.onClick}
                    end={item.path === '/'}
                    className={({ isActive }) =>
                        \`flex flex-col items-center justify-center w-14 h-full gap-1 transition-all \${
                            isActive && item.path !== '#auth' ? 'text-primary scale-105 font-bold' : 'text-dark-400 hover:text-white'
                        }\`
                    }
                >
                    <item.icon size={20} />
                    <span className="text-[10px] tracking-tight">{item.label}</span>
                </NavLink>
            ))}
        </nav>
    );
};

export default MobileBottomNav;
`;
fs.writeFileSync('D:/music-streaming/client/src/components/Layout/MobileBottomNav.jsx', mobileBottomNavCode, 'utf8');
console.log('Created client/src/components/Layout/MobileBottomNav.jsx');

// ==========================================
// 6. UPDATE client/src/components/Layout/MainLayout.jsx
// ==========================================
const mainLayoutCode = `import React, { useState } from 'react';
import Sidebar from './Sidebar';
import MobileBottomNav from './MobileBottomNav';
import Player from '../Player/Player';
import MiniPlayer from '../Player/MiniPlayer';
import { Outlet, Link } from 'react-router-dom';
import { Palette, Menu, X } from 'lucide-react';
import ThemeSwitcher from '../UI/ThemeSystem/ThemeSwitcher';

const MainLayout = () => {
    const [isThemeOpen, setIsThemeOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden relative" style={{ backgroundColor: 'var(--bg)', color: 'var(--text)' }}>
            {/* Desktop / Tablet Sidebar */}
            <div className="hidden md:flex h-full flex-shrink-0">
                <Sidebar />
            </div>

            {/* Mobile Drawer Backdrop */}
            {isMobileMenuOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/80 backdrop-blur-md z-50 animate-in fade-in duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    <div
                        className="w-72 h-full bg-dark-900 border-r border-white/10 p-4 animate-in slide-in-from-left duration-300"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <Link to="/" className="text-xl font-black italic tracking-tighter text-primary">SONIC</Link>
                            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-dark-400 hover:text-white">
                                <X size={20} />
                            </button>
                        </div>
                        <Sidebar onNavigate={() => setIsMobileMenuOpen(false)} />
                    </div>
                </div>
            )}

            <main className="flex-1 flex flex-col relative overflow-hidden">
                {/* Top Mobile & Desktop Actions Bar */}
                <header className="absolute top-0 left-0 right-0 z-30 h-16 px-4 md:px-8 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm pointer-events-auto">
                    {/* Mobile Hamburger Menu Toggle */}
                    <div className="flex items-center gap-3 md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white active:scale-95 transition-all"
                            aria-label="Open Navigation"
                        >
                            <Menu size={20} />
                        </button>
                        <span className="font-black italic text-primary tracking-tighter text-lg">SONIC</span>
                    </div>

                    <div className="ml-auto flex items-center gap-3">
                        <button
                            onClick={() => setIsThemeOpen(true)}
                            className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 transition-colors group shadow-lg"
                            title="Change Theme"
                        >
                            <Palette size={20} className="text-dark-100 group-hover:text-primary transition-colors" />
                        </button>
                    </div>
                </header>

                {/* Main Scrollable Content */}
                <div
                    className="flex-1 overflow-y-auto p-4 md:p-8 pt-20 pb-36 md:pb-28 custom-scrollbar"
                    style={{ background: 'linear-gradient(to bottom, var(--panel), var(--bg))' }}
                >
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </div>

                {/* Player & Mobile Bottom Nav */}
                <Player />
                <MiniPlayer />
                <MobileBottomNav />
            </main>

            <ThemeSwitcher isOpen={isThemeOpen} onClose={() => setIsThemeOpen(false)} />
        </div>
    );
};

export default MainLayout;
`;
fs.writeFileSync('D:/music-streaming/client/src/components/Layout/MainLayout.jsx', mainLayoutCode, 'utf8');
console.log('Updated client/src/components/Layout/MainLayout.jsx');

// ==========================================
// 7. CREATE client/src/components/Admin/AutoIngestManagement.jsx
// ==========================================
const autoIngestManagementCode = `import React, { useState, useEffect } from 'react';
import { DownloadCloud, Play, Sparkles, RefreshCw, CheckCircle2, AlertTriangle, Layers, Radio } from 'lucide-react';
import api from '../../api/client';
import toast from 'react-hot-toast';

const AutoIngestManagement = () => {
    const [query, setQuery] = useState('top global hit songs 2026');
    const [limit, setLimit] = useState(5);
    const [genreName, setGenreName] = useState('Pop');
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchStatus = async () => {
        try {
            const res = await api.get('/admin/auto-ingest/status');
            setStatus(res.data);
        } catch (err) {
            console.error('Failed to fetch status:', err);
        }
    };

    useEffect(() => {
        fetchStatus();
        const interval = setInterval(fetchStatus, 3000);
        return () => clearInterval(interval);
    }, []);

    const handleStartIngest = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/admin/auto-ingest', { query, limit, genreName });
            toast.success('Automated ingestion task started!');
            fetchStatus();
        } catch (err) {
            toast.error(err.response?.data?.message || err.message || 'Failed to start ingestion');
        } finally {
            setLoading(false);
        }
    };

    const presetQueries = [
        { label: 'Global Top Hits 2026', query: 'global top hits 2026', genre: 'Pop' },
        { label: 'Trending Hip Hop / Rap', query: 'trending hip hop songs 2026', genre: 'Hip Hop' },
        { label: 'Electronic Dance EDM', query: 'top edm dance music 2026', genre: 'EDM' },
        { label: 'Acoustic & Chill Vibes', query: 'chill acoustic songs indie', genre: 'Acoustic' },
        { label: 'Rock & Alternative', query: 'top rock hits alternative', genre: 'Rock' }
    ];

    return (
        <div className="space-y-10 animate-in fade-in duration-500">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter uppercase flex items-center gap-4">
                        <DownloadCloud className="text-primary" size={36} />
                        Auto Music Ingestion Engine
                    </h1>
                    <p className="text-dark-100 font-medium mt-1">
                        Automatically fetch, download MP3 audio, and extract artwork from music charts worldwide.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <span className={\`px-4 py-2 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center gap-2 \${
                        status?.isRunning ? 'bg-primary/20 text-primary border border-primary/30 animate-pulse' : 'bg-white/5 text-dark-100'
                    }\`}>
                        <Radio size={14} className={status?.isRunning ? 'text-primary' : 'text-dark-400'} />
                        {status?.isRunning ? 'Scraping In Progress' : 'Engine Idle'}
                    </span>
                </div>
            </header>

            {/* Quick Preset Buttons */}
            <div className="space-y-3">
                <h3 className="text-xs font-black uppercase tracking-widest text-dark-400">Quick Chart Ingest Presets</h3>
                <div className="flex flex-wrap gap-2">
                    {presetQueries.map((preset) => (
                        <button
                            key={preset.label}
                            type="button"
                            onClick={() => { setQuery(preset.query); setGenreName(preset.genre); }}
                            className="px-4 py-2 bg-white/5 hover:bg-primary/10 hover:text-primary hover:border-primary/30 border border-white/10 rounded-2xl text-xs font-bold transition-all"
                        >
                            {preset.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Ingestion Trigger Form */}
            <div className="bg-dark-800 p-8 rounded-3xl border border-white/5 shadow-2xl">
                <form onSubmit={handleStartIngest} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-dark-400">Search Query / Playlist URL</label>
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="e.g. top hit songs 2026 or YouTube playlist URL"
                                required
                                className="w-full bg-dark-900 border border-white/10 rounded-2xl px-5 py-4 text-white font-medium focus:border-primary focus:outline-none transition-colors"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-dark-400">Song Limit</label>
                            <select
                                value={limit}
                                onChange={(e) => setLimit(Number(e.target.value))}
                                className="w-full bg-dark-900 border border-white/10 rounded-2xl px-5 py-4 text-white font-medium focus:border-primary focus:outline-none"
                            >
                                <option value={3}>3 Songs (Fast Test)</option>
                                <option value={5}>5 Songs (Recommended)</option>
                                <option value={10}>10 Songs (Batch Ingest)</option>
                                <option value={20}>20 Songs (Deep Chart)</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-dark-400">Target Genre Tag</label>
                            <input
                                type="text"
                                value={genreName}
                                onChange={(e) => setGenreName(e.target.value)}
                                placeholder="Pop, Hip Hop, Rock, EDM, etc."
                                className="w-full bg-dark-900 border border-white/10 rounded-2xl px-5 py-4 text-white font-medium focus:border-primary focus:outline-none"
                            />
                        </div>

                        <div className="flex items-end">
                            <button
                                type="submit"
                                disabled={status?.isRunning || loading}
                                className="w-full py-4 bg-primary text-black font-black uppercase tracking-widest text-xs rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {status?.isRunning ? (
                                    <>
                                        <RefreshCw size={18} className="animate-spin" />
                                        <span>Ingestion in Progress...</span>
                                    </>
                                ) : (
                                    <>
                                        <Play size={18} fill="currentColor" />
                                        <span>Start Auto-Ingestion</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            {/* Real-time Ingestion Progress & Logs */}
            <div className="bg-dark-800 p-8 rounded-3xl border border-white/5 space-y-6">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                        <Layers className="text-primary" />
                        Live Progress & Terminal Logs
                    </h3>
                    <span className="text-xs text-dark-400 font-mono">
                        {status?.isRunning ? \`Processing \${status.progress} / \${status.totalToProcess}\` : 'Ready'}
                    </span>
                </div>

                {/* Progress Bar */}
                {status?.isRunning && (
                    <div className="w-full bg-white/5 rounded-full h-3 overflow-hidden border border-white/5">
                        <div
                            className="bg-primary h-full rounded-full transition-all duration-500 shadow-[0_0_15px_var(--glow)]"
                            style={{ width: \`\${status?.progressPercent || 10}%\` }}
                        />
                    </div>
                )}

                {/* Terminal Console Output */}
                <div className="bg-black/90 border border-white/10 rounded-2xl p-4 font-mono text-xs max-h-72 overflow-y-auto space-y-1.5 custom-scrollbar">
                    {status?.logs && status.logs.length > 0 ? (
                        status.logs.map((log, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                                <span className="text-dark-400 flex-shrink-0">[{log.time}]</span>
                                <span className={
                                    log.type === 'success' ? 'text-green-400 font-bold' :
                                    log.type === 'warn' ? 'text-yellow-400' :
                                    log.type === 'error' ? 'text-red-400 font-bold' : 'text-dark-100'
                                }>
                                    {log.message}
                                </span>
                            </div>
                        ))
                    ) : (
                        <p className="text-dark-400 italic">No logs yet. Trigger an ingestion above or wait for the automatic scheduled cron.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AutoIngestManagement;
`;
fs.writeFileSync('D:/music-streaming/client/src/components/Admin/AutoIngestManagement.jsx', autoIngestManagementCode, 'utf8');
console.log('Created client/src/components/Admin/AutoIngestManagement.jsx');

// ==========================================
// 8. UPDATE client/src/components/Admin/AdminDashboard.jsx & AdminLayout.jsx
// ==========================================
let adminDashboardCode = fs.readFileSync('D:/music-streaming/client/src/components/Admin/AdminDashboard.jsx', 'utf8');
if (!adminDashboardCode.includes('AutoIngestManagement')) {
    adminDashboardCode = `import AutoIngestManagement from './AutoIngestManagement';\n` + adminDashboardCode;
    adminDashboardCode = adminDashboardCode.replace(
        `if (path === '/admin/billing') {`,
        `if (path === '/admin/auto-ingest') {\n            return <AutoIngestManagement />;\n        }\n\n        if (path === '/admin/billing') {`
    );
    fs.writeFileSync('D:/music-streaming/client/src/components/Admin/AdminDashboard.jsx', adminDashboardCode, 'utf8');
    console.log('Updated AdminDashboard.jsx with AutoIngestManagement tab');
}

let adminLayoutCode = fs.readFileSync('D:/music-streaming/client/src/components/Admin/AdminLayout.jsx', 'utf8');
if (!adminLayoutCode.includes('/admin/auto-ingest')) {
    adminLayoutCode = adminLayoutCode.replace(
        `import { LayoutDashboard, Music, Users, CreditCard, LogOut, Settings, ListMusic, UserSquare2, Palette, Star } from 'lucide-react';`,
        `import { LayoutDashboard, Music, Users, CreditCard, LogOut, Settings, ListMusic, UserSquare2, Palette, Star, DownloadCloud } from 'lucide-react';`
    );
    adminLayoutCode = adminLayoutCode.replace(
        `{ icon: <Music />, label: 'Songs', path: '/admin/content/songs' },`,
        `{ icon: <DownloadCloud />, label: 'Auto Song Ingest', path: '/admin/auto-ingest' },\n        { icon: <Music />, label: 'Songs', path: '/admin/content/songs' },`
    );
    fs.writeFileSync('D:/music-streaming/client/src/components/Admin/AdminLayout.jsx', adminLayoutCode, 'utf8');
    console.log('Updated AdminLayout.jsx with Auto Song Ingest navigation link');
}

// ==========================================
// 9. ENHANCE client/src/components/Player/Player.jsx (Mobile & Visualizer)
// ==========================================
const playerCode = `import React, { useState, useEffect, useRef } from 'react';
import {
    Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Volume2,
    ListMusic, Heart, FileText, Settings, Radio, ChevronUp, ChevronDown, X
} from 'lucide-react';
import { Link } from 'react-router-dom';
import usePlayerStore from '../../store/usePlayerStore';
import useAuthStore from '../../store/useAuthStore';
import { formatUrl } from '../../utils/url';
import toast from 'react-hot-toast';
import QueueDrawer from '../UI/ThemeSystem/QueueDrawer';
import LikeButton from '../UI/LikeButton';
import AddToPlaylistModal from '../UI/AddToPlaylistModal';
import LyricsPanel from '../UI/LyricsPanel';
import PremiumAudioSettings from './PremiumAudioSettings';
import AIDJMode from './AIDJMode';

const Player = () => {
    const {
        currentSong, isPlaying, volume, progress, currentTime,
        playNext, playPrevious, togglePlay, setVolume, setProgress,
        setCurrentTime, shuffle, toggleShuffle, repeatMode, setRepeatMode
    } = usePlayerStore();

    const { isAuthenticated, openAuthModal } = useAuthStore();
    const audioRef = useRef(null);

    const [isQueueOpen, setIsQueueOpen] = useState(false);
    const [isPlaylistModalOpen, setPlaylistModalOpen] = useState(false);
    const [isLyricsOpen, setIsLyricsOpen] = useState(false);
    const [isAudioSettingsOpen, setIsAudioSettingsOpen] = useState(false);
    const [isMobileExpanded, setIsMobileExpanded] = useState(false);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    useEffect(() => {
        if (audioRef.current && currentSong) {
            if (isPlaying) {
                audioRef.current.play().catch(e => {
                    console.log('Audio autoplay prevented:', e);
                });
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying, currentSong]);

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            const current = audioRef.current.currentTime;
            const duration = audioRef.current.duration || 1;
            setCurrentTime(current);
            setProgress((current / duration) * 100);
        }
    };

    const handleEnded = () => {
        if (repeatMode === 'one') {
            if (audioRef.current) {
                audioRef.current.currentTime = 0;
                audioRef.current.play();
            }
        } else {
            playNext();
        }
    };

    const formatTime = (time) => {
        if (isNaN(time) || time === undefined) return '0:00';
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        return \`\${mins}:\${secs.toString().padStart(2, '0')}\`;
    };

    if (!currentSong) return null;

    return (
        <>
            {/* Desktop / Tablet Bottom Player Bar */}
            <div
                className="hidden md:flex h-24 px-6 items-center justify-between sticky bottom-0 z-50 shadow-2xl transition-all duration-300 border-t backdrop-blur-xl"
                style={{ backgroundColor: 'var(--panel)', borderTopColor: 'var(--border)', color: 'var(--text)' }}
            >
                {/* Song Info & Thumbnail */}
                <div className="flex items-center gap-4 w-1/3 min-w-0">
                    <Link to={\`/song/\${currentSong._id}\`} className="flex-shrink-0 group relative overflow-hidden rounded-xl">
                        <img
                            src={formatUrl(currentSong.thumbnailUrl)}
                            alt={currentSong.title}
                            className="w-14 h-14 object-cover shadow-lg border border-white/5 group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Play size={16} />
                        </div>
                    </Link>
                    <div className="overflow-hidden min-w-0">
                        <Link to={\`/song/\${currentSong._id}\`} className="font-bold text-sm truncate block hover:underline">{currentSong.title}</Link>
                        <Link to={\`/artist/\${currentSong.artist?._id}\`} className="text-xs text-dark-100 truncate block hover:text-white transition-colors">{currentSong.artist?.name}</Link>
                    </div>
                    <div className="flex items-center gap-3 ml-2">
                        <LikeButton songId={currentSong._id} />
                        <button
                            onClick={() => isAuthenticated ? setPlaylistModalOpen(true) : openAuthModal()}
                            className="text-dark-100 hover:text-white transition-colors p-1"
                            title="Add to Playlist"
                        >
                            <ListMusic size={18} />
                        </button>
                    </div>
                </div>

                {/* Center Controls & Progress Bar */}
                <div className="flex flex-col items-center gap-2 w-1/3 max-w-xl">
                    <div className="flex items-center gap-8 text-dark-100">
                        <Shuffle
                            size={18}
                            className={\`transition-colors cursor-pointer \${shuffle ? 'text-primary' : 'hover:text-white'}\`}
                            onClick={toggleShuffle}
                        />
                        <SkipBack size={24} className="hover:text-white transition-colors cursor-pointer active:scale-90" onClick={playPrevious} />
                        <button
                            onClick={() => !isAuthenticated ? openAuthModal() : togglePlay()}
                            className="w-11 h-11 rounded-full flex items-center justify-center text-black hover:scale-110 active:scale-95 transition-all shadow-lg"
                            style={{ backgroundColor: 'var(--primary)' }}
                        >
                            {isPlaying ? <Pause size={22} fill="currentColor" /> : <Play size={22} fill="currentColor" className="ml-0.5" />}
                        </button>
                        <SkipForward size={24} className="hover:text-white transition-colors cursor-pointer active:scale-90" onClick={playNext} />
                        <div className="relative">
                            <Repeat
                                size={18}
                                className={\`transition-colors cursor-pointer \${repeatMode !== 'none' ? 'text-primary' : 'hover:text-white'}\`}
                                onClick={() => {
                                    const modes = ['none', 'all', 'one'];
                                    setRepeatMode(modes[(modes.indexOf(repeatMode) + 1) % modes.length]);
                                }}
                            />
                            {repeatMode === 'one' && <span className="absolute -top-1 -right-1 text-[8px] font-bold bg-primary text-black rounded-full w-3 h-3 flex items-center justify-center">1</span>}
                        </div>
                    </div>

                    {/* Progress Slider */}
                    <div className="w-full flex items-center gap-3 text-[10px] font-bold text-dark-100">
                        <span className="w-10 text-right font-mono tracking-tighter">{formatTime(currentTime)}</span>
                        <div
                            className="flex-1 h-1.5 rounded-full group cursor-pointer relative"
                            style={{ backgroundColor: 'var(--border)' }}
                            onClick={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                const x = e.clientX - rect.left;
                                const pct = x / rect.width;
                                if (audioRef.current) {
                                    audioRef.current.currentTime = pct * (audioRef.current.duration || 0);
                                }
                            }}
                        >
                            <div
                                className="h-full rounded-full relative transition-all shadow-[0_0_10px_var(--glow)]"
                                style={{ width: \`\${progress}%\`, backgroundColor: 'var(--primary)' }}
                            >
                                <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 shadow-xl transition-opacity" />
                            </div>
                        </div>
                        <span className="w-10 font-mono tracking-tighter">{formatTime(audioRef.current?.duration)}</span>
                    </div>
                </div>

                {/* Right Actions & Equalizer Visualizer */}
                <div className="flex items-center justify-end gap-5 w-1/3 text-dark-100">
                    {/* Live Visualizer Bars */}
                    {isPlaying && (
                        <div className="flex items-end gap-1 h-5 px-2">
                            <span className="w-1 bg-primary rounded-full animate-pulse h-4" />
                            <span className="w-1 bg-primary rounded-full animate-bounce h-5" style={{ animationDelay: '150ms' }} />
                            <span className="w-1 bg-primary rounded-full animate-pulse h-3" style={{ animationDelay: '300ms' }} />
                            <span className="w-1 bg-primary rounded-full animate-bounce h-5" style={{ animationDelay: '450ms' }} />
                        </div>
                    )}

                    <button onClick={() => setIsLyricsOpen(true)} className="transition-colors hover:text-white" title="Lyrics">
                        <FileText size={20} />
                    </button>
                    <button onClick={() => setIsQueueOpen(true)} className={\`transition-colors \${isQueueOpen ? 'text-primary' : 'hover:text-white'}\`} title="Queue">
                        <ListMusic size={20} />
                    </button>
                    <button onClick={() => setIsAudioSettingsOpen(true)} className="transition-colors hover:text-white" title="Audio Settings">
                        <Settings size={20} />
                    </button>
                    <div className="flex items-center gap-2 group">
                        <Volume2 size={18} className="group-hover:text-white transition-colors cursor-pointer" />
                        <input
                            type="range" min="0" max="1" step="0.01"
                            value={volume}
                            onChange={(e) => setVolume(parseFloat(e.target.value))}
                            className="h-1 rounded-full cursor-pointer appearance-none bg-white/10 w-20 lg:w-24"
                            style={{ accentColor: 'var(--primary)' }}
                        />
                    </div>
                </div>
            </div>

            {/* Mobile Floating Mini Player (Above Mobile Bottom Nav) */}
            <div
                className="md:hidden fixed bottom-16 left-2 right-2 z-40 rounded-2xl p-2.5 flex items-center justify-between border shadow-2xl backdrop-blur-xl animate-in slide-in-from-bottom duration-300"
                style={{ backgroundColor: 'rgba(28, 28, 28, 0.95)', borderColor: 'var(--border)' }}
                onClick={() => setIsMobileExpanded(true)}
            >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                    <img
                        src={formatUrl(currentSong.thumbnailUrl)}
                        alt=""
                        className={\`w-11 h-11 rounded-xl object-cover shadow-lg \${isPlaying ? 'rotate-2' : ''}\`}
                    />
                    <div className="overflow-hidden min-w-0">
                        <h4 className="text-xs font-bold text-white truncate">{currentSong.title}</h4>
                        <p className="text-[10px] text-dark-400 truncate">{currentSong.artist?.name}</p>
                    </div>
                </div>

                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <LikeButton songId={currentSong._id} />
                    <button
                        onClick={togglePlay}
                        className="w-10 h-10 rounded-full bg-primary text-black flex items-center justify-center shadow-lg active:scale-90 transition-all"
                    >
                        {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Full-Screen Expandable Player Modal */}
            {isMobileExpanded && (
                <div className="md:hidden fixed inset-0 z-50 bg-dark-900 flex flex-col p-6 animate-in slide-in-from-bottom duration-300 overflow-y-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <button onClick={() => setIsMobileExpanded(false)} className="p-2 text-dark-400 hover:text-white">
                            <ChevronDown size={28} />
                        </button>
                        <span className="text-xs font-black uppercase tracking-widest text-dark-400">Now Playing</span>
                        <button onClick={() => setIsLyricsOpen(true)} className="p-2 text-dark-400 hover:text-primary">
                            <FileText size={22} />
                        </button>
                    </div>

                    {/* Album Art */}
                    <div className="flex-1 flex items-center justify-center my-6">
                        <img
                            src={formatUrl(currentSong.thumbnailUrl)}
                            alt={currentSong.title}
                            className="w-72 h-72 rounded-3xl object-cover shadow-2xl border border-white/10"
                        />
                    </div>

                    {/* Song Details */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="overflow-hidden">
                            <h2 className="text-2xl font-black text-white truncate tracking-tight">{currentSong.title}</h2>
                            <p className="text-sm font-bold text-dark-400 truncate mt-1">{currentSong.artist?.name}</p>
                        </div>
                        <LikeButton songId={currentSong._id} />
                    </div>

                    {/* Progress Slider */}
                    <div className="space-y-2 mb-8">
                        <div
                            className="w-full h-2 rounded-full cursor-pointer relative"
                            style={{ backgroundColor: 'var(--border)' }}
                            onClick={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                const pct = (e.clientX - rect.left) / rect.width;
                                if (audioRef.current) {
                                    audioRef.current.currentTime = pct * (audioRef.current.duration || 0);
                                }
                            }}
                        >
                            <div
                                className="h-full rounded-full"
                                style={{ width: \`\${progress}%\`, backgroundColor: 'var(--primary)' }}
                            />
                        </div>
                        <div className="flex justify-between text-xs font-mono text-dark-400">
                            <span>{formatTime(currentTime)}</span>
                            <span>{formatTime(audioRef.current?.duration)}</span>
                        </div>
                    </div>

                    {/* Playback Controls */}
                    <div className="flex items-center justify-around text-dark-100 mb-8">
                        <Shuffle size={22} className={shuffle ? 'text-primary' : ''} onClick={toggleShuffle} />
                        <SkipBack size={32} onClick={playPrevious} className="cursor-pointer active:scale-90" />
                        <button
                            onClick={togglePlay}
                            className="w-16 h-16 rounded-full bg-primary text-black flex items-center justify-center shadow-xl active:scale-95 transition-all"
                        >
                            {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
                        </button>
                        <SkipForward size={32} onClick={playNext} className="cursor-pointer active:scale-90" />
                        <Repeat size={22} className={repeatMode !== 'none' ? 'text-primary' : ''} onClick={() => {
                            const modes = ['none', 'all', 'one'];
                            setRepeatMode(modes[(modes.indexOf(repeatMode) + 1) % modes.length]);
                        }} />
                    </div>
                </div>
            )}

            {/* Underlying Audio Element */}
            <audio
                ref={audioRef}
                src={formatUrl(currentSong.audioUrl)}
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleEnded}
                onError={(e) => {
                    console.error('Audio playback error:', e);
                    toast.error('Failed to stream audio file');
                }}
            />

            <QueueDrawer isOpen={isQueueOpen} onClose={() => setIsQueueOpen(false)} />
            <AddToPlaylistModal isOpen={isPlaylistModalOpen} onClose={() => setPlaylistModalOpen(false)} songId={currentSong?._id} />
            <LyricsPanel isOpen={isLyricsOpen} onClose={() => setIsLyricsOpen(false)} songId={currentSong?._id} />
            <PremiumAudioSettings isOpen={isAudioSettingsOpen} onClose={() => setIsAudioSettingsOpen(false)} />
            <AIDJMode />
        </>
    );
};

export default Player;
`;
fs.writeFileSync('D:/music-streaming/client/src/components/Player/Player.jsx', playerCode, 'utf8');
console.log('Updated client/src/components/Player/Player.jsx with responsive mobile player and visualizers');

// ==========================================
// 10. CREATE PWA manifest.json, sw.js, and update index.html
// ==========================================
const manifestJson = `{
  "name": "SONIC - Music Streaming App",
  "short_name": "Sonic Music",
  "description": "Stream millions of songs, playlists, and AI DJ recommendations anywhere.",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#121212",
  "theme_color": "#1db954",
  "icons": [
    {
      "src": "/vite.svg",
      "sizes": "192x192",
      "type": "image/svg+xml"
    },
    {
      "src": "/vite.svg",
      "sizes": "512x512",
      "type": "image/svg+xml"
    }
  ]
}
`;
fs.writeFileSync('D:/music-streaming/client/public/manifest.json', manifestJson, 'utf8');

const serviceWorkerCode = `const CACHE_NAME = 'sonic-app-v1';

self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
    // Network first for streaming and dynamic API requests
    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(event.request);
        })
    );
});
`;
fs.writeFileSync('D:/music-streaming/client/public/sw.js', serviceWorkerCode, 'utf8');

let indexHtmlCode = fs.readFileSync('D:/music-streaming/client/index.html', 'utf8');
if (!indexHtmlCode.includes('manifest.json')) {
    indexHtmlCode = indexHtmlCode.replace(
        '<meta name="viewport" content="width=device-width, initial-scale=1.0" />',
        `<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta name="theme-color" content="#1db954" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    <link rel="manifest" href="/manifest.json" />`
    );
    fs.writeFileSync('D:/music-streaming/client/index.html', indexHtmlCode, 'utf8');
    console.log('Updated client/index.html with PWA meta tags');
}

// ==========================================
// 11. UPDATE client/src/App.jsx (OfflineModal & Service Worker registration)
// ==========================================
let appJsxCode = fs.readFileSync('D:/music-streaming/client/src/App.jsx', 'utf8');
if (!appJsxCode.includes('OfflineModal')) {
    appJsxCode = `import OfflineModal from './components/UI/OfflineModal';\n` + appJsxCode;
    appJsxCode = appJsxCode.replace('<AuthModal isOpen={isAuthModalOpen}', '<OfflineModal />\n        <AuthModal isOpen={isAuthModalOpen}');

    // Register service worker if supported
    const swRegistration = `
  useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker.register('/sw.js').catch(err => console.log('SW registration error:', err));
    }
  }, []);
`;
    appJsxCode = appJsxCode.replace('function App() {', `function App() {${swRegistration}`);
    fs.writeFileSync('D:/music-streaming/client/src/App.jsx', appJsxCode, 'utf8');
    console.log('Updated client/src/App.jsx with OfflineModal and PWA registration');
}

console.log('All files written successfully!');
