import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiX } from 'react-icons/fi';
import { DayLayout } from '../components/DayLayout';
import { getDayById } from '../config/days';
import './ValentineDay.css';

const TIMELINE_EVENTS = [
    {
        date: "April 7, 2023",
        emoji: "📸",
        title: "Us, in one frame",
        text: "We weren't that close yet, but we were already enjoying each other's presence.\n\nSome meetings aren't by chance — they're destined by the heart. ❤️"
    },
    {
        date: "May 31, 2023",
        emoji: "💝",
        title: "First Picture Together",
        text: "That was when we truly started talking.\n\nMaybe that was the day I unknowingly began to care for you. 💝"
    },
    {
        date: "July 12, 2024",
        emoji: "💔",
        title: "The Day I Got Rejected",
        text: "I tried to control my feelings, but the pain was real and deep.\n\nStill, I didn't lose hope. I chose to wait — for you, for us. 💑"
    },
    {
        date: "September 11, 2024",
        emoji: "🌟",
        title: "I Didn't Lose Hope",
        text: "I learned to control my emotions, to be patient, to trust the process.\n\nAnd the wait… it was worth everything. 💑"
    },
    {
        date: "December 16, 2024",
        emoji: "💍",
        title: "The Day You Finally Accepted Me",
        text: "Under a starlit sky, our hearts finally connected.\n\nThe most wonderful day of my life — the day my love was accepted. 💑✨"
    },
    {
        date: "January 7, 2025",
        emoji: "🎉",
        title: "Our First Date",
        text: "I had so much fun with you that day. Every moment felt light, happy, and perfect.\n\nA day I'll always hold close to my heart. 💝"
    },
];

const FINAL_LETTER = `My love,

If you're reading this, you've made it through our week together.
Each day was a piece of my heart, a chapter in our story.

You are the reason I believe in love —
not the kind you see in movies,
but the real kind.
Messy, imperfect, and beautiful —
the kind that makes life worth living.

Thank you for being you.
Thank you for choosing me.
Thank you for every moment, both big and small.

I don't know what the future holds,
but I know one thing for sure —
I want to face it with you.

Forever and always,
Bhargav 💕`;

// Photo gallery - real photos
const GALLERY_ITEMS = [
    { src: '/public/images/1.jpeg', date: "December 23, 2025", label: "Golkonda Fort" },
    { src: '/public/images/2.jpeg', date: "January 12, 2025", label: "Numaish Night" },
    { src: '/public/images/3.jpeg', date: "July 2, 2025", label: "Yadagirigutta" },
    { src: '/public/images/4.jpeg', date: "December 16, 2025", label: "Our first anniversary" },
    { src: '/public/images/5.jpeg', date: "June 7, 2025", label: "My Birthday" },
    { src: '/public/images/6.jpeg', date: "April 4, 2025", label: "Our Outing" },
];

// Relationship start date
const RELATIONSHIP_START = new Date('2024-12-16T00:00:00');

