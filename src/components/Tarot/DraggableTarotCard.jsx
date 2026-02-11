import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import './DraggableTarotCard.css';

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
    'linear-gradient(135deg, #4338ca 0%, #7e22ce 100%)',
    'linear-gradient(135deg, #7e22ce 0%, #be185d 100%)',
    'linear-gradient(135deg, #0d9488 0%, #1e40af 100%)',
    'linear-gradient(135deg, #d97706 0%, #dc2626 100%)',
    'linear-gradient(135deg, #059669 0%, #0d9488 100%)',
];

function romanize(num) {
    if (num === 0) return '0';
    const lookup = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 };
    let roman = '';
    for (const key in lookup) {
        while (num >= lookup[key]) { roman += key; num -= lookup[key]; }
    }
    return roman;
}

const DailyTarotSection = () => {
    const [dailyCard, setDailyCard] = useState(null);
    const [isRevealing, setIsRevealing] = useState(false);
    const [dropActive, setDropActive] = useState(false);
    const dropZoneRef = useRef(null);
    const constraintsRef = useRef(null);

    const fanAngles = [-12, 0, 12];
    const fanOffsets = [-30, 0, 30];

    const checkDropZone = useCallback((info) => {
        if (!dropZoneRef.current) return false;
        const dropRect = dropZoneRef.current.getBoundingClientRect();
        const cardCenterX = info.point.x;
        const cardCenterY = info.point.y;
        return (
            cardCenterX >= dropRect.left - 30 &&
            cardCenterX <= dropRect.right + 30 &&
            cardCenterY >= dropRect.top - 30 &&
            cardCenterY <= dropRect.bottom + 30
        );
    }, []);

    const handleDrag = useCallback((event, info) => {
        const isOver = checkDropZone(info);
        setDropActive(isOver);
    }, [checkDropZone]);

    const handleDragEnd = useCallback((event, info) => {
        const isOver = checkDropZone(info);
        setDropActive(false);

        if (isOver) {
            setIsRevealing(true);
            const randomCard = tarotDeck[Math.floor(Math.random() * tarotDeck.length)];
            const randomGradient = cardGradients[Math.floor(Math.random() * cardGradients.length)];
            setTimeout(() => {
                setDailyCard({ ...randomCard, gradient: randomGradient });
                setIsRevealing(false);
            }, 600);
        }
    }, [checkDropZone]);

    const reset = () => {
        setDailyCard(null);
        setIsRevealing(false);
    };

    return (
        <div className="daily-card-section">
            <div className="section-header">
                <span style={{ fontSize: 14, color: 'rgba(212,175,55,0.8)' }}>✦</span>
                <h3>Your Daily Card</h3>
            </div>

            <AnimatePresence mode="wait">
                {!dailyCard && !isRevealing && (
                    <motion.div
                        key="drag-area"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        ref={constraintsRef}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 20,
                            position: 'relative',
                            minHeight: 340,
                            paddingTop: 8,
                        }}
                    >
                        {/* Drop Zone */}
                        <div
                            ref={dropZoneRef}
                            className={`drop-zone ${dropActive ? 'active' : ''}`}
                        >
                            <span className="zone-icon">✦</span>
                            <span className="zone-text">Drop here</span>
                        </div>

                        {/* Card Fan */}
                        <div className="card-fan" style={{ marginTop: -10 }}>
                            {fanAngles.map((angle, i) => (
                                <motion.div
                                    key={i}
                                    className="fan-card"
                                    style={{
                                        marginLeft: -70,
                                        left: `calc(50% + ${fanOffsets[i]}px)`,
                                        zIndex: i === 1 ? 10 : 5,
                                    }}
                                    initial={{ rotate: angle, y: 20, opacity: 0 }}
                                    animate={{ rotate: angle, y: 0, opacity: 1 }}
                                    transition={{ delay: i * 0.1, type: 'spring', stiffness: 200 }}
                                    drag
                                    dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                                    dragElastic={1}
                                    dragSnapToOrigin={true}
                                    onDrag={handleDrag}
                                    onDragEnd={handleDragEnd}
                                    whileDrag={{
                                        scale: 1.08,
                                        rotate: 0,
                                        zIndex: 50,
                                        boxShadow: '0 20px 60px rgba(108, 99, 255, 0.3), 0 0 40px rgba(212, 175, 55, 0.2)',
                                    }}
                                >
                                    <div className="tarot-card-back">
                                        <span className="card-symbol">✦</span>
                                        <span className="card-brand">Astrala</span>
                                        <span className="card-brand" style={{ marginTop: -4, opacity: 0.6 }}>Tarot</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <p className="drag-instruction">
                            Drag a card to <span>reveal your reading</span>
                        </p>
                    </motion.div>
                )}

                {isRevealing && (
                    <motion.div
                        key="revealing"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minHeight: 340,
                            gap: 16,
                        }}
                    >
                        <motion.div
                            className="tarot-card-back"
                            style={{ width: 160, height: 240 }}
                            animate={{
                                rotateY: [0, 90, 180, 270, 360],
                                scale: [1, 1.1, 1.15, 1.1, 1],
                            }}
                            transition={{ duration: 0.6, ease: 'easeInOut' }}
                        >
                            <span className="card-symbol">✦</span>
                        </motion.div>
                        <motion.p
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            style={{ fontSize: 13, color: 'rgba(212, 175, 55, 0.8)' }}
                        >
                            The cosmos speaks...
                        </motion.p>
                    </motion.div>
                )}

                {dailyCard && !isRevealing && (
                    <motion.div
                        key="revealed"
                        initial={{ opacity: 0, rotateY: 90 }}
                        animate={{ opacity: 1, rotateY: 0 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 16,
                            width: '100%',
                        }}
                    >
                        {/* Revealed Card */}
                        <motion.div
                            className="revealed-card"
                            style={{ background: dailyCard.gradient }}
                            animate={{ y: [0, -4, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            <span className="card-star">✦</span>
                            <span className="card-numeral">
                                {dailyCard.number !== undefined ? romanize(dailyCard.number) : ''}
                            </span>
                            <span className="card-name">{dailyCard.name}</span>
                        </motion.div>

                        {/* Reading Details */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}
                        >
                            <div className="reading-panel" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                <div>
                                    <div className="label" style={{ color: 'rgba(212, 175, 55, 0.8)' }}>Meaning</div>
                                    <div className="value">{dailyCard.meaning}</div>
                                </div>
                                <div>
                                    <div className="label" style={{ color: 'rgba(108, 99, 255, 0.8)' }}>Reversed</div>
                                    <div className="value" style={{ color: 'rgba(255,255,255,0.6)' }}>{dailyCard.reversed}</div>
                                </div>
                            </div>

                            <div
                                className="reading-panel"
                                style={{
                                    background: 'linear-gradient(135deg, rgba(212,175,55,0.08), rgba(108,99,255,0.08))',
                                    borderColor: 'rgba(212,175,55,0.15)',
                                }}
                            >
                                <div className="label" style={{ color: 'rgba(212, 175, 55, 0.8)' }}>✦ Your Guidance</div>
                                <p
                                    className="value"
                                    style={{
                                        fontFamily: "'Playfair Display', serif",
                                        fontStyle: 'italic',
                                        color: 'rgba(255,255,255,0.9)',
                                        lineHeight: 1.7,
                                    }}
                                >
                                    "{dailyCard.advice}"
                                </p>
                            </div>

                            <button onClick={reset} className="reset-btn">
                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                                    <RotateCcw size={14} />
                                    Draw Again
                                </span>
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default DailyTarotSection;
