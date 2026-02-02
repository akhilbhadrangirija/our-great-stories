'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Heart, Frown, PartyPopper } from 'lucide-react';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';

export default function DateInviteView({ invite }) {
        const [step, setStep] = useState('question'); // question, are-you-sure, success
        const [noButtonStyle, setNoButtonStyle] = useState({});
        const [yesScale, setYesScale] = useState(1);
        const [runawayCount, setRunawayCount] = useState(0);

        const handleNoClick = () => {
                if (step === 'question') {
                        setStep('are-you-sure');
                } else if (step === 'are-you-sure') {
                        // Runaway logic (The Funnel)
                        if (runawayCount < 5) {
                                const x = Math.random() * 200 - 100;
                                const y = Math.random() * 200 - 100;
                                setNoButtonStyle({ transform: `translate(${x}px, ${y}px)` });
                                setYesScale(prev => prev + 0.2);
                                setRunawayCount(prev => prev + 1);
                        } else {
                                // Safety rule: let them say no or just change text
                                setStep('question'); // Reset or handle otherwise
                        }
                }
        };

        const handleYesClick = () => {
                setStep('success');
                confetti({
                        particleCount: 150,
                        spread: 70,
                        origin: { y: 0.6 }
                });
        };

        const themes = {
                romantic: "bg-gradient-to-br from-rose-100 to-teal-50 dark:from-rose-950 dark:to-teal-950",
                playful: "bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-950 dark:to-orange-950",
                straightforward: "bg-slate-50 dark:bg-slate-950",
        };

        return (
                <main className={cn("min-h-screen flex flex-col items-center justify-center p-4", themes[invite.theme] || themes.romantic)}>
                        <motion.div
                                layout
                                className="max-w-md w-full text-center space-y-8"
                        >
                                <AnimatePresence mode="wait">
                                        {step !== 'success' && (
                                                <motion.div
                                                        key="question-card"
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -20 }}
                                                >
                                                        <div className="mb-4 text-sm font-medium uppercase tracking-widest text-muted-foreground">
                                                                {invite.senderName} asks...
                                                        </div>
                                                        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-8 leading-tight">
                                                                {step === 'are-you-sure' ? "Are you really sure?" : invite.questionText}
                                                        </h1>

                                                        <div className="flex flex-col md:flex-row items-center justify-center gap-4 relative min-h-[100px]">
                                                                <motion.button
                                                                        onClick={handleYesClick}
                                                                        animate={{ scale: yesScale }}
                                                                        whileHover={{ scale: yesScale * 1.1 }}
                                                                        whileTap={{ scale: yesScale * 0.9 }}
                                                                        className="bg-rose-600 text-white rounded-full px-8 py-4 text-xl font-bold shadow-xl hover:bg-rose-700 transition-colors z-10"
                                                                >
                                                                        {step === 'are-you-sure' ? "Wait, Yes!" : "Yes"}
                                                                </motion.button>

                                                                <motion.button
                                                                        onClick={handleNoClick}
                                                                        animate={noButtonStyle}
                                                                        onHoverStart={() => {
                                                                                if (step === 'are-you-sure') {
                                                                                        const x = (Math.random() - 0.5) * 300;
                                                                                        const y = (Math.random() - 0.5) * 300;
                                                                                        setNoButtonStyle({ transform: `translate(${x}px, ${y}px)` });
                                                                                        setYesScale(prev => prev + 0.1);
                                                                                }
                                                                        }}
                                                                        className="bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300 rounded-full px-8 py-4 text-xl font-medium hover:bg-slate-300 transition-colors"
                                                                >
                                                                        {step === 'are-you-sure' ? "Still No..." : "No"}
                                                                </motion.button>
                                                        </div>
                                                </motion.div>
                                        )}

                                        {step === 'success' && (
                                                <motion.div
                                                        key="success-card"
                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        className="space-y-6"
                                                >
                                                        <motion.div
                                                                animate={{ rotate: [0, 10, -10, 0] }}
                                                                transition={{ repeat: Infinity, duration: 2 }}
                                                                className="inline-block text-6xl"
                                                        >
                                                                🎉
                                                        </motion.div>
                                                        <h2 className="text-5xl font-serif font-bold text-rose-600 dark:text-rose-400">
                                                                It's a Date!
                                                        </h2>
                                                        <p className="text-xl text-muted-foreground">
                                                                Get ready for a great time with {invite.senderName}.
                                                        </p>
                                                </motion.div>
                                        )}
                                </AnimatePresence>
                        </motion.div>
                </main>
        );
}
