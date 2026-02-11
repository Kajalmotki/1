import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, RotateCcw, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const tarotDeck = [
    { name: 'The Fool', number: 0, meaning: 'New beginnings, innocence, spontaneity, free spirit', reversed: 'Holding back, recklessness, risk-taking', advice: 'Embrace the unknown with an open heart. A new chapter awaits.' },
    { name: 'The Magician', number: 1, meaning: 'Manifestation, resourcefulness, power, inspired action', reversed: 'Manipulation, poor planning, untapped talents', advice: 'You have all the tools you need. Focus your will and create your reality.' },
    { name: 'The High Priestess', number: 2, meaning: 'Intuition, sacred knowledge, divine feminine, the subconscious', reversed: 'Secrets, disconnected from intuition', advice: 'Listen to your inner voice. The answers you seek are already within you.' },
    { name: 'The Empress', number: 3, meaning: 'Femininity, beauty, nature, nurturing, abundance', reversed: 'Creative block, dependence on others', advice: 'Nurture yourself and others. Abundance flows when you connect with nature.' },
    { name: 'The Emperor', number: 4, meaning: 'Authority, establishment, structure, father figure', reversed: 'Domination, excessive control, lack of discipline', advice: 'Take charge of your situation. Structure and discipline will lead to success.' },
    { name: 'The Hierophant', number: 5, meaning: 'Spiritual wisdom, religious beliefs, tradition, institutions', reversed: 'Personal beliefs, freedom, challenging the status quo', advice: 'Seek wisdom from tradition, but don\'t be afraid to forge your own path.' },
    { name: 'The Lovers', number: 6, meaning: 'Love, harmony, relationships, values alignment, choices', reversed: 'Self-love, disharmony, imbalance', advice: 'Follow your heart. An important choice demands alignment with your true values.' },
    { name: 'The Chariot', number: 7, meaning: 'Control, willpower, success, action, determination', reversed: 'Self-discipline, opposition, lack of direction', advice: 'Stay focused and determined. Victory is yours if you hold the reins firmly.' },
    { name: 'Strength', number: 8, meaning: 'Strength, courage, persuasion, influence, compassion', reversed: 'Inner strength, self-doubt, raw emotion', advice: 'True strength is gentle. Lead with compassion and quiet courage.' },
    { name: 'The Hermit', number: 9, meaning: 'Soul-searching, introspection, being alone, inner guidance', reversed: 'Isolation, loneliness, withdrawal', advice: 'Retreat into solitude for clarity. Your inner light will guide the way.' },
    { name: 'Wheel of Fortune', number: 10, meaning: 'Good luck, karma, life cycles, destiny, turning point', reversed: 'Bad luck, resistance to change, breaking cycles', advice: 'Change is the only constant. Embrace this turning point with grace.' },
    { name: 'The Star', number: 17, meaning: 'Hope, faith, purpose, renewal, spirituality', reversed: 'Lack of faith, despair, self-trust', advice: 'Hope shines bright. Trust that the universe is conspiring in your favor.' },
    { name: 'The Moon', number: 18, meaning: 'Illusion, fear, anxiety, subconscious, intuition', reversed: 'Release of fear, repressed emotion', advice: 'Not everything is as it seems. Trust your intuition to navigate the shadows.' },
    { name: 'The Sun', number: 19, meaning: 'Positivity, fun, warmth, success, vitality', reversed: 'Inner child, feeling down, overly optimistic', advice: 'Joy radiates from within you. Share your warmth and watch it multiply.' },
    { name: 'The World', number: 21, meaning: 'Completion, integration, accomplishment, travel', reversed: 'Seeking personal closure, short-cuts', advice: 'A cycle completes. Celebrate your achievements and prepare for the next journey.' },
];

const cardGradients = [
    'from-indigo-600 to-purple-800',
    'from-purple-600 to-pink-800',
    'from-teal-600 to-blue-800',
    'from-amber-600 to-red-800',
    'from-emerald-600 to-teal-800',
];

