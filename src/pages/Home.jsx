import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, Moon, Sun, Star, Heart, Eye, Compass, ChevronRight } from 'lucide-react';

const zodiacSigns = [
    { name: 'Aries', symbol: '♈', dates: 'Mar 21 - Apr 19', element: 'Fire' },
    { name: 'Taurus', symbol: '♉', dates: 'Apr 20 - May 20', element: 'Earth' },
    { name: 'Gemini', symbol: '♊', dates: 'May 21 - Jun 20', element: 'Air' },
    { name: 'Cancer', symbol: '♋', dates: 'Jun 21 - Jul 22', element: 'Water' },
    { name: 'Leo', symbol: '♌', dates: 'Jul 23 - Aug 22', element: 'Fire' },
    { name: 'Virgo', symbol: '♍', dates: 'Aug 23 - Sep 22', element: 'Earth' },
    { name: 'Libra', symbol: '♎', dates: 'Sep 23 - Oct 22', element: 'Air' },
    { name: 'Scorpio', symbol: '♏', dates: 'Oct 23 - Nov 21', element: 'Water' },
    { name: 'Sagittarius', symbol: '♐', dates: 'Nov 22 - Dec 21', element: 'Fire' },
    { name: 'Capricorn', symbol: '♑', dates: 'Dec 22 - Jan 19', element: 'Earth' },
    { name: 'Aquarius', symbol: '♒', dates: 'Jan 20 - Feb 18', element: 'Air' },
    { name: 'Pisces', symbol: '♓', dates: 'Feb 19 - Mar 20', element: 'Water' },
];

const features = [
    { title: 'Daily Horoscope', icon: Sparkles, gradient: 'from-indigo-600/30 to-purple-600/30', border: 'border-indigo-500/20', path: '/horoscope' },
    { title: 'Tarot Reading', icon: Eye, gradient: 'from-purple-600/30 to-pink-600/30', border: 'border-purple-500/20', path: '/tarot' },
    { title: 'Palmistry', icon: Heart, gradient: 'from-pink-600/30 to-rose-600/30', border: 'border-pink-500/20', path: '/shop' },
    { title: 'Numerology', icon: Compass, gradient: 'from-teal-600/30 to-cyan-600/30', border: 'border-teal-500/20', path: '/shop' },
];

const dailyReading = {
    card: 'The Star',
    message: 'A time of renewed hope and inspiration. Trust in the universe\'s plan for you.',
    lucky: { number: 7, color: 'Gold', stone: 'Amethyst' },
};

const Home = () => {
    const [selectedSign, setSelectedSign] = useState(null);
    const today = new Date();
    const dateStr = today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

    return (
        <div className="space-y-6 pb-4">
            {/* Hero Header */}
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center pt-2"
            >
                <div className="flex items-center justify-center gap-2 mb-3">
                    <Star className="text-primary" size={18} fill="currentColor" />
                    <span className="text-xs uppercase tracking-[0.3em] text-muted">{dateStr}</span>
                    <Star className="text-primary" size={18} fill="currentColor" />
                </div>
                <h1 className="text-4xl font-serif font-bold bg-gradient-to-r from-primary via-amber-200 to-primary bg-clip-text text-transparent">
                    Astrala
                </h1>
                <p className="text-muted text-sm mt-1">Your cosmic guide awaits</p>
            </motion.header>

            {/* Moon Phase Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-surface/80 to-surface/40 backdrop-blur-sm border border-white/5 p-5"
            >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary/10 rounded-full blur-3xl" />
                <div className="flex items-center gap-4 relative z-10">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center border border-white/10">
                        <Moon size={28} className="text-primary" />
                    </div>
                    <div>
                        <p className="text-xs text-muted uppercase tracking-wider">Tonight's Moon</p>
                        <h2 className="text-xl font-serif text-white">Waning Gibbous</h2>
                        <p className="text-xs text-primary/80 mt-0.5">✦ Reflect & Release ✦</p>
                    </div>
                </div>
            </motion.div>

            {/* Daily Insight Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-2xl bg-gradient-to-br from-secondary/20 to-primary/10 border border-white/5 p-5"
            >
                <div className="flex items-center gap-2 mb-3">
                    <Sun size={16} className="text-primary" />
                    <span className="text-xs uppercase tracking-wider text-primary">Daily Insight</span>
                </div>
                <p className="text-white/90 font-serif text-lg leading-relaxed">"{dailyReading.message}"</p>
                <div className="flex gap-4 mt-4">
                    <div className="text-center">
                        <span className="text-xs text-muted block">Lucky #</span>
                        <span className="text-primary font-semibold">{dailyReading.lucky.number}</span>
                    </div>
                    <div className="text-center">
                        <span className="text-xs text-muted block">Color</span>
                        <span className="text-primary font-semibold">{dailyReading.lucky.color}</span>
                    </div>
                    <div className="text-center">
                        <span className="text-xs text-muted block">Stone</span>
                        <span className="text-primary font-semibold">{dailyReading.lucky.stone}</span>
                    </div>
                </div>
            </motion.div>

            {/* Zodiac Horizontal Scroll */}
            <div>
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm uppercase tracking-wider text-muted">Your Sign</h3>
                    <Link to="/horoscope" className="text-xs text-primary flex items-center gap-1">
                        View All <ChevronRight size={12} />
                    </Link>
                </div>
                <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
                    {zodiacSigns.map((sign, i) => (
                        <motion.button
                            key={sign.name}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            onClick={() => setSelectedSign(selectedSign === sign.name ? null : sign.name)}
                            className={`flex-shrink-0 w-20 flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all duration-300 ${selectedSign === sign.name
                                    ? 'bg-primary/20 border-primary/40 shadow-[0_0_20px_rgba(212,175,55,0.15)]'
                                    : 'bg-surface/40 border-white/5 hover:border-white/10'
                                }`}
                        >
                            <span className="text-2xl">{sign.symbol}</span>
                            <span className="text-[10px] text-muted">{sign.name}</span>
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Selected Sign Detail */}
            <AnimatePresence>
                {selectedSign && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="rounded-2xl bg-surface/60 border border-primary/20 p-5 overflow-hidden"
                    >
                        {zodiacSigns.filter(s => s.name === selectedSign).map(sign => (
                            <div key={sign.name}>
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="text-4xl">{sign.symbol}</span>
                                    <div>
                                        <h3 className="text-lg font-serif text-white">{sign.name}</h3>
                                        <p className="text-xs text-muted">{sign.dates} • {sign.element}</p>
                                    </div>
                                </div>
                                <p className="text-sm text-white/70 leading-relaxed">
                                    Today brings a wave of creative energy. Trust your instincts and let your inner light guide you through any challenges that arise.
                                </p>
                                <Link to="/horoscope" className="inline-flex items-center gap-1 text-primary text-sm mt-3">
                                    Full Reading <ChevronRight size={14} />
                                </Link>
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Features Grid */}
            <div>
                <h3 className="text-sm uppercase tracking-wider text-muted mb-3">Explore</h3>
                <div className="grid grid-cols-2 gap-3">
                    {features.map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                        >
                            <Link
                                to={item.path}
                                className={`block h-28 rounded-2xl bg-gradient-to-br ${item.gradient} ${item.border} border p-4 flex flex-col justify-between active:scale-[0.97] transition-transform`}
                            >
                                <item.icon size={22} className="text-white/80" />
                                <span className="text-sm font-medium text-white/90">{item.title}</span>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
