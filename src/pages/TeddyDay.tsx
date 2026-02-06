import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { FiHeart } from 'react-icons/fi';
import { DayLayout } from '../components/DayLayout';
import { getDayById } from '../config/days';
import './TeddyDay.css';

// {{PERSONALIZE}} - Add your own comforting messages
const COMFORT_MESSAGES = [
    "I'm always here for you, no matter what 🧸",
    "You make everything feel safe and warm 💕",
    "When you're sad, I want to hold you close",
    "You're my favorite person to do nothing with",
    "Your hugs are my favorite place to be 🤗",
    "I'd choose you over and over again",
    "You're not just my love — you're my best friend",
];

export function TeddyDay() {
    const day = getDayById('teddy')!;
    const [isHugging, setIsHugging] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [messageIndex, setMessageIndex] = useState(0);
    const [hugCount, setHugCount] = useState(0);
    const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Mouse/touch tracking for teddy eyes
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { stiffness: 150, damping: 15 });
    const springY = useSpring(mouseY, { stiffness: 150, damping: 15 });

    // Floating hearts
    const floatingHearts = useMemo(() =>
        [...Array(12)].map((_, i) => ({
            id: i,
            left: Math.random() * 100,
            delay: Math.random() * 10,
            duration: 10 + Math.random() * 8,
        })), []
    );

    // Track mouse/touch for teddy eyes
    useEffect(() => {
        const handleMove = (e: MouseEvent | TouchEvent) => {
            const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
            const y = 'touches' in e ? e.touches[0].clientY : e.clientY;

            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;

            mouseX.set((x - centerX) / centerX * 15);
            mouseY.set((y - centerY) / centerY * 10);
        };

        window.addEventListener('mousemove', handleMove);
        window.addEventListener('touchmove', handleMove);

        return () => {
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('touchmove', handleMove);
        };
    }, [mouseX, mouseY]);

    // Show message on idle
    useEffect(() => {
        const startIdleTimer = () => {
            if (idleTimer.current) clearTimeout(idleTimer.current);
            idleTimer.current = setTimeout(() => {
                setShowMessage(true);
                setMessageIndex(Math.floor(Math.random() * COMFORT_MESSAGES.length));
            }, 5000);
        };

        const resetIdleTimer = () => {
            setShowMessage(false);
            startIdleTimer();
        };

        window.addEventListener('mousemove', resetIdleTimer);
        window.addEventListener('touchstart', resetIdleTimer);
        startIdleTimer();

        return () => {
            if (idleTimer.current) clearTimeout(idleTimer.current);
            window.removeEventListener('mousemove', resetIdleTimer);
            window.removeEventListener('touchstart', resetIdleTimer);
        };
    }, []);

    const handleHug = () => {
        setIsHugging(true);
        setHugCount(prev => prev + 1);
        if (navigator.vibrate) {
            navigator.vibrate([50, 30, 50]);
        }
        setTimeout(() => setIsHugging(false), 2000);
    };

    return (
        <DayLayout
            dayName={day.name}
            emoji={day.emoji}
            gradient={day.gradient}
            darkText
        >
            {/* Floating Hearts */}
            <div className="floating-hearts-bg">
                {floatingHearts.map(h => (
                    <motion.span
                        key={h.id}
                        className="float-heart"
                        style={{
                            left: `${h.left}%`,
                            animationDelay: `${h.delay}s`,
                            animationDuration: `${h.duration}s`,
                        }}
                    >
                        💕
                    </motion.span>
                ))}
            </div>

            {/* Main Content */}
            <div className="teddy-container">
                {/* Intro */}
                <motion.div
                    className="teddy-intro"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <p>Sometimes we all need something soft to hold onto...</p>
                    <p className="intro-sub">This teddy follows you with love 🧸</p>
                </motion.div>

                {/* Teddy Bear */}
                <motion.div
                    className={`teddy-bear ${isHugging ? 'hugging' : ''}`}
                    onClick={handleHug}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <div className="teddy-body">
                        {/* Ears */}
                        <div className="teddy-ear left" />
                        <div className="teddy-ear right" />

                        {/* Face */}
                        <div className="teddy-face">
                            {/* Eyes that follow cursor */}
                            <div className="teddy-eyes">
                                <motion.div
                                    className="teddy-eye left"
                                    style={{ x: springX, y: springY }}
                                >
                                    <div className="eye-pupil" />
                                </motion.div>
                                <motion.div
                                    className="teddy-eye right"
                                    style={{ x: springX, y: springY }}
                                >
                                    <div className="eye-pupil" />
                                </motion.div>
                            </div>

                            {/* Nose */}
                            <div className="teddy-nose">
                                <div className="nose-shape" />
                            </div>

                            {/* Mouth */}
                            <div className={`teddy-mouth ${isHugging ? 'smiling' : ''}`} />
                        </div>

                        {/* Arms */}
                        <div className={`teddy-arm left ${isHugging ? 'hugging' : ''}`} />
                        <div className={`teddy-arm right ${isHugging ? 'hugging' : ''}`} />

                        {/* Heart */}
                        <motion.div
                            className="teddy-heart"
                            animate={isHugging ? { scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] } : {}}
                            transition={{ duration: 0.5, repeat: isHugging ? 3 : 0 }}
                        >
                            <FiHeart fill="#ff6b9d" stroke="#ff6b9d" />
                        </motion.div>
                    </div>
                </motion.div>

                {/* Tap hint */}
                <motion.p
                    className="hug-hint"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    Tap the teddy for a hug 🤗
                </motion.p>

                {/* Hug Counter */}
                {hugCount > 0 && (
                    <motion.div
                        className="hug-counter"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <span className="counter-emoji">🤗</span>
                        <span className="counter-text">{hugCount} {hugCount === 1 ? 'hug' : 'hugs'} shared</span>
                    </motion.div>
                )}

                {/* Idle Message */}
                {showMessage && (
                    <motion.div
                        className="idle-message"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                    >
                        <p>{COMFORT_MESSAGES[messageIndex]}</p>
                    </motion.div>
                )}

                {/* Footer Message */}
                <motion.div
                    className="teddy-footer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                >
                    <p>
                        "Like a teddy bear, I promise to always be here —<br />
                        to comfort you, to listen, and to love you unconditionally."
                    </p>
                </motion.div>
            </div>
        </DayLayout>
    );
}
