import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiHeart } from 'react-icons/fi';
import './DayLayout.css';

interface DayLayoutProps {
    children: React.ReactNode;
    dayName: string;
    emoji: string;
    gradient: string;
    message?: string;
    darkText?: boolean;
}

export function DayLayout({
    children,
    dayName,
    emoji,
    gradient,
    message,
    darkText = false,
}: DayLayoutProps) {
    const navigate = useNavigate();
    const textClass = darkText ? 'dark-text' : 'light-text';

    // Generate ambient particles
    const particles = useMemo(() =>
        [...Array(25)].map((_, i) => ({
            id: i,
            left: Math.random() * 100,
            top: Math.random() * 100,
            delay: Math.random() * 5,
            duration: 5 + Math.random() * 5,
            size: 2 + Math.random() * 4,
        })), []
    );

    return (
        <motion.div
            className="day-layout"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* Background */}
            <div className="day-background" style={{ background: gradient }} />
            <div className="day-overlay" />

            {/* Ambient Particles */}
            <div className="ambient-particles">
                {particles.map(p => (
                    <motion.div
                        key={p.id}
                        className="ambient-particle"
                        style={{
                            left: `${p.left}%`,
                            top: `${p.top}%`,
                            width: p.size,
                            height: p.size,
                        }}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0.2, 0.5, 0.2],
                        }}
                        transition={{
                            duration: p.duration,
                            delay: p.delay,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    />
                ))}
            </div>

            {/* Back Button */}
            <motion.button
                className={`back-button ${textClass}`}
                onClick={() => navigate('/')}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <FiArrowLeft />
                <span>Back</span>
            </motion.button>

            {/* Header */}
            <motion.header
                className="day-header"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
            >
                <span className="header-emoji">{emoji}</span>
                <h1 className={`header-title ${textClass}`}>{dayName}</h1>
                <div className={`header-decoration ${textClass}`}>
                    <span className="header-line" />
                    <FiHeart className="header-heart" fill="currentColor" />
                    <span className="header-line right" />
                </div>
            </motion.header>

            {/* Content */}
            <motion.main
                className="day-content"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
            >
                {children}
            </motion.main>

            {/* Footer Message */}
            {message && (
                <motion.footer
                    className="day-footer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    <p className={`footer-message ${textClass}`}>{message}</p>
                </motion.footer>
            )}
        </motion.div>
    );
}