interface TimeElapsed {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

function calculateTimeTogether(): TimeElapsed {
    const now = new Date();
    const diffTime = now.getTime() - RELATIONSHIP_START.getTime();

    const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffTime % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
}

export function ValentineDay() {
    const day = getDayById('valentine')!;
    const [showLetter, setShowLetter] = useState(false);
    const [letterRead, setLetterRead] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
    const [timeTogether, setTimeTogether] = useState<TimeElapsed>(calculateTimeTogether);

    // Update timer every second
    useEffect(() => {
        const interval = setInterval(() => {
            setTimeTogether(calculateTimeTogether());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // Elegant particles
    const particles = useMemo(() =>
        [...Array(20)].map((_, i) => ({
            id: i,
            left: Math.random() * 100,
            delay: Math.random() * 15,
            duration: 15 + Math.random() * 10,
        })), []
    );

    const handleReadLetter = () => {
        setShowLetter(true);
        if (navigator.vibrate) {
            navigator.vibrate([50, 30, 100]);
        }
    };

    const handleCloseLetter = () => {
        setShowLetter(false);
        setLetterRead(true);
    };

    const handlePhotoClick = (index: number) => {
        setSelectedPhoto(index);
    };

    const handleClosePhoto = () => {
        setSelectedPhoto(null);
    };

    const selectedPhotoItem = selectedPhoto !== null ? GALLERY_ITEMS[selectedPhoto] : null;

    return (
        <DayLayout
            dayName={day.name}
            emoji={day.emoji}
            gradient={day.gradient}
        >
            {/* Subtle Spark Particles */}
            <div className="valentine-particles">
                {particles.map(p => (
                    <div
                        key={p.id}
                        className="v-spark"
                        style={{
                            left: `${p.left}%`,
                            animationDelay: `${p.delay}s`,
                            animationDuration: `${p.duration}s`,
                        }}
                    />
                ))}
            </div>

            <div className="valentine-content">
                {/* Hero */}
                <motion.div
                    className="v-hero"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h2 className="hero-title">Happy Valentine's Day</h2>
                    <p className="hero-subtitle">The grand finale of our week together 💕</p>
                    <motion.div
                        className="scroll-hint"
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <FiChevronDown />
                        <span>Scroll to explore</span>
                    </motion.div>
                </motion.div>

                {/* Relationship Counter */}
                <motion.section
                    className="counter-section"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                >
                    <div className="counter-card">
                        <motion.div
                            className="counter-heart"
                            animate={{ scale: [1, 1.15, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            💞
                        </motion.div>
                        <p className="counter-label">We've been together for</p>
                        <div className="counter-timer">
                            <div className="timer-unit">
                                <span className="timer-value">{timeTogether.days}</span>
                                <span className="timer-label">days</span>
                            </div>
                            <span className="timer-separator">:</span>
                            <div className="timer-unit">
                                <span className="timer-value">{String(timeTogether.hours).padStart(2, '0')}</span>
                                <span className="timer-label">hours</span>
                            </div>
                            <span className="timer-separator">:</span>
                            <div className="timer-unit">
                                <span className="timer-value">{String(timeTogether.minutes).padStart(2, '0')}</span>
                                <span className="timer-label">min</span>
                            </div>
                            <span className="timer-separator">:</span>
                            <div className="timer-unit">
                                <motion.span
                                    className="timer-value seconds"
                                    key={timeTogether.seconds}
                                    initial={{ scale: 1.2, opacity: 0.5 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {String(timeTogether.seconds).padStart(2, '0')}
                                </motion.span>
                                <span className="timer-label">sec</span>
                            </div>
                        </div>
                        <p className="counter-tagline">...and counting forever 💕</p>
                        <p className="counter-since">Since December 16, 2024</p>
                    </div>
                </motion.section>

                {/* Timeline */}
                <section className="timeline-section">
                    <h3 className="section-title">Our Story</h3>
                    <div className="timeline">
                        <div className="timeline-line" />
                        {TIMELINE_EVENTS.map((event, index) => (
                            <motion.div
                                key={index}
                                className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: 0.1 }}
                            >
                                <div className="timeline-content">
                                    <span className="timeline-date">{event.date}</span>
                                    <span className="timeline-emoji">{event.emoji}</span>
                                    <h4 className="timeline-title">{event.title}</h4>
                                    <p className="timeline-text">{event.text}</p>
                                </div>
                                <div className="timeline-dot" />
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Gallery */}
                <section className="gallery-section">
                    <h3 className="section-title">Our Moments</h3>
                    <p className="gallery-subtitle">
                        Tap any photo to see it closer 📸
                    </p>
                    <div className="gallery-grid">
                        {GALLERY_ITEMS.map((item, index) => (
                            <motion.div
                                key={index}
                                className="gallery-item"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handlePhotoClick(index)}
                            >
                                <img src={item.src} alt={item.label} className="gallery-img" />
                                <div className="gallery-overlay">
                                    <p className="gallery-label">{item.label}</p>
                                    {item.date && <p className="gallery-date">{item.date}</p>}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Final Letter */}
                <section className="letter-section">
                    <motion.button
                        className="letter-button"
                        onClick={handleReadLetter}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="letter-icon">💌</span>
                        <span>{letterRead ? 'Read My Letter Again' : 'Read My Final Letter'}</span>
                    </motion.button>
                </section>

                {/* Final Message */}
                <motion.section
                    className="final-section"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <motion.div
                        className="final-heart"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        ❤️
                    </motion.div>
                    <h2 className="final-title">Thank You For Everything</h2>
                    <p className="final-text">
                        For every laugh, every hug, every moment together.
                        <br />
                        You make my life beautiful.
                    </p>
                    <p className="final-signature">With all my love, forever and always 💕</p>
                </motion.section>
            </div>

            {/* Photo Modal */}
            <AnimatePresence>
                {selectedPhoto !== null && selectedPhotoItem && (
                    <motion.div
                        className="photo-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClosePhoto}
                    >
                        <motion.div
                            className="photo-modal"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className="photo-close" onClick={handleClosePhoto}>
                                <FiX />
                            </button>
                            <img
                                src={selectedPhotoItem.src}
                                alt={selectedPhotoItem.label}
                                className="photo-modal-img"
                            />
                            <div className="photo-modal-info">
                                <p className="photo-modal-label">{selectedPhotoItem.label}</p>
                                {selectedPhotoItem.date && (
                                    <p className="photo-modal-date">{selectedPhotoItem.date}</p>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Letter Modal */}
            <AnimatePresence>
                {showLetter && (
                    <motion.div
                        className="letter-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleCloseLetter}
                    >
                        <motion.div
                            className="letter-modal"
                            initial={{ scale: 0.8, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="letter-paper">
                                <span className="letter-top-heart">💕</span>
                                <div className="letter-content">{FINAL_LETTER}</div>
                                <motion.button
                                    className="letter-close"
                                    onClick={handleCloseLetter}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Close with Love 💕
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </DayLayout>
    );
}
