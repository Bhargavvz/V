import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHeart } from 'react-icons/fi';
import { DayLayout } from '../components/DayLayout';
import { getDayById } from '../config/days';
import './RoseDay.css';



// Warm compliments
const COMPLIMENTS = [
    { emoji: '✨', text: "Your smile makes my hardest days feel okay" },
    { emoji: '🌙', text: "You're my favorite 'what if' that became real" },
    { emoji: '💫', text: "Being loved by you is the best thing I've ever felt" },
    { emoji: '🦋', text: "You make me want to be a better person every day" },
    { emoji: '🌟', text: "My favorite sound is your laugh — I'd do anything to hear it" },
    { emoji: '🌈', text: "Home isn't a place anymore — it's wherever you are" },
    { emoji: '💖', text: "You're the first and last person I want to talk to every day" },
    { emoji: '⭐', text: "I didn't know what I was missing until I met you" },
    { emoji: '💝', text: "You turn my ordinary moments into memories" },
];

const SECRET_MESSAGE = `Before love truly begins, it starts with admiration.
And I admire everything about you.

I admire the way you care so deeply for the people you love.
The way you keep going even when life gets hard.
The way you still find a way to make me smile
even on the days when you're the most tired.

This rose is just the beginning.
There's so much more waiting for you —
so many moments, memories, and dreams yet to unfold.

From someone who will never stop choosing you. 🌹`;

export function RoseDay() {
    const day = getDayById('rose')!;
    const [revealedCards, setRevealedCards] = useState<number[]>([]);
    const [isGlowing, setIsGlowing] = useState(false);
    const [showSecret, setShowSecret] = useState(false);



    const handleRevealCard = (index: number) => {
        if (!revealedCards.includes(index)) {
            setRevealedCards([...revealedCards, index]);
        }
    };

    const handleRoseClick = () => {
        const unrevealed = COMPLIMENTS.map((_, i) => i).filter(i => !revealedCards.includes(i));
        if (unrevealed.length > 0) {
            const randomIndex = unrevealed[Math.floor(Math.random() * unrevealed.length)];
            handleRevealCard(randomIndex);
        }
        setIsGlowing(true);
        setTimeout(() => setIsGlowing(false), 1000);
    };

    const allRevealed = revealedCards.length === COMPLIMENTS.length;

    return (
        <DayLayout
            dayName={day.name}
            emoji={day.emoji}
            gradient={day.gradient}
            darkText
        >
            {/* Elegant Background */}
            <div className="rose-bg-glow">
                <div className="rose-glow-orb" />
                <div className="rose-glow-orb" />
                <div className="rose-glow-orb" />
            </div>
            <div className="rose-light-rays" />

            <div className="rose-container">
                <motion.p
                    className="rose-intro"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    They say roses represent love at first sight...
                    <br />
                    <span className="intro-sub">Tap the rose to discover something about you 💕</span>
                </motion.p>

                <motion.div
                    className={`main-rose ${isGlowing ? 'glowing' : ''}`}
                    onClick={handleRoseClick}
                    whileTap={{ scale: 0.95 }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.5 }}
                >
                    <div className="rose-glow" />
                    <motion.span
                        className="rose-flower"
                        animate={{
                            rotate: isGlowing ? [0, -8, 8, -5, 5, 0] : 0,
                            scale: isGlowing ? [1, 1.1, 1] : 1,
                        }}
                        transition={{ duration: 0.6 }}
                    >
                        🌹
                    </motion.span>
                </motion.div>

                <motion.p
                    className="tap-hint"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                >
                    Tap the rose
                </motion.p>

                <div className="compliments-section">
                    <h3 className="compliments-title">
                        <FiHeart style={{ marginRight: 8 }} fill="currentColor" />
                        Things I Love About You
                    </h3>

                    <div className="compliments-grid">
                        {COMPLIMENTS.map((compliment, index) => (
                            <motion.div
                                key={index}
                                className={`compliment-card ${revealedCards.includes(index) ? 'revealed' : ''}`}
                                onClick={() => handleRevealCard(index)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 + index * 0.05 }}
                            >
                                <AnimatePresence mode="wait">
                                    {revealedCards.includes(index) ? (
                                        <motion.div
                                            key="revealed"
                                            initial={{ opacity: 0, rotateY: 90 }}
                                            animate={{ opacity: 1, rotateY: 0 }}
                                            className="card-inner"
                                        >
                                            <span className="compliment-emoji">{compliment.emoji}</span>
                                            <p className="compliment-text">{compliment.text}</p>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="hidden"
                                            className="card-inner hidden"
                                        >
                                            <span className="compliment-emoji">🌸</span>
                                            <p className="compliment-locked">Tap to reveal</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>

                    <AnimatePresence>
                        {allRevealed && (
                            <motion.div
                                className="all-revealed-message"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                💕 You've discovered all the reasons! But there are infinite more...
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <motion.button
                    className="secret-button"
                    onClick={() => setShowSecret(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                >
                    <span className="secret-icon">💌</span>
                    <span>Read My Letter to You</span>
                </motion.button>
            </div>

            <AnimatePresence>
                {showSecret && (
                    <motion.div
                        className="letter-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowSecret(false)}
                    >
                        <motion.div
                            className="letter-paper"
                            initial={{ scale: 0.8, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: 50 }}
                            transition={{ type: 'spring', damping: 25 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="letter-header">
                                <span className="letter-rose">🌹</span>
                                <h3>For You</h3>
                            </div>
                            <div className="letter-content">{SECRET_MESSAGE}</div>
                            <motion.button
                                className="letter-close"
                                onClick={() => setShowSecret(false)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Close with Love 💕
                            </motion.button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </DayLayout>
    );
}
