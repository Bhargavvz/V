import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHeart } from 'react-icons/fi';
import { DAYS } from '../config/days';
import type { DayConfig } from '../config/days';
import { DayCard } from '../components/DayCard';
import { PasswordModal } from '../components/PasswordModal';
import { useValentine } from '../context/ValentineContext';
import './Home.css';

export function Home() {
    const navigate = useNavigate();
    const { data, isDayUnlocked } = useValentine();
    const [selectedDay, setSelectedDay] = useState<DayConfig | null>(null);

    const unlockedCount = useMemo(() =>
        data.unlockedDays.length, [data.unlockedDays]
    );

    const handleDayClick = (day: DayConfig) => {
        if (isDayUnlocked(day.id)) {
            navigate(`/${day.id}`);
        } else {
            setSelectedDay(day);
        }
    };

    const handleUnlock = () => {
        if (selectedDay) {
            navigate(`/${selectedDay.id}`);
            setSelectedDay(null);
        }
    };

    // Generate floating hearts with variety
    const floatingHearts = useMemo(() =>
        [...Array(25)].map((_, i) => ({
            id: i,
            left: Math.random() * 100,
            delay: Math.random() * 15,
            duration: 15 + Math.random() * 10,
            size: 0.6 + Math.random() * 1,
            emoji: ['💕', '❤️', '💗', '💖', '💝', '🤍', '💓'][Math.floor(Math.random() * 7)],
        })), []
    );

    // Generate sparkles
    const sparkles = useMemo(() =>
        [...Array(20)].map((_, i) => ({
            id: i,
            left: Math.random() * 100,
            top: Math.random() * 100,
            delay: Math.random() * 5,
            size: 3 + Math.random() * 4,
        })), []
    );

    // Get greeting based on time
    const greeting = useMemo(() => {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) return "Good morning, my love";
        if (hour >= 12 && hour < 17) return "Good afternoon, beautiful";
        if (hour >= 17 && hour < 21) return "Good evening, my heart";
        return "Sweet dreams await";
    }, []);

    return (
        <div className="home">
            {/* Animated Background */}
            <div className="home-background" />

            {/* Soft vignette overlay */}
            <div className="home-vignette" />

            {/* Floating Hearts */}
            <div className="floating-hearts">
                {floatingHearts.map(heart => (
                    <motion.div
                        key={heart.id}
                        className="floating-heart"
                        style={{
                            left: `${heart.left}%`,
                            fontSize: `${heart.size}rem`,
                            animationDelay: `${heart.delay}s`,
                            animationDuration: `${heart.duration}s`,
                        }}
                    >
                        {heart.emoji}
                    </motion.div>
                ))}
            </div>

            {/* Sparkles */}
            <div className="sparkles-layer">
                {sparkles.map(sparkle => (
                    <div
                        key={sparkle.id}
                        className="sparkle-particle"
                        style={{
                            left: `${sparkle.left}%`,
                            top: `${sparkle.top}%`,
                            animationDelay: `${sparkle.delay}s`,
                            width: sparkle.size,
                            height: sparkle.size,
                        }}
                    />
                ))}
            </div>

            {/* Main Content */}
            <motion.div
                className="home-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                {/* Header */}
                <motion.header
                    className="home-header"
                    initial={{ y: -30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    {/* Greeting */}
                    <motion.p
                        className="home-greeting"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        {greeting} 💕
                    </motion.p>

                    <span className="header-emoji">💝</span>
                    <h1 className="home-title">Valentine's Week</h1>
                    <p className="home-subtitle">A Journey Through Our Love</p>

                    <div className="header-decoration">
                        <span className="decoration-line" />
                        <FiHeart className="decoration-heart" fill="currentColor" />
                        <span className="decoration-line right" />
                    </div>

                    <p className="home-tagline">
                        Seven days. Seven emotions. One love story — ours.
                        <br />
                        <span className="tagline-sub">Each day holds a piece of my heart, waiting for you.</span>
                    </p>
                </motion.header>

                {/* Intro Message */}
                <motion.div
                    className="intro-message"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <p>
                        I built this for you — not because I had to, but because
                        <span className="highlight"> you deserve something made with love.</span>
                    </p>
                    <p className="intro-sub">
                        Unlock each day to discover what's inside. Start with Rose Day. 🌹
                    </p>
                </motion.div>

                {/* Days Grid */}
                <motion.div
                    className="days-grid"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                >
                    {DAYS.map((day, index) => (
                        <motion.div
                            key={day.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.5,
                                delay: 0.9 + index * 0.08,
                                ease: [0.25, 0.1, 0.25, 1]
                            }}
                        >
                            <DayCard
                                day={day}
                                onUnlockClick={() => handleDayClick(day)}
                            />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Progress Section */}
                <motion.div
                    className="progress-section"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.5 }}
                >
                    <div className="progress-heart">
                        {unlockedCount === 8 ? '💖' : '🤍'}
                    </div>
                    <h3 className="progress-title">Your Journey Together</h3>
                    <div className="progress-bar-container">
                        <motion.div
                            className="progress-bar"
                            initial={{ width: 0 }}
                            animate={{ width: `${(unlockedCount / 8) * 100}%` }}
                            transition={{ duration: 1, delay: 1.7 }}
                        />
                    </div>
                    <p className="progress-text">
                        {unlockedCount === 0
                            ? "Your journey begins with a single rose... 🌹"
                            : unlockedCount === 8
                                ? "You've unlocked our complete love story! 💕"
                                : `${unlockedCount} of 8 chapters unlocked • ${8 - unlockedCount} more to discover`
                        }
                    </p>
                </motion.div>

                {/* Footer */}
                <motion.footer
                    className="home-footer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.8 }}
                >
                    <p className="footer-quote">
                        "In a world of temporary things, you are my forever."
                    </p>
                    <div className="footer-hearts">
                        <motion.span
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                        >💕</motion.span>
                        <motion.span
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                        >✨</motion.span>
                        <motion.span
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                        >💕</motion.span>
                    </div>
                    <p className="footer-made">Made with all my love, just for you</p>
                </motion.footer>
            </motion.div>

            {/* Password Modal */}
            {selectedDay && (
                <PasswordModal
                    day={selectedDay}
                    onClose={() => setSelectedDay(null)}
                    onUnlock={handleUnlock}
                />
            )}
        </div>
    );
}
