'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';

export default function HeroSection({ onStart }) {
        const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
        const [noCount, setNoCount] = useState(0);
        const [isCompleted, setIsCompleted] = useState(false);

        const noTexts = [
                "No",
                "Are you sure?",
                "Think again!",
                "Last chance!",
                "Surely not?",
                "Big mistake!",
                "Have a heart!",
                "Don't be cold!",
                "Change of heart?",
                "Reconsider?",
                "Final answer?",
                "Please? 🥺",
                "Pretty please?",
                "I'll be sad...",
                "Don't do it!",
                "Entha jomooooo?",
                "Achu chetante a....",
                "Click Yes!",
        ];

        const handleNoInteraction = () => {
                // Move the button to a random position around the center
                // We'll use a range of +/- 150px to keep it reachable but annoying
                const x = (Math.random() - 0.5) * 300;
                const y = (Math.random() - 0.5) * 300;
                setNoButtonPos({ x, y });
                setNoCount((prev) => prev + 1);
        };

        const handleYesClick = () => {
                setIsCompleted(true);

                // Fire confetti from multiple angles
                const duration = 3000;
                const end = Date.now() + duration;

                const frame = () => {
                        confetti({
                                particleCount: 5,
                                angle: 60,
                                spread: 55,
                                origin: { x: 0 },
                                colors: ['#ff0000', '#ffa500', '#ffff00', '#008000', '#0000ff', '#4b0082', '#ee82ee']
                        });
                        confetti({
                                particleCount: 5,
                                angle: 120,
                                spread: 55,
                                origin: { x: 1 },
                                colors: ['#ff0000', '#ffa500', '#ffff00', '#008000', '#0000ff', '#4b0082', '#ee82ee']
                        });

                        if (Date.now() < end) {
                                requestAnimationFrame(frame);
                        }
                };
                frame();

                setTimeout(() => {
                        onStart();
                }, 1500);
        };

        return (
                <div
                        className={cn(
                                "relative h-screen w-full flex flex-col items-center justify-center overflow-hidden transition-all duration-1000",
                                isCompleted ? "opacity-0 pointer-events-none" : "opacity-100"
                        )}
                >
                        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 pointer-events-none mix-blend-overlay"></div>

                        <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className="z-10 text-center flex flex-col items-center gap-12"
                        >
                                <h1 className="text-5xl md:text-8xl font-bold text-white font-serif tracking-tight drop-shadow-[0_0_15px_rgba(255,0,0,0.5)]">
                                        Will you be my <br />
                                        <span className="text-red-500 inline-block mt-2">Valentine?</span>
                                </h1>

                                <div className="flex items-center justify-center gap-12 relative h-32 w-full max-w-2xl">
                                        <Button
                                                onClick={handleYesClick}
                                                className="bg-green-600 hover:bg-green-500 text-white text-2xl font-bold px-12 py-8 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.6)] transform transition-transform hover:scale-110 active:scale-95"
                                        >
                                                YES!
                                        </Button>

                                        <motion.div
                                                animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                                onMouseEnter={handleNoInteraction}
                                                onClick={handleNoInteraction}
                                                className="absolute left-1/2 translate-x-12" // Initial offset to put it next to Yes
                                        >
                                                <Button
                                                        variant="outline"
                                                        className="bg-transparent border-2 border-white/20 text-white/80 hover:bg-white/10 hover:text-white hover:border-white text-xl px-10 py-8 rounded-full backdrop-blur-sm transition-colors"
                                                >
                                                        {noTexts[Math.min(noCount, noTexts.length - 1)]}
                                                </Button>
                                        </motion.div>
                                </div>
                        </motion.div>
                </div>
        );
}
