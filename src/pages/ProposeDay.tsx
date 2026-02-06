import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHeart } from 'react-icons/fi';
import { DayLayout } from '../components/DayLayout';
import { getDayById } from '../config/days';
import './ProposeDay.css';

const PROPOSAL_LETTER = `My dear Gunni,

I've tried countless times to find the perfect words,
but every version felt incomplete.
How do you put into words something that feels infinite?

You walked into my life and turned my world upside down —
in the most beautiful way possible.
You showed me what it means to be truly seen, truly heard, and deeply loved.

I'm not perfect. I have my flaws, my bad days, my moments of doubt.
But with you, I feel like the best version of myself.
You inspire me to grow, to try harder, to become someone worthy
of the love you give so effortlessly.

So here I am —
not with a grand gesture or a rehearsed speech,
but with my heart, honest and completely yours.

Will you be mine?
Not just today, but for all the tomorrows I can promise.
I choose you — every morning, every night,
through every storm and every sunshine.

Forever yours,
Bhargav 💍`;

const FIREWORK_EMOJIS = ['✨', '💫', '🎆', '💖', '💕', '🌟', '⭐', '💗'];

export function ProposeDay() {
    const day = getDayById('propose')!;
    const [letterText, setLetterText] = useState('');
    const [isTyping, setIsTyping] = useState(true);
    const [showEnvelope, setShowEnvelope] = useState(true);
    const [envelopeOpened, setEnvelopeOpened] = useState(false);
    const [accepted, setAccepted] = useState(false);
    const [fireworks, setFireworks] = useState<Array<{ id: number; x: number; y: number; emoji: string }>>([]);
    const typingRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (!envelopeOpened) return;

        let index = 0;
        setIsTyping(true);
        setLetterText('');

        const type = () => {
            if (index < PROPOSAL_LETTER.length) {
                setLetterText(PROPOSAL_LETTER.slice(0, index + 1));
                index++;
                const delay = PROPOSAL_LETTER[index - 1] === '\n' ? 200 :
                    PROPOSAL_LETTER[index - 1] === '.' ? 150 :
                        PROPOSAL_LETTER[index - 1] === ',' ? 80 : 30;
                typingRef.current = setTimeout(type, delay);
            } else {
                setIsTyping(false);
            }
        };

        typingRef.current = setTimeout(type, 500);

        return () => {
            if (typingRef.current) clearTimeout(typingRef.current);
        };
    }, [envelopeOpened]);

    const handleOpenEnvelope = () => {
        setShowEnvelope(false);
        setTimeout(() => setEnvelopeOpened(true), 800);
    };

    const skipTyping = () => {
        if (typingRef.current) clearTimeout(typingRef.current);
        setLetterText(PROPOSAL_LETTER);
        setIsTyping(false);
    };

    const handleAccept = () => {
        setAccepted(true);

        if (navigator.vibrate) {
            navigator.vibrate([100, 50, 100, 50, 200]);
        }

        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const fw = {
                    id: Date.now() + i,
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    emoji: FIREWORK_EMOJIS[Math.floor(Math.random() * FIREWORK_EMOJIS.length)],
                };
                setFireworks(prev => [...prev, fw]);
                setTimeout(() => {
                    setFireworks(prev => prev.filter(f => f.id !== fw.id));
                }, 2000);
            }, i * 100);
        }
    };

    return (
        <DayLayout
            dayName={day.name}
            emoji={day.emoji}
            gradient={day.gradient}
        >
            <div className="fireworks-container">
                <AnimatePresence>
                    {fireworks.map(fw => (
                        <motion.span
                            key={fw.id}
                            className="firework"
                            initial={{ opacity: 0, scale: 0, x: fw.x, y: fw.y }}
                            animate={{ opacity: [0, 1, 1, 0], scale: [0, 1.5, 1.5, 0], y: fw.y - 100 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 2 }}
                            style={{ left: fw.x, top: fw.y }}
                        >
                            {fw.emoji}
                        </motion.span>
                    ))}
                </AnimatePresence>
            </div>

            <div className="propose-container">
                <AnimatePresence>
                    {showEnvelope && (
                        <motion.div
                            className="envelope-container"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0, y: -100 }}
                            transition={{ type: 'spring', damping: 20 }}
                        >
                            <p className="envelope-intro">
                                I have something to tell you...
                            </p>

                            <motion.div
                                className="envelope"
                                onClick={handleOpenEnvelope}
                                whileHover={{ scale: 1.05, y: -5 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <div className="envelope-body">
                                    <div className="envelope-flap" />
                                    <div className="envelope-heart">💌</div>
                                </div>
                            </motion.div>

                            <p className="envelope-hint">Tap to open</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {envelopeOpened && !accepted && (
                        <motion.div
                            className="letter-container"
                            initial={{ opacity: 0, y: 50, rotateX: -20 }}
                            animate={{ opacity: 1, y: 0, rotateX: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            <div className="letter-paper">
                                <div className="letter-header">
                                    <span className="letter-icon">💍</span>
                                </div>

                                <div className="letter-body">
                                    <p className="letter-text">{letterText}</p>
                                    {isTyping && <span className="typing-cursor">|</span>}
                                </div>

                                {isTyping && (
                                    <motion.button
                                        className="skip-button"
                                        onClick={skipTyping}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 2 }}
                                    >
                                        Skip to end →
                                    </motion.button>
                                )}

                                {!isTyping && (
                                    <motion.div
                                        className="response-section"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        <p className="response-prompt">What do you say?</p>
                                        <motion.button
                                            className="accept-button"
                                            onClick={handleAccept}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <FiHeart fill="currentColor" />
                                            <span>Yes, I'm Yours</span>
                                        </motion.button>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {accepted && (
                        <motion.div
                            className="accepted-container"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ type: 'spring', damping: 15 }}
                        >
                            <motion.div
                                className="accepted-ring"
                                animate={{
                                    rotate: [0, 360],
                                    scale: [1, 1.1, 1],
                                }}
                                transition={{
                                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                                    scale: { duration: 2, repeat: Infinity },
                                }}
                            >
                                💍
                            </motion.div>

                            <h2 className="accepted-title">You Said Yes!</h2>
                            <p className="accepted-subtitle">
                                This is the happiest moment of my life
                            </p>

                            <div className="accepted-message">
                                <p>
                                    I promise to cherish you, support you, and love you
                                    with everything I have. Every single day.
                                </p>
                                <p className="signature">
                                    Forever & Always 💕
                                </p>
                            </div>

                            <motion.div
                                className="accepted-hearts"
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                💕✨💍✨💕
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </DayLayout>
    );
}
