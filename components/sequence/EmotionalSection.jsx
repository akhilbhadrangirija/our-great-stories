'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils'; // Import cn

const fullLines = [
        "It’s been almost one year.",
        "But somehow… it feels like we were meant to meet.",
        "Sometimes I wish I had found you earlier.",
        "So I could have loved you longer.",
        "What I love most about us is that we communicate.",
        "We choose each other. Every time.",
        "You dream of traveling the world.",
        "Of building something big.",
        "And I don’t just admire that.",
        "I want to build it with you.",
        "I don’t just want to be your Valentine.",
        "I want to be your partner in everything.",
];

export default function EmotionalSection() {
        const containerRef = useRef(null);
        const [currentIndex, setCurrentIndex] = useState(0);
        const [showFinal, setShowFinal] = useState(false);
        const [finalClicked, setFinalClicked] = useState(false);

        // Force scroll to top on mount and clean initialization
        useEffect(() => {
                if (containerRef.current) {
                        containerRef.current.scrollTop = 0;
                }
        }, []);

        const handleScroll = () => {
                if (containerRef.current) {
                        const { scrollTop, clientHeight } = containerRef.current;
                        if (clientHeight === 0) return;

                        const index = Math.round(scrollTop / clientHeight);

                        if (index >= fullLines.length) {
                                setShowFinal(true);
                        } else {
                                setShowFinal(false);
                                setCurrentIndex(index);
                        }
                }
        };

        return (
                <>
                        {/* Scroll Snap Container (Invisible Driver) */}
                        <motion.div
                                ref={containerRef}
                                onScroll={handleScroll}
                                className="fixed inset-0 z-40 h-[100dvh] w-full overflow-y-auto snap-y bg-transparent pointer-events-auto"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1 }}
                                data-lenis-prevent="true"
                        >
                                {fullLines.map((_, i) => (
                                        <div key={i} className="h-[100dvh] w-full snap-start" />
                                ))}
                                {/* Final Section Spacer */}
                                <div className="h-[100dvh] w-full snap-start" />
                        </motion.div>

                        {/* Fixed Content Layer (Visible) */}
                        <div className="fixed inset-0 z-20 flex items-center justify-center pointer-events-none">
                                <AnimatePresence mode="wait">
                                        {!showFinal ? (
                                                <motion.p
                                                        key={currentIndex}
                                                        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                                                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                                        exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                                                        transition={{ duration: 0.5 }}
                                                        className="text-3xl md:text-5xl font-serif text-white text-center px-6 max-w-4xl leading-relaxed drop-shadow-xl"
                                                >
                                                        {fullLines[currentIndex]}
                                                </motion.p>
                                        ) : (
                                                <motion.div
                                                        key="final"
                                                        initial={{ opacity: 0, scale: 0.9 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{ duration: 0.8 }}
                                                        className={cn("text-center space-y-8 pointer-events-auto")} // Enable clicks
                                                >
                                                        {!finalClicked ? (
                                                                <Button
                                                                        onClick={() => setFinalClicked(true)}
                                                                        className="bg-white/10 hover:bg-white/20 text-white border border-white/30 text-3xl px-12 py-8 rounded-full shadow-[0_0_50px_rgba(255,255,255,0.2)] hover:shadow-[0_0_70px_rgba(255,255,255,0.4)] backdrop-blur-sm transition-all duration-500 hover:scale-105"
                                                                >
                                                                        Always.
                                                                </Button>
                                                        ) : (
                                                                <motion.div
                                                                        initial={{ opacity: 0 }}
                                                                        animate={{ opacity: 1 }}
                                                                        className="space-y-4"
                                                                >
                                                                        <div className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-amber-500 drop-shadow-[0_0_30px_rgba(255,215,0,0.5)]">
                                                                                Let’s build our world. ✨
                                                                        </div>
                                                                        <motion.div
                                                                                initial={{ opacity: 0 }}
                                                                                animate={{ opacity: 1 }}
                                                                                transition={{ delay: 1, duration: 2 }}
                                                                                className="absolute inset-0 pointer-events-none mix-blend-screen bg-gradient-to-t from-orange-500/20 via-transparent to-transparent"
                                                                        />
                                                                </motion.div>
                                                        )}
                                                </motion.div>
                                        )}
                                </AnimatePresence>

                                {/* Scroll Indicator */}
                                {!showFinal && (
                                        <motion.div
                                                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 text-sm animate-pulse"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 2 }}
                                        >
                                                Scroll to continue
                                        </motion.div>
                                )}
                        </div>
                </>
        );
}
