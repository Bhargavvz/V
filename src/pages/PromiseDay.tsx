import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiEdit3 } from 'react-icons/fi';
import { DayLayout } from '../components/DayLayout';
import { getDayById } from '../config/days';
import './PromiseDay.css';

const MY_PROMISES = [
    {
        icon: '🤝',
        title: 'I promise to stay',
        text: 'Through the good days and bad days, through arguments and celebrations — I will never give up on us.',
    },
    {
        icon: '👂',
        title: 'I promise to listen',
        text: 'Not just hear, but truly listen. Your thoughts, your worries, your dreams — they all matter to me.',
    },
    {
        icon: '🛡️',
        title: 'I promise to protect',
        text: 'Your heart, your peace, your happiness — I will guard them with everything I have.',
    },
    {
        icon: '🌱',
        title: 'I promise to grow',
        text: 'To become a better person every day, to learn from my mistakes, and to evolve alongside you.',
    },
    {
        icon: '😊',
        title: 'I promise to make you laugh',
        text: 'Even on your darkest days, I will find ways to bring light and laughter into your life.',
    },
    {
        icon: '🏡',
        title: 'I promise a future',
        text: 'A home with you, adventures with you, a life with you. I promise to work toward our dreams together.',
    },
];

const SIGNATURE = "With all my love, forever and always 💍";
const YOUR_NAME = "Bhargav";

export function PromiseDay() {
    const day = getDayById('promise')!;
    const [checkedPromises, setCheckedPromises] = useState<number[]>([]);
    const [signed, setSigned] = useState(false);

    // Elegant light beams
    const lightBeams = useMemo(() =>
        [...Array(6)].map((_, i) => ({
            id: i,
            left: 15 + i * 14,
            delay: i * 0.5,
        })), []
    );

    const handleCheck = (index: number) => {
        if (checkedPromises.includes(index)) {
            setCheckedPromises(checkedPromises.filter(i => i !== index));
        } else {
            setCheckedPromises([...checkedPromises, index]);
        }
    };

    const allChecked = checkedPromises.length === MY_PROMISES.length;

    const handleSign = () => {
        setSigned(true);
        if (navigator.vibrate) {
            navigator.vibrate([100, 50, 100, 50, 200]);
        }
    };

    return (
        <DayLayout
            dayName={day.name}
            emoji={day.emoji}
            gradient={day.gradient}
        >
            {/* Elegant Light Beams */}
            <div className="light-beams">
                {lightBeams.map(beam => (
                    <div
                        key={beam.id}
                        className="light-beam"
                        style={{
                            left: `${beam.left}%`,
                            animationDelay: `${beam.delay}s`,
                        }}
                    />
                ))}
            </div>

            {/* Soft Glow Orbs */}
            <div className="glow-orbs">
                <div className="glow-orb orb-1" />
                <div className="glow-orb orb-2" />
                <div className="glow-orb orb-3" />
            </div>

            <div className="promise-container">
                <motion.div
                    className="promise-intro"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <p>Words are easy. Commitment is rare.</p>
                    <p className="intro-sub">These are promises I intend to keep — forever 🤝</p>
                </motion.div>

                <div className="promises-list">
                    {MY_PROMISES.map((promise, index) => (
                        <motion.div
                            key={index}
                            className={`promise-card ${checkedPromises.includes(index) ? 'checked' : ''}`}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            onClick={() => handleCheck(index)}
                        >
                            <div className="promise-header">
                                <span className="promise-icon">{promise.icon}</span>
                                <h3 className="promise-title">{promise.title}</h3>
                                <motion.div
                                    className="promise-checkbox"
                                    whileTap={{ scale: 0.9 }}
                                >
                                    {checkedPromises.includes(index) && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: 'spring' }}
                                        >
                                            <FiCheck />
                                        </motion.div>
                                    )}
                                </motion.div>
                            </div>
                            <p className="promise-text">{promise.text}</p>
                        </motion.div>
                    ))}
                </div>

                <AnimatePresence>
                    {allChecked && !signed && (
                        <motion.div
                            className="seal-section"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                        >
                            <p className="seal-prompt">All promises acknowledged. Seal them with love?</p>
                            <motion.button
                                className="seal-button"
                                onClick={handleSign}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <FiEdit3 />
                                <span>Sign & Seal Forever</span>
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {signed && (
                        <motion.div
                            className="signed-section"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                        >
                            <div className="sealed-badge">
                                <span className="sealed-emoji">💍</span>
                                <span className="sealed-text">Sealed</span>
                            </div>

                            <div className="signature-card">
                                <p className="signature-intro">
                                    These promises are sealed in my heart and now in yours.
                                </p>
                                <div className="signature-line">
                                    <p className="signature-text">{SIGNATURE}</p>
                                    <p className="signature-name">{YOUR_NAME}</p>
                                </div>
                                <p className="signature-date">
                                    {new Date().toLocaleDateString('en-US', {
                                        month: 'long',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })}
                                </p>
                            </div>

                            <motion.div
                                className="hearts-burst"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                💕 ✨ 💍 ✨ 💕
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </DayLayout>
    );
}
