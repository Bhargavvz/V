import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiLock, FiHeart, FiX } from 'react-icons/fi';
import type { DayConfig } from '../config/days';
import { useValentine } from '../context/ValentineContext';
import './PasswordModal.css';

interface PasswordModalProps {
    day: DayConfig;
    onClose: () => void;
    onUnlock: () => void;
}

export function PasswordModal({ day, onClose, onUnlock }: PasswordModalProps) {
    const { unlockDay } = useValentine();
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (password.toLowerCase() === day.password.toLowerCase()) {
            setSuccess(true);
            unlockDay(day.id);

            // Trigger haptic feedback if available
            if (navigator.vibrate) {
                navigator.vibrate([100, 50, 100, 50, 200]);
            }

            setTimeout(onUnlock, 1500);
        } else {
            setError(true);
            setPassword('');

            // Vibrate on error
            if (navigator.vibrate) {
                navigator.vibrate([50, 50, 50]);
            }

            setTimeout(() => setError(false), 500);
        }
    };

    // Generate burst hearts for success animation
    const burstHearts = [...Array(12)].map((_, i) => ({
        id: i,
        x: Math.cos((i / 12) * Math.PI * 2) * 150,
        y: Math.sin((i / 12) * Math.PI * 2) * 150,
    }));

    return (
        <AnimatePresence>
            <motion.div
                className="password-modal-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    className="password-modal"
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Background Decoration */}
                    <div className="modal-bg-decoration">
                        <div className="modal-bg-circle" />
                        <div className="modal-bg-circle" />
                    </div>

                    {/* Close Button */}
                    <motion.button
                        className="modal-close"
                        onClick={onClose}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <FiX />
                    </motion.button>

                    <div className="modal-content">
                        {!success ? (
                            <>
                                {/* Header */}
                                <div className="modal-header">
                                    <span className="modal-emoji">{day.emoji}</span>
                                    <h2 className="modal-title">Unlock {day.name}</h2>
                                    <p className="modal-subtitle">{day.tagline}</p>
                                </div>

                                {/* Password Form */}
                                <form className="password-form" onSubmit={handleSubmit}>
                                    <div className="input-group">
                                        <FiLock className="input-icon" />
                                        <input
                                            ref={inputRef}
                                            type="password"
                                            className={`password-input ${error ? 'error' : ''}`}
                                            placeholder="Enter password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            autoComplete="off"
                                        />
                                    </div>

                                    <AnimatePresence>
                                        {error && (
                                            <motion.div
                                                className="error-message"
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                            >
                                                <span>💔</span>
                                                <span>That's not quite right, try again...</span>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <motion.button
                                        type="submit"
                                        className="submit-button"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        disabled={!password.trim()}
                                    >
                                        <span className="button-content">
                                            <FiHeart />
                                            <span>Unlock with Love</span>
                                        </span>
                                    </motion.button>

                                    <p className="password-hint">
                                        Hint: Think about what this day represents 💕
                                    </p>
                                </form>
                            </>
                        ) : (
                            <motion.div
                                className="success-container"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                            >
                                <span className="success-emoji">💖</span>
                                <h2 className="success-title">Unlocked!</h2>
                                <p className="success-message">Opening your surprise...</p>
                            </motion.div>
                        )}
                    </div>

                    {/* Heart Burst on Success */}
                    <AnimatePresence>
                        {success && (
                            <div className="heart-burst">
                                {burstHearts.map((heart) => (
                                    <motion.span
                                        key={heart.id}
                                        className="burst-heart"
                                        initial={{
                                            left: '50%',
                                            top: '50%',
                                            x: 0,
                                            y: 0,
                                            opacity: 1,
                                            scale: 0,
                                        }}
                                        animate={{
                                            x: heart.x,
                                            y: heart.y,
                                            opacity: 0,
                                            scale: 1.5,
                                        }}
                                        transition={{ duration: 0.8, ease: 'easeOut' }}
                                    >
                                        {['💕', '❤️', '💖', '💗'][heart.id % 4]}
                                    </motion.span>
                                ))}
                            </div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
