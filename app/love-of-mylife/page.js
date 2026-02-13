'use client';

import { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence, motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import HeroSection from '../../components/sequence/HeroSection';
import EmotionalSection from '../../components/sequence/EmotionalSection';

const ImageSequence = dynamic(() => import('../../components/sequence/ImageSequence'), {
        ssr: false,
        loading: () => <div className="fixed inset-0 bg-black z-[-1]" />
});

export default function SequencePage() {
        const [started, setStarted] = useState(false);
        const [isMuted, setIsMuted] = useState(false);
        const audioRef = useRef(null);

        useEffect(() => {
                // Initialize audio
                audioRef.current = new Audio('/audio_track.mp3');
                audioRef.current.loop = true;
                audioRef.current.volume = 0.5;

                return () => {
                        if (audioRef.current) {
                                audioRef.current.pause();
                                audioRef.current = null;
                        }
                };
        }, []);

        const handleStart = () => {
                setStarted(true);
                if (audioRef.current) {
                        audioRef.current.play().catch(error => {
                                console.log("Audio play failed:", error);
                        });
                }
        };

        const toggleMute = () => {
                if (audioRef.current) {
                        audioRef.current.muted = !isMuted;
                        setIsMuted(!isMuted);
                }
        };

        return (
                <main className="relative w-full min-h-screen text-white">

                        {/* Fixed Background Sequence - Driven by Scroll when started */}
                        <ImageSequence start={started} />

                        {/* Hero Section - Fades out when started */}
                        <AnimatePresence>
                                {!started && (
                                        <motion.div
                                                exit={{ opacity: 0, transition: { duration: 1 } }}
                                                className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-[5px]"
                                        >
                                                {/* Wrap Hero in a fixed container to ensure it stays top */}
                                                <div className="w-full h-full relative">
                                                        <HeroSection onStart={handleStart} />
                                                </div>
                                        </motion.div>
                                )}
                        </AnimatePresence>

                        {/* Emotional Section - Tall Scroll Container */}
                        {/* Only render when started so it mounts and resets scroll */}
                        {started && <EmotionalSection />}

                        {/* Fixed Mute Button */}
                        {started && (
                                <motion.button
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="fixed bottom-6 right-6 z-50 p-4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full border border-white/20 shadow-lg transition-all"
                                        onClick={toggleMute}
                                        aria-label={isMuted ? "Unmute" : "Mute"}
                                >
                                        {isMuted ? <VolumeX className="w-6 h-6 text-white" /> : <Volume2 className="w-6 h-6 text-white" />}
                                </motion.button>
                        )}
                </main>
        );
}
