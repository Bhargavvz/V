import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { DayLayout } from '../components/DayLayout';
import { getDayById } from '../config/days';
import './KissDay.css';

// {{PERSONALIZE}} - Add your messages here
const KISS_MESSAGES = [
    "Every kiss from you feels like the first one 💋",
    "I miss your lips when you're away 💕",
    "Your kisses are my favorite hello and hardest goodbye",
    "One kiss from you and I forget what I was worried about",
    "You make butterflies feel jealous 🦋",
];

const SECRET_NOTE = `
Sometimes I think about
the way you look at me
right before you lean in...

That moment.
That split second.
That's my favorite.

Because I know what's coming.
And I'm already falling again. 💋
`;

export function KissDay() {
    const day = getDayById('kiss')!;
    const [hearts, setHearts] = useState<Array<{ id: number; x: number; y: number }>>([]);
    const [messageIndex, setMessageIndex] = useState(0);
    const [showSecret, setShowSecret] = useState(false);
    const [kissesSent, setKissesSent] = useState(0);

    // Floating lips
    const floatingLips = useMemo(() =>
        [...Array(15)].map((_, i) => ({
            id: i,
            left: Math.random() * 100,
            delay: Math.random() * 12,
            duration: 12 + Math.random() * 8,
        })), []
    );

    // Handle screen tap to send a kiss
    const handleSendKiss = (e: React.MouseEvent | React.TouchEvent) => {
        const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const y = 'touches' in e ? e.touches[0].clientY : e.clientY;

        const newHeart = {
            id: Date.now(),
            x,
            y,
        };

        setHearts(prev => [...prev, newHeart]);
        setKissesSent(prev => prev + 1);

        // Change message occasionally
        if (kissesSent % 3 === 0) {
            setMessageIndex(prev => (prev + 1) % KISS_MESSAGES.length);
        }

        // Vibrate
        if (navigator.vibrate) {
            navigator.vibrate(30);
        }

        // Remove heart after animation
        setTimeout(() => {
            setHearts(prev => prev.filter(h => h.id !== newHeart.id));
        }, 1500);
    };

    return (
        <DayLayout
            dayName={day.name}
            emoji={day.emoji}
            gradient={day.gradient}
        >
            {/* Floating Lips */}
            <div className="floating-lips">
                {floatingLips.map(lip => (
                    <motion.span
                        key={lip.id}
                        className="floating-lip"
                        style={{
                            left: `${lip.left}%`,
                            animationDelay: `${lip.delay}s`,
                            animationDuration: `${lip.duration}s`,
                        }}
                    >
                        💋
                    </motion.span>
                ))}
            </div>

            {/* Click Hearts */}
            <div className="hearts-layer">
                <AnimatePresence>
                    {hearts.map(heart => (
                        <motion.span
                            key={heart.id}
                            className="click-heart"
                            initial={{ x: heart.x, y: heart.y, scale: 0, opacity: 1 }}
                            animate={{
                                y: heart.y - 150,
                                scale: [0, 1.5, 1],
                                opacity: [1, 1, 0],
                            }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.5 }}
                            style={{ left: 0, top: 0, position: 'fixed' }}
                        >
                            {['💋', '💕', '❤️', '💗'][Math.floor(Math.random() * 4)]}
                        </motion.span>
                    ))}
                </AnimatePresence>
            </div>

            {/* Main Content */}
            <div
                className="kiss-container"
                onClick={handleSendKiss}
            >
                {/* Intro */}
                <motion.div
                    className="kiss-intro"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <p>Tap anywhere to send a kiss 💋</p>
                </motion.div>

                {/* Main Kiss */}
                <motion.div
                    className="main-kiss"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.3 }}
                    whileTap={{ scale: 1.1 }}
                >
                    <span className="kiss-emoji">💋</span>
                    <div className="kiss-glow" />
                </motion.div>

                {/* Message */}
                <motion.div
                    className="kiss-message"
                    key={messageIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <p>{KISS_MESSAGES[messageIndex]}</p>
                </motion.div>

                {/* Counter */}
                <motion.div
                    className="kiss-counter"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <span className="counter-emoji">💋</span>
                    <span className="counter-value">{kissesSent}</span>
                    <span className="counter-label">kisses sent</span>
                </motion.div>

                {/* Secret Button */}
                <motion.button
                    className="secret-note-btn"
                    onClick={(e) => {
                        e.stopPropagation();
                        setShowSecret(true);
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    <span>💌</span>
                    <span>A Secret for You</span>
                </motion.button>
            </div>

            {/* Secret Note */}
            <AnimatePresence>
                {showSecret && (
                    <motion.div
                        className="secret-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowSecret(false)}
                    >
                        <motion.div
                            className="secret-card"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <span className="secret-emoji">💋</span>
                            <div className="secret-content">{SECRET_NOTE}</div>
                            <motion.button
                                className="close-secret"
                                onClick={() => setShowSecret(false)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Close 💕
                            </motion.button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </DayLayout>
    );
}
