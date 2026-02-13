'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useRef, useState, useEffect } from 'react';

const lines = [
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
        const { scrollYProgress } = useScroll({
                target: containerRef,
                offset: ["start start", "end end"]
        });

        const [currentIndex, setCurrentIndex] = useState(0);
        const [showFinal, setShowFinal] = useState(false);
        const [finalClicked, setFinalClicked] = useState(false);

        useEffect(() => {
                // Map scroll progress (0 to 1) to index (0 to lines.length)
                // We reserve the last segment for the final button.
                const unsubscribe = scrollYProgress.on("change", (latest) => {
                        // Create segments. 
                        // 0 - 0.9: Text lines
                        // > 0.9: Final button

                        const textProgress = latest / 0.9;

                        if (latest > 0.95) {
                                setShowFinal(true);
                        } else {
                                setShowFinal(false);
                                const index = Math.floor(textProgress * lines.length);
                                setCurrentIndex(Math.min(lines.length - 1, Math.max(0, index)));
                        }
                });
                return () => unsubscribe();
        }, [scrollYProgress]);

        return (
                <div ref={containerRef} className="relative h-[600vh] w-full z-20">
                        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

                                <AnimatePresence mode="wait">
                                        {!showFinal ? (
                                                <motion.p
                                                        key={currentIndex}
                                                        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                                                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                                        exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                                                        transition={{ duration: 0.5 }}
                                                        className="text-3xl md:text-5xl font-serif text-white text-center px-6 max-w-4xl leading-relaxed drop-shadow-lg"
                                                >
                                                        {lines[currentIndex]}
                                                </motion.p>
                                        ) : (
                                                <motion.div
                                                        key="final"
                                                        initial={{ opacity: 0, scale: 0.9 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{ duration: 0.8 }}
                                                        className="text-center space-y-8"
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
                                                Scroll down slowly
                                        </motion.div>
                                )}
                        </div>
                </div>
        );
}
