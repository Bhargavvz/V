import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHeart } from 'react-icons/fi';
import { DayLayout } from '../components/DayLayout';
import { getDayById } from '../config/days';
import { useValentine } from '../context/ValentineContext';
import './HugDay.css';

const HUG_MESSAGES = [
    "Come here, I need a hug too 🤗",
    "You give the best hugs 💕",
    "I could stay like this forever",
    "This is my favorite place",
    "You make everything better",
    "Never let go...",
];

export function HugDay() {
    const day = getDayById('hug')!;
    const { data, incrementHugCount } = useValentine();
    const [isHugging, setIsHugging] = useState(false);
    const [hugIntensity, setHugIntensity] = useState(0);
    const [showMessage, setShowMessage] = useState(false);
    const [messageIndex, setMessageIndex] = useState(0);
    const [totalDuration, setTotalDuration] = useState(0);

    const intensityInterval = useRef<ReturnType<typeof setInterval> | null>(null);

    // Warm gradient circles (more elegant than floating emojis)
    const warmCircles = useMemo(() =>
        [...Array(5)].map((_, i) => ({
            id: i,
            size: 200 + i * 100,
            delay: i * 0.5,
        })), []
    );

    const startHug = () => {
        setIsHugging(true);
        setHugIntensity(0);

        let intensity = 0;
        intensityInterval.current = setInterval(() => {
            intensity = Math.min(intensity + 5, 100);
            setHugIntensity(intensity);

            if (intensity >= 100) {
                if (navigator.vibrate) {
                    navigator.vibrate([100, 50, 100]);
                }
                setShowMessage(true);
                setMessageIndex(Math.floor(Math.random() * HUG_MESSAGES.length));
            }
        }, 100);
    };

    const endHug = () => {
        if (intensityInterval.current) {
            clearInterval(intensityInterval.current);
        }

        if (hugIntensity > 50) {
            incrementHugCount();
            setTotalDuration(prev => prev + hugIntensity);
        }

        setIsHugging(false);
        setHugIntensity(0);
        setTimeout(() => setShowMessage(false), 2000);
    };

    const getIntensityLabel = () => {
        if (hugIntensity < 25) return 'Gentle touch...';
        if (hugIntensity < 50) return 'Warm embrace...';
        if (hugIntensity < 75) return 'Tight hug...';
        if (hugIntensity < 100) return 'Never letting go...';
        return '💕 Perfect hug! 💕';
    };

    useEffect(() => {
        return () => {
            if (intensityInterval.current) clearInterval(intensityInterval.current);
        };
    }, []);

    return (
        <DayLayout
            dayName={day.name}
            emoji={day.emoji}
            gradient={day.gradient}
            darkText
        >
            {/* Warm Radiating Circles */}
            <div className="warm-circles">
                {warmCircles.map(circle => (
                    <div
                        key={circle.id}
                        className={`warm-circle ${isHugging ? 'active' : ''}`}
                        style={{
                            width: circle.size,
                            height: circle.size,
                            animationDelay: `${circle.delay}s`,
                        }}
                    />
                ))}
            </div>

            {/* Soft Ambient Glow */}
            <div className={`ambient-glow ${isHugging ? 'active' : ''}`} />

            <div className="hug-container">
                <motion.div
                    className="hug-intro"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <p>A hug can say what words cannot...</p>
                    <p className="intro-sub">Press and hold to send me a virtual hug 🤗</p>
                </motion.div>

                <motion.div
                    className={`hug-button ${isHugging ? 'hugging' : ''}`}
                    onMouseDown={startHug}
                    onMouseUp={endHug}
                    onMouseLeave={endHug}
                    onTouchStart={startHug}
                    onTouchEnd={endHug}
                    whileTap={{ scale: 0.98 }}
                >
                    <motion.div
                        className="hug-glow"
                        animate={{
                            scale: isHugging ? [1, 1.3, 1.2] : 1,
                            opacity: isHugging ? [0.3, 0.7, 0.5] : 0.2,
                        }}
                        transition={{ duration: 1, repeat: isHugging ? Infinity : 0 }}
                    />

                    <div className="hug-content">
                        <motion.span
                            className="hug-emoji"
                            animate={{
                                scale: isHugging ? [1, 1.15, 1.1] : 1,
                            }}
                            transition={{ duration: 0.8, repeat: isHugging ? Infinity : 0 }}
                        >
                            🤗
                        </motion.span>
                        <p className="hug-label">
                            {isHugging ? 'Keep holding...' : 'Press & Hold'}
                        </p>
                    </div>

                    <svg className="progress-ring" viewBox="0 0 200 200">
                        <circle
                            className="progress-bg"
                            cx="100"
                            cy="100"
                            r="90"
                        />
                        <motion.circle
                            className="progress-bar"
                            cx="100"
                            cy="100"
                            r="90"
                            style={{
                                strokeDasharray: 565,
                                strokeDashoffset: 565 - (565 * hugIntensity) / 100,
                            }}
                        />
                    </svg>
                </motion.div>

                <motion.div
                    className="intensity-section"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <div className="intensity-bar-container">
                        <motion.div
                            className="intensity-bar"
                            style={{ width: `${hugIntensity}%` }}
                        />
                    </div>
                    <p className="intensity-label">{getIntensityLabel()}</p>
                </motion.div>

                <AnimatePresence>
                    {showMessage && (
                        <motion.div
                            className="hug-message"
                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <FiHeart fill="currentColor" />
                            <p>{HUG_MESSAGES[messageIndex]}</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.div
                    className="hug-stats"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    <div className="stat">
                        <span className="stat-value">{data.hugCount || 0}</span>
                        <span className="stat-label">Hugs Shared</span>
                    </div>
                    <div className="stat-divider">💕</div>
                    <div className="stat">
                        <span className="stat-value">{Math.floor(totalDuration / 100)}</span>
                        <span className="stat-label">Seconds Together</span>
                    </div>
                </motion.div>

                <motion.p
                    className="hug-footer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                >
                    "A hug is a silent way of saying you matter to me."
                </motion.p>
            </div>
        </DayLayout>
    );
}
