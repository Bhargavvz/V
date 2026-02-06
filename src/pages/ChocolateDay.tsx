import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiLock, FiUnlock } from 'react-icons/fi';
import { DayLayout } from '../components/DayLayout';
import { getDayById } from '../config/days';
import { useValentine } from '../context/ValentineContext';
import './ChocolateDay.css';

const MEMORIES = [
    {
        emoji: '💕',
        title: 'Our First Date',
        text: "We've been on many dates, but our first one will always be my favorite. That was the day I truly felt special — the day everything felt different.",
        secret: false,
    },
    {
        emoji: '🌙',
        title: 'Late-Night Talks',
        text: "Those 3 a.m. conversations where we talked about everything and nothing. I never wanted those moments to end.",
        secret: false,
    },
    {
        emoji: '😊',
        title: 'Our Everlasting Fun',
        text: "So many memories filled with laughter — our silly jokes, endless gossip, and carefree moments. Every second of it is something I cherish.",
        secret: false,
    },
    {
        emoji: '🤭',
        title: 'Inside Jokes',
        text: "No one else understands why we laugh at the most random things. And that's what makes it ours — something beautifully special.",
        secret: false,
    },
    {
        emoji: '🙈',
        title: 'Innocent You',
        text: "You were so innocent when we started. I may have spoiled you a little — okay, a lot. Now you're a pro at understanding double meanings… and yes, that's completely my fault.",
        secret: false,
    },
    {
        emoji: '💝',
        title: 'Special Chocolate',
        text: 'This one is just for you... Tap to unlock it.',
        secret: true,
        secretContent: 'You are the sweetest thing in my life — sweeter than any chocolate in the world. Thank you for making every day feel like a gift. I love you more than words can ever express. 🍫❤️',
    },
];

export function ChocolateDay() {
    const day = getDayById('chocolate')!;
    useValentine();
    const [openedBoxes, setOpenedBoxes] = useState<number[]>([]);
    const [selectedMemory, setSelectedMemory] = useState<number | null>(null);
    const [secretUnlocked, setSecretUnlocked] = useState(false);

    const handleOpenBox = (index: number) => {
        if (!openedBoxes.includes(index)) {
            setOpenedBoxes([...openedBoxes, index]);
        }
        setSelectedMemory(index);
    };

    const handleUnlockSecret = () => {
        setSecretUnlocked(true);
        if (navigator.vibrate) {
            navigator.vibrate([50, 30, 100]);
        }
    };

    const memory = selectedMemory !== null ? MEMORIES[selectedMemory] : null;

    return (
        <DayLayout
            dayName={day.name}
            emoji={day.emoji}
            gradient={day.gradient}
            darkText
        >
            {/* Elegant Background */}
            <div className="chocolate-bg-glow">
                <div className="chocolate-glow-orb" />
                <div className="chocolate-glow-orb" />
                <div className="chocolate-glow-orb" />
            </div>
            <div className="chocolate-warm-overlay" />

            <div className="chocolate-container">
                <motion.div
                    className="chocolate-intro"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <p>Every chocolate holds a memory...</p>
                    <p className="intro-sub">Tap each one to unwrap our special moments 🍫</p>
                </motion.div>

                <div className="chocolate-box">
                    <div className="box-ribbon">
                        <span>💝</span>
                    </div>

                    <div className="chocolates-grid">
                        {MEMORIES.map((mem, index) => (
                            <motion.div
                                key={index}
                                className={`chocolate-item ${openedBoxes.includes(index) ? 'opened' : ''} ${mem.secret ? 'secret' : ''}`}
                                onClick={() => handleOpenBox(index)}
                                whileHover={{ scale: 1.05, y: -5 }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 + index * 0.1 }}
                            >
                                <div className="chocolate-wrapper">
                                    {openedBoxes.includes(index) ? (
                                        <span className="chocolate-emoji">{mem.emoji}</span>
                                    ) : mem.secret ? (
                                        <FiLock className="lock-icon" />
                                    ) : (
                                        <span className="chocolate-emoji">🍫</span>
                                    )}
                                </div>
                                {openedBoxes.includes(index) && (
                                    <motion.p
                                        className="chocolate-title"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                    >
                                        {mem.title}
                                    </motion.p>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>

                <motion.p
                    className="progress-text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    {openedBoxes.length} of {MEMORIES.length} memories unwrapped
                </motion.p>
            </div>

            <AnimatePresence>
                {selectedMemory !== null && memory && (
                    <motion.div
                        className="memory-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedMemory(null)}
                    >
                        <motion.div
                            className="memory-card"
                            initial={{ scale: 0.8, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <span className="memory-emoji">{memory.emoji}</span>
                            <h3 className="memory-title">{memory.title}</h3>

                            {memory.secret && !secretUnlocked ? (
                                <div className="secret-prompt">
                                    <p>{memory.text}</p>
                                    <motion.button
                                        className="unlock-secret-btn"
                                        onClick={handleUnlockSecret}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <FiUnlock />
                                        <span>Unlock with Love</span>
                                    </motion.button>
                                </div>
                            ) : (
                                <p className="memory-text">
                                    {memory.secret ? memory.secretContent : memory.text}
                                </p>
                            )}

                            <motion.button
                                className="close-memory-btn"
                                onClick={() => setSelectedMemory(null)}
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
