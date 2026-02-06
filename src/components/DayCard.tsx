import { motion } from 'framer-motion';
import { FiLock, FiUnlock, FiChevronRight } from 'react-icons/fi';
import type { DayConfig } from '../config/days';
import { useValentine } from '../context/ValentineContext';
import './DayCard.css';

interface DayCardProps {
    day: DayConfig;
    onUnlockClick: () => void;
}

export function DayCard({ day, onUnlockClick }: DayCardProps) {
    const { isDayUnlocked } = useValentine();
    const unlocked = isDayUnlocked(day.id);

    return (
        <motion.div
            className="day-card"
            data-theme={day.id}
            onClick={onUnlockClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            {/* Background Gradient */}
            <div className="card-gradient" style={{ background: day.gradient }} />

            {/* Shimmer Effect */}
            <div className="card-shimmer" />

            {/* Sparkles */}
            <div className="card-sparkles">
                <span className="card-sparkle" />
                <span className="card-sparkle" />
                <span className="card-sparkle" />
            </div>

            {/* Locked Overlay */}
            {!unlocked && <div className="card-locked-overlay" />}

            {/* Content */}
            <div className="card-content">
                {/* Emoji */}
                <div className="card-emoji-container">
                    <span className="card-emoji">{day.emoji}</span>
                    <div className="card-emoji-glow" />
                </div>

                {/* Header */}
                <div className="card-header">
                    <h3 className="card-name">{day.name}</h3>
                    <span className="card-date">{day.date}</span>
                </div>

                {/* Tagline */}
                <p className="card-tagline">{day.tagline}</p>

                {/* Footer */}
                <div className="card-footer">
                    <div className={`lock-status ${unlocked ? 'unlocked' : 'locked'}`}>
                        {unlocked ? (
                            <>
                                <FiUnlock className="lock-icon" />
                                <span>Unlocked</span>
                            </>
                        ) : (
                            <>
                                <FiLock className="lock-icon" />
                                <span>Locked</span>
                            </>
                        )}
                    </div>

                    {unlocked ? (
                        <motion.button
                            className="enter-button"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span>Enter</span>
                            <FiChevronRight />
                        </motion.button>
                    ) : (
                        <motion.button
                            className="unlock-prompt"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FiLock size={14} />
                            <span>Unlock</span>
                        </motion.button>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
