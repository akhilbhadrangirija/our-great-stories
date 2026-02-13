'use client';

import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

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
        const { scrollYProgress } = useScroll({
                target: containerRef,
                offset: ["start start", "end end"]
        });

        const [currentIndex, setCurrentIndex] = useState(0);
        const [showFinal, setShowFinal] = useState(false);
        const [valentineClicked, setValentineClicked] = useState(false);
        const [finalClicked, setFinalClicked] = useState(false);

        useEffect(() => {
                const unsubscribe = scrollYProgress.on("change", (latest) => {
                        // Logic: 0-0.95 maps to lines. 0.95-1 show final.
                        if (latest > 0.95) {
                                setShowFinal(true);
                        } else {
                                setShowFinal(false);
                                const textProgress = latest / 0.95;
                                const index = Math.floor(textProgress * fullLines.length);
                                setCurrentIndex(Math.min(fullLines.length - 1, Math.max(0, index)));
                        }
                });
                return () => unsubscribe();
        }, [scrollYProgress]);

        return (
                <div ref={containerRef} className="relative h-[1200vh] w-full z-20">
                        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden backdrop-blur-[2px] bg-black/10">
                                <AnimatePresence mode="wait">
                                        {!showFinal ? (
                                                <motion.p
                                                        key={currentIndex}
                                                        initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
                                                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                                        exit={{ opacity: 0, y: -10, filter: "blur(10px)" }}
                                                        transition={{ duration: 0.8, ease: "easeInOut" }}
                                                        className="text-4xl md:text-6xl font-[family-name:var(--font-hurricane)] text-white text-center px-6 max-w-4xl leading-relaxed drop-shadow-xl"
                                                >
                                                        {fullLines[currentIndex]}
                                                </motion.p>
                                        ) : (
                                                <motion.div
                                                        key="final-stage"
                                                        initial={{ opacity: 0, scale: 0.9 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{ duration: 0.8 }}
                                                        className="text-center space-y-8 pointer-events-auto flex flex-col items-center"
                                                >
                                                        {!valentineClicked ? (
                                                                // Phase 1: Interactive Valentine Button
                                                                <Button
                                                                        onClick={() => setValentineClicked(true)}
                                                                        className="bg-red-600/20 hover:bg-red-600/30 text-white border border-red-500/50 text-3xl md:text-5xl font-[family-name:var(--font-hurricane)] px-12 py-8 rounded-full shadow-[0_0_30px_rgba(220,38,38,0.3)] hover:shadow-[0_0_50px_rgba(220,38,38,0.5)] backdrop-blur-sm transition-all duration-500 hover:scale-105 animate-pulse"
                                                                >
                                                                        Happy Valentine’s Day ❤️
                                                                </Button>
                                                        ) : !finalClicked ? (
                                                                // Phase 2: Poem Reveal + Always Button
                                                                <motion.div
                                                                        initial={{ opacity: 0 }}
                                                                        animate={{ opacity: 1 }}
                                                                        className="space-y-6 max-w-3xl px-4"
                                                                >
                                                                        <motion.p
                                                                                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                                                                                className="text-3xl md:text-5xl font-[family-name:var(--font-hurricane)] leading-relaxed"
                                                                        >
                                                                                Today we celebrate love.
                                                                        </motion.p>
                                                                        <motion.p
                                                                                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5, duration: 0.8, ease: "easeInOut" }}
                                                                                className="text-3xl md:text-5xl font-[family-name:var(--font-hurricane)] leading-relaxed"
                                                                        >
                                                                                One day we’ll celebrate everything we built together.
                                                                        </motion.p>
                                                                        <motion.p
                                                                                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.0, duration: 0.8, ease: "easeInOut" }}
                                                                                className="text-3xl md:text-5xl font-[family-name:var(--font-hurricane)] leading-relaxed"
                                                                        >
                                                                                And all the Valentine’s Days still waiting for us.
                                                                        </motion.p>

                                                                        <motion.div
                                                                                initial={{ opacity: 0, scale: 0.8 }}
                                                                                animate={{ opacity: 1, scale: 1 }}
                                                                                transition={{ delay: 4.5, duration: 0.8, ease: "easeInOut" }}
                                                                                className="pt-8 relative"
                                                                        >
                                                                                {/* Floating Hearts */}
                                                                                <div className="absolute inset-0 pointer-events-none -z-10 overflow-visible">
                                                                                        {Array.from({ length: 15 }).map((_, i) => (
                                                                                                <motion.div
                                                                                                        key={i}
                                                                                                        initial={{
                                                                                                                opacity: 0,
                                                                                                                y: 0,
                                                                                                                x: (Math.random() - 0.5) * 150
                                                                                                        }}
                                                                                                        animate={{
                                                                                                                opacity: [0, 1, 0],
                                                                                                                y: -100 - Math.random() * 100,
                                                                                                                x: (Math.random() - 0.5) * 200
                                                                                                        }}
                                                                                                        transition={{
                                                                                                                duration: 2 + Math.random() * 2,
                                                                                                                repeat: Infinity,
                                                                                                                delay: Math.random() * 2,
                                                                                                                ease: "easeOut"
                                                                                                        }}
                                                                                                        className="absolute bottom-1/2 left-1/2 text-2xl text-red-500/60"
                                                                                                >
                                                                                                        ❤️
                                                                                                </motion.div>
                                                                                        ))}
                                                                                </div>

                                                                                <Button
                                                                                        onClick={() => setFinalClicked(true)}
                                                                                        className="bg-red-600/20 hover:bg-red-600/30 text-white border border-red-500/50 text-2xl md:text-4xl font-[family-name:var(--font-hurricane)] px-10 py-6 rounded-full shadow-[0_0_40px_rgba(220,38,38,0.4)] hover:shadow-[0_0_60px_rgba(220,38,38,0.6)] backdrop-blur-sm transition-all duration-500 hover:scale-105"
                                                                                >
                                                                                        Always.
                                                                                </Button>
                                                                        </motion.div>
                                                                </motion.div>
                                                        ) : (
                                                                // Phase 3: Final Message
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

                                {!showFinal && (
                                        <motion.div
                                                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 text-sm animate-pulse"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 2 }}
                                        >
                                                Scroll slowly...
                                        </motion.div>
                                )}
                        </div>
                </div>
        );
}
