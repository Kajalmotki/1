import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Star, Heart, Briefcase, Brain, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const zodiacData = [
    {
        name: 'Aries', symbol: '♈', dates: 'Mar 21 - Apr 19', element: 'Fire', ruler: 'Mars', color: '#FF6B6B',
        reading: 'Bold opportunities knock at your door today. Your natural leadership shines, making it an ideal time to start new projects. Trust your courage.',
        love: 'Passion ignites in unexpected places. Open your heart to spontaneous connections.',
        career: 'A powerful ally emerges at work. Leverage this partnership wisely.',
        health: 'Channel your fiery energy into vigorous exercise. Your body craves movement.'
    },
    {
        name: 'Taurus', symbol: '♉', dates: 'Apr 20 - May 20', element: 'Earth', ruler: 'Venus', color: '#4ECDC4',
        reading: 'Financial stability looks promising. Your patient nature pays off as long-term plans begin to materialize. Stay grounded.',
        love: 'Steadfast love surrounds you. Deepen existing bonds through quality time.',
        career: 'Creative projects gain momentum. Your eye for beauty sets you apart.',
        health: 'Indulge in sensory pleasures mindfully. Nature walks restore your spirit.'
    },
    {
        name: 'Gemini', symbol: '♊', dates: 'May 21 - Jun 20', element: 'Air', ruler: 'Mercury', color: '#FFE66D',
        reading: 'Communication skills are heightened. Express your ideas with clarity and watch doors open. A meaningful conversation awaits.',
        love: 'Intellectual connections spark joy. Seek partners who stimulate your curious mind.',
        career: 'Networking brings golden opportunities. Your words carry extra weight today.',
        health: 'Mental agility needs balance. Practice mindfulness to calm your racing thoughts.'
    },
    {
        name: 'Cancer', symbol: '♋', dates: 'Jun 21 - Jul 22', element: 'Water', ruler: 'Moon', color: '#C9B1FF',
        reading: 'Emotional intuition is your superpower today. Trust those gut feelings—they\'re guiding you toward something beautiful.',
        love: 'Nurturing energy flows. Create a safe space for vulnerability in relationships.',
        career: 'Home-based projects thrive. Your empathetic leadership inspires others.',
        health: 'Water activities heal your soul. Hydration and emotional release go hand in hand.'
    },
    {
        name: 'Leo', symbol: '♌', dates: 'Jul 23 - Aug 22', element: 'Fire', ruler: 'Sun', color: '#FF9F43',
        reading: 'Your magnetic charm is irresistible today. Step into the spotlight and let your authentic self shine for all to see.',
        love: 'Romance takes center stage. Grand gestures are well-received now.',
        career: 'Leadership opportunities abound. Your charisma attracts success.',
        health: 'Radiant energy fuels your day. Express yourself through creative movement.'
    },
    {
        name: 'Virgo', symbol: '♍', dates: 'Aug 23 - Sep 22', element: 'Earth', ruler: 'Mercury', color: '#95E1D3',
        reading: 'Details reveal hidden treasures today. Your analytical mind spots opportunities others miss. Organize and conquer.',
        love: 'Acts of service speak louder than words. Show love through thoughtful gestures.',
        career: 'Perfectionism pays off in a major project. Quality stands out.',
        health: 'Fine-tune your wellness routine. Small, consistent habits yield big results.'
    },
    {
        name: 'Libra', symbol: '♎', dates: 'Sep 23 - Oct 22', element: 'Air', ruler: 'Venus', color: '#DDA0DD',
        reading: 'Harmony and balance flow naturally today. Your diplomatic nature resolves tensions and creates beauty wherever you go.',
        love: 'Partnership energy is strong. Seek balance between giving and receiving.',
        career: 'Collaborative projects flourish. Your sense of fairness earns respect.',
        health: 'Inner balance reflects outer beauty. Aesthetic pursuits nourish your soul.'
    },
    {
        name: 'Scorpio', symbol: '♏', dates: 'Oct 23 - Nov 21', element: 'Water', ruler: 'Pluto', color: '#FF4757',
        reading: 'Deep transformation calls. Shed what no longer serves you and emerge renewed. Your intensity is your greatest strength.',
        love: 'Intense connections deepen. Vulnerability becomes your bridge to intimacy.',
        career: 'Strategic moves pay off handsomely. Trust your investigative instincts.',
        health: 'Emotional detox is essential. Release stored tensions through deep breathing.'
    },
    {
        name: 'Sagittarius', symbol: '♐', dates: 'Nov 22 - Dec 21', element: 'Fire', ruler: 'Jupiter', color: '#A29BFE',
        reading: 'Adventure beckons from the horizon. Expand your worldview and embrace the unknown. Freedom and wisdom await.',
        love: 'Free-spirited connections inspire growth. Explore new social horizons.',
        career: 'International or educational ventures shine. Think big, aim higher.',
        health: 'Outdoor adventures energize your spirit. Explore new physical challenges.'
    },
    {
        name: 'Capricorn', symbol: '♑', dates: 'Dec 22 - Jan 19', element: 'Earth', ruler: 'Saturn', color: '#636E72',
        reading: 'Ambition meets opportunity today. Your disciplined approach builds lasting foundations. Patience and persistence triumph.',
        love: 'Commitment deepens. Build relationships on trust and mutual respect.',
        career: 'Authority figures take notice. Your work ethic opens important doors.',
        health: 'Structured routines build strength. Consistency is your wellness superpower.'
    },
    {
        name: 'Aquarius', symbol: '♒', dates: 'Jan 20 - Feb 18', element: 'Air', ruler: 'Uranus', color: '#00D2D3',
        reading: 'Innovative ideas flow freely. Your unique perspective changes the game. Embrace your individuality and inspire others.',
        love: 'Unconventional attractions spark interest. Value friendship in romance.',
        career: 'Technology and innovation favor you. Revolutionary ideas gain traction.',
        health: 'Experimental wellness approaches yield surprising results. Stay curious.'
    },
    {
        name: 'Pisces', symbol: '♓', dates: 'Feb 19 - Mar 20', element: 'Water', ruler: 'Neptune', color: '#48DBFB',
        reading: 'Dreams and reality blur beautifully today. Your artistic soul finds expression in everything you touch. Trust your vision.',
        love: 'Soulful connections transcend words. Let your empathy guide your heart.',
        career: 'Artistic and spiritual pursuits flourish. Your imagination is limitless.',
        health: 'Meditative practices restore your energy. Water healing soothes your spirit.'
    },
];

