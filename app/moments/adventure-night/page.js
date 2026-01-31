"use client";

/**
 * Adventure Night Template
 * Bold, energetic with runaway button interaction
 */

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { RunawayButton } from "@/components/motion/RunawayButton";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Zap, Map, Calendar, ArrowLeft } from "lucide-react";
import { scaleIn, fadeInUp } from "@/lib/utils/motion";

export default function AdventureNightTemplate() {
        const [hasAccepted, setHasAccepted] = useState(false);

        return (
                <div className="min-h-screen bg-gradient-to-br from-blue-950 via-purple-900 to-indigo-950 text-white">
                        {/* Animated Background Gradient */}
                        <motion.div
                                className="absolute inset-0"
                                style={{
                                        backgroundImage: `radial-gradient(circle at 30% 50%, rgba(59, 130, 246, 0.4) 0%, transparent 50%),
                            radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.4) 0%, transparent 50%)`,
                                }}
                                animate={{
                                        backgroundPosition: ["0% 0%", "100% 100%"],
                                }}
                                transition={{
                                        duration: 20,
                                        repeat: Infinity,
                                        repeatType: "reverse",
                                }}
                        />

                        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
                                {/* Back Button */}
                                <Reveal delay={0.1} className="absolute left-8 top-8">
                                        <Link
                                                href="/moments"
                                                className="flex items-center gap-2 text-blue-200 transition-colors hover:text-white"
                                        >
                                                <ArrowLeft className="h-5 w-5" />
                                                <span>Back</span>
                                        </Link>
                                </Reveal>

                                <div className="w-full max-w-2xl space-y-12">
                                        {/* Header Icon */}
                                        <Reveal variant={scaleIn} className="flex justify-center">
                                                <motion.div
                                                        className="relative inline-flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-2xl"
                                                        whileHover={{ scale: 1.1, rotate: 10 }}
                                                        transition={{ type: "spring", stiffness: 300 }}
                                                >
                                                        <Zap className="h-14 w-14 text-white" fill="white" />
                                                        {/* Pulse Effect */}
                                                        <motion.div
                                                                className="absolute inset-0 rounded-full bg-blue-400"
                                                                animate={{
                                                                        scale: [1, 1.2, 1],
                                                                        opacity: [0.5, 0, 0.5],
                                                                }}
                                                                transition={{
                                                                        duration: 2,
                                                                        repeat: Infinity,
                                                                }}
                                                        />
                                                </motion.div>
                                        </Reveal>

                                        {/* Main Invitation Text */}
                                        <div className="space-y-6 text-center">
                                                <Reveal variant={fadeInUp} delay={0.2}>
                                                        <h2 className="text-2xl font-bold uppercase tracking-widest text-blue-300">
                                                                Adventure Awaits
                                                        </h2>
                                                </Reveal>

                                                <h1 className="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
                                                        <TextReveal delay={0.3} staggerDelay={0.05} as="div">
                                                                Ready for an epic night?
                                                        </TextReveal>
                                                </h1>

                                                <Reveal variant={fadeInUp} delay={0.6}>
                                                        <p className="mx-auto max-w-xl text-xl text-blue-100">
                                                                I've got something exciting planned. Trust me, you won't want to
                                                                miss this! Are you brave enough to say yes?
                                                        </p>
                                                </Reveal>
                                        </div>

                                        {/* Event Details - Mysterious */}
                                        <div className="space-y-4">
                                                <Reveal variant={fadeInUp} delay={0.7}>
                                                        <div className="rounded-lg border border-blue-400/30 bg-white/10 p-5 backdrop-blur-md">
                                                                <div className="flex items-center gap-4">
                                                                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-500">
                                                                                <Calendar className="h-7 w-7 text-white" />
                                                                        </div>
                                                                        <div>
                                                                                <p className="text-lg font-bold">This Friday, 7:00 PM</p>
                                                                                <p className="text-blue-200">Perfect time for adventure</p>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                </Reveal>

                                                <Reveal variant={fadeInUp} delay={0.8}>
                                                        <div className="rounded-lg border border-purple-400/30 bg-white/10 p-5 backdrop-blur-md">
                                                                <div className="flex items-center gap-4">
                                                                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-pink-500">
                                                                                <Map className="h-7 w-7 text-white" />
                                                                        </div>
                                                                        <div>
                                                                                <p className="text-lg font-bold">It's a Surprise!</p>
                                                                                <p className="text-purple-200">I'll pick you up 😉</p>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                </Reveal>
                                        </div>

                                        {/* Interactive CTA with Runaway Button */}
                                        <Reveal variant={fadeInUp} delay={0.9}>
                                                {!hasAccepted ? (
                                                        <div className="flex flex-col items-center gap-4">
                                                                <p className="text-sm font-medium text-blue-200">
                                                                        Catch the button if you dare!
                                                                </p>
                                                                <RunawayButton
                                                                        onCatch={() => setHasAccepted(true)}
                                                                        repulsionRadius={180}
                                                                        repulsionStrength={120}
                                                                        catchAfterAttempts={4}
                                                                        className="h-16 bg-gradient-to-r from-blue-500 to-purple-600 px-10 text-xl font-bold text-white shadow-2xl transition-all hover:from-blue-600 hover:to-purple-700"
                                                                >
                                                                        Yes! Let's Do This! ⚡
                                                                </RunawayButton>
                                                        </div>
                                                ) : (
                                                        <motion.div
                                                                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                                                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                                                transition={{ type: "spring", duration: 0.6 }}
                                                                className="flex justify-center"
                                                        >
                                                                <div className="rounded-2xl border-2 border-green-400 bg-green-500/20 px-10 py-6 backdrop-blur-sm">
                                                                        <p className="text-center text-2xl font-black text-green-300">
                                                                                AWESOME! 🎉
                                                                                <br />
                                                                                <span className="text-lg">Get ready for an unforgettable night!</span>
                                                                        </p>
                                                                </div>
                                                        </motion.div>
                                                )}
                                        </Reveal>
                                </div>
                        </div>
                </div>
        );
}