const Tarot = () => {
    const [drawnCard, setDrawnCard] = useState(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [isRevealed, setIsRevealed] = useState(false);

    const drawCard = () => {
        if (isDrawing) return;
        setIsDrawing(true);
        setIsRevealed(false);
        setDrawnCard(null);

        setTimeout(() => {
            const randomCard = tarotDeck[Math.floor(Math.random() * tarotDeck.length)];
            const randomGradient = cardGradients[Math.floor(Math.random() * cardGradients.length)];
            setDrawnCard({ ...randomCard, gradient: randomGradient });
            setIsDrawing(false);
            setTimeout(() => setIsRevealed(true), 100);
        }, 1500);
    };

    const reset = () => {
        setDrawnCard(null);
        setIsRevealed(false);
    };

    return (
        <div className="space-y-6 min-h-[80vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between pt-2">
                <Link to="/" className="p-2 rounded-full bg-surface/60 border border-white/5">
                    <ArrowLeft size={18} className="text-muted" />
                </Link>
                <h1 className="text-xl font-serif text-white">Tarot Reading</h1>
                {drawnCard ? (
                    <button onClick={reset} className="p-2 rounded-full bg-surface/60 border border-white/5">
                        <RotateCcw size={18} className="text-muted" />
                    </button>
                ) : (
                    <div className="w-9" />
                )}
            </div>

            <div className="flex-1 flex flex-col items-center justify-center gap-6">
                <AnimatePresence mode="wait">
                    {!drawnCard && !isDrawing && (
                        <motion.div
                            key="deck"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="flex flex-col items-center gap-8"
                        >
                            {/* Card Stack */}
                            <div className="relative w-48 h-72">
                                {[...Array(5)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-secondary/80 to-primary/60 border-2 border-white/10 flex items-center justify-center"
                                        style={{
                                            transform: `rotate(${(i - 2) * 3}deg) translateY(${i * -2}px)`,
                                            zIndex: 5 - i,
                                        }}
                                        animate={{
                                            rotate: [(i - 2) * 3, (i - 2) * 3 + 1, (i - 2) * 3],
                                        }}
                                        transition={{
                                            duration: 3,
                                            repeat: Infinity,
                                            ease: 'easeInOut',
                                            delay: i * 0.2,
                                        }}
                                    >
                                        {i === 0 && (
                                            <div className="text-center">
                                                <div className="text-4xl mb-2">✦</div>
                                                <div className="text-xs uppercase tracking-[0.2em] text-white/60">Astrala</div>
                                                <div className="text-xs uppercase tracking-[0.2em] text-white/40">Tarot</div>
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>

                            <div className="text-center space-y-2">
                                <p className="text-muted text-sm">Focus on your question</p>
                                <p className="text-white/50 text-xs">Then draw your card</p>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={drawCard}
                                className="px-10 py-3.5 bg-gradient-to-r from-primary to-amber-500 text-background font-semibold rounded-full shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all"
                            >
                                Draw a Card
                            </motion.button>
                        </motion.div>
                    )}

                    {isDrawing && (
                        <motion.div
                            key="drawing"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center gap-6"
                        >
                            <motion.div
                                className="w-48 h-72 rounded-2xl bg-gradient-to-br from-secondary to-primary border-2 border-white/20 flex items-center justify-center"
                                animate={{ rotateY: [0, 180, 360], scale: [1, 1.1, 1] }}
                                transition={{ duration: 1.5, ease: 'easeInOut' }}
                            >
                                <Sparkles size={32} className="text-white animate-pulse" />
                            </motion.div>
                            <p className="text-primary text-sm animate-pulse">The cosmos speaks...</p>
                        </motion.div>
                    )}

                    {drawnCard && isRevealed && (
                        <motion.div
                            key="revealed"
                            initial={{ opacity: 0, rotateY: 90 }}
                            animate={{ opacity: 1, rotateY: 0 }}
                            className="flex flex-col items-center gap-6 w-full px-2"
                        >
                            {/* Revealed Card */}
                            <motion.div
                                className={`w-52 h-80 rounded-2xl bg-gradient-to-br ${drawnCard.gradient} border-2 border-white/20 flex flex-col items-center justify-center p-6 shadow-[0_0_40px_rgba(108,99,255,0.3)]`}
                                animate={{ y: [0, -5, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                            >
                                <span className="text-5xl mb-3">✦</span>
                                <span className="text-xs uppercase tracking-[0.3em] text-white/60 mb-2">
                                    {drawnCard.number !== undefined ? `${romanize(drawnCard.number)}` : ''}
                                </span>
                                <h2 className="text-xl font-serif text-white text-center">{drawnCard.name}</h2>
                            </motion.div>

                            {/* Card Details */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="w-full space-y-3"
                            >
                                <div className="bg-surface/60 border border-white/5 rounded-2xl p-4 space-y-3">
                                    <div>
                                        <span className="text-xs text-primary uppercase tracking-wider">Meaning</span>
                                        <p className="text-sm text-white/80 mt-1">{drawnCard.meaning}</p>
                                    </div>
                                    <div>
                                        <span className="text-xs text-secondary uppercase tracking-wider">Reversed</span>
                                        <p className="text-sm text-white/60 mt-1">{drawnCard.reversed}</p>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-2xl p-4">
                                    <span className="text-xs text-primary uppercase tracking-wider">✦ Your Guidance</span>
                                    <p className="text-white/90 font-serif text-sm mt-2 italic leading-relaxed">
                                        "{drawnCard.advice}"
                                    </p>
                                </div>

                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    onClick={reset}
                                    className="w-full py-3 border border-white/10 rounded-xl text-muted text-sm hover:border-white/20 transition-colors"
                                >
                                    Draw Another Card
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

function romanize(num) {
    if (num === 0) return '0';
    const lookup = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 };
    let roman = '';
    for (const key in lookup) {
        while (num >= lookup[key]) { roman += key; num -= lookup[key]; }
    }
    return roman;
}

export default Tarot;