const Horoscope = () => {
    const [expandedSign, setExpandedSign] = useState(null);

    return (
        <div className="space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between pt-2">
                <Link to="/" className="p-2 rounded-full bg-surface/60 border border-white/5">
                    <ArrowLeft size={18} className="text-muted" />
                </Link>
                <h1 className="text-xl font-serif text-white">Daily Horoscope</h1>
                <div className="w-9" />
            </div>

            <p className="text-center text-muted text-xs">
                ✦ Select your sign for today's cosmic guidance ✦
            </p>

            {/* Zodiac Grid */}
            <div className="space-y-3">
                {zodiacData.map((sign, i) => (
                    <motion.div
                        key={sign.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                    >
                        <button
                            onClick={() => setExpandedSign(expandedSign === sign.name ? null : sign.name)}
                            className={`w-full text-left rounded-2xl border transition-all duration-300 ${expandedSign === sign.name
                                    ? 'bg-surface/80 border-primary/30 shadow-[0_0_30px_rgba(212,175,55,0.08)]'
                                    : 'bg-surface/40 border-white/5 hover:border-white/10'
                                }`}
                        >
                            <div className="flex items-center justify-between p-4">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                                        style={{ background: `${sign.color}20`, border: `1px solid ${sign.color}40` }}
                                    >
                                        {sign.symbol}
                                    </div>
                                    <div>
                                        <h3 className="text-white font-medium">{sign.name}</h3>
                                        <p className="text-xs text-muted">{sign.dates}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full bg-white/5 text-muted">
                                        {sign.element}
                                    </span>
                                    <ChevronDown
                                        size={16}
                                        className={`text-muted transition-transform duration-300 ${expandedSign === sign.name ? 'rotate-180' : ''
                                            }`}
                                    />
                                </div>
                            </div>
                        </button>

                        {/* Expanded Reading */}
                        <AnimatePresence>
                            {expandedSign === sign.name && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                >
                                    <div className="px-4 pb-4 pt-1 space-y-4 bg-surface/60 rounded-b-2xl border-x border-b border-primary/20">
                                        <p className="text-white/80 text-sm leading-relaxed font-serif italic">
                                            "{sign.reading}"
                                        </p>

                                        <div className="grid grid-cols-1 gap-2.5">
                                            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5">
                                                <Heart size={16} className="text-pink-400 mt-0.5 shrink-0" />
                                                <div>
                                                    <span className="text-xs text-pink-400 uppercase tracking-wider">Love</span>
                                                    <p className="text-xs text-white/70 mt-0.5">{sign.love}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5">
                                                <Briefcase size={16} className="text-blue-400 mt-0.5 shrink-0" />
                                                <div>
                                                    <span className="text-xs text-blue-400 uppercase tracking-wider">Career</span>
                                                    <p className="text-xs text-white/70 mt-0.5">{sign.career}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5">
                                                <Brain size={16} className="text-green-400 mt-0.5 shrink-0" />
                                                <div>
                                                    <span className="text-xs text-green-400 uppercase tracking-wider">Wellness</span>
                                                    <p className="text-xs text-white/70 mt-0.5">{sign.health}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 text-xs text-muted">
                                            <Star size={12} className="text-primary" fill="currentColor" />
                                            <span>Ruling Planet: {sign.ruler}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Horoscope;
