'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence, motion } from 'framer-motion';
import HeroSection from '../../components/sequence/HeroSection';
import EmotionalSection from '../../components/sequence/EmotionalSection';

const ImageSequence = dynamic(() => import('../../components/sequence/ImageSequence'), {
        ssr: false,
        loading: () => <div className="fixed inset-0 bg-black z-[-1]" />
});

export default function SequencePage() {
        const [started, setStarted] = useState(false);
        const [finished, setFinished] = useState(false);

        return (
                <main className="relative w-full min-h-screen text-white">

                        {/* Fixed Background Sequence */}
                        <ImageSequence
                                start={started}
                                onComplete={() => setFinished(true)}
                        />

                        {/* Hero Section - Fades out when started */}
                        <AnimatePresence>
                                {!started && (
                                        <motion.div
                                                exit={{ opacity: 0, transition: { duration: 1 } }}
                                                className="relative z-10"
                                        >
                                                <HeroSection onStart={() => setStarted(true)} />
                                        </motion.div>
                                )}
                        </AnimatePresence>

                        {/* Emotional Section - Appears when sequence finishes */}
                        {finished && <EmotionalSection />}
                </main>
        );
}
