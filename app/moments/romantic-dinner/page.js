"use client";

/**
 * Romantic Dinner Template
 * Elegant, cinematic with parallax elements
 */

import { useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Heart, Utensils, Clock, ArrowLeft, Sparkles } from "lucide-react";
import { fadeInUp, slideInLeft, slideInRight } from "@/lib/utils/motion";

export default function RomanticDinnerTemplate() {
        const [hasAccepted, setHasAccepted] = useState(false);
        const { scrollYProgress } = useScroll();

        // Parallax effects
        const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
        const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);
        const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

        return (
                <div className="min-h-screen bg-gradient-to-br from-rose-950 via-pink-900/50 to-purple-950 text-white">
                        {/* Parallax Background Layers */}
                        <motion.div
                                className="absolute inset-0 opacity-20"
                                style={{
                                        y: y1,
                                        backgroundImage: `radial-gradient(circle at 20% 30%, rgba(244, 63, 94, 0.4) 0%, transparent 40%),
                            radial-gradient(circle at 80% 70%, rgba(236, 72, 153, 0.3) 0%, transparent 40%)`,
                                }}
                        />
                        <motion.div
                                className="absolute inset-0 opacity-10"
                                style={{
                                        y: y2,
                                        backgroundImage: `radial-gradient(circle at 50% 50%, rgba(217, 70, 239, 0.2) 0%, transparent 60%)`,
                                }}
                        />

                        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
                                {/* Back Button */}
                                <Reveal delay={0.1} className="absolute left-8 top-8">
                                        <Link
                                                href="/moments"
                                                className="flex items-center gap-2 text-rose-200 transition-colors hover:text-white"
                                        >
                                                <ArrowLeft className="h-5 w-5" />
                                                <span>Back</span>
                                        </Link>
                                </Reveal>

                                <motion.div style={{ opacity }} className="w-full max-w-3xl space-y-16">
                                        {/* Floating Hearts Decoration */}
                                        <div className="absolute inset-0 overflow-hidden">
                                                {[...Array(5)].map((_, i) => (
                                                        <motion.div
                                                                key={i}
                                                                className="absolute text-rose-400/20"
                                                                style={{
                                                                        left: `${20 + i * 15}%`,
                                                                        top: `${30 + i * 10}%`,
                                                                }}
                                                                animate={{
                                                                        y: [-20, 20, -20],
                                                                        rotate: [0, 10, -10, 0],
                                                                        scale: [1, 1.1, 1],
                                                                }}
                                                                transition={{
                                                                        duration: 3 + i,
                                                                        repeat: Infinity,
                                                                        delay: i * 0.5,
                                                                }}
                                                        >
                                                                <Heart className="h-8 w-8" fill="currentColor" />
                                                        </motion.div>
                                                ))}
                                        </div>

                                        {/* Header Icon */}
                                        <Reveal variant={fadeInUp} className="flex justify-center">
                                                <motion.div
                                                        className="relative inline-flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 via-pink-500 to-purple-500 shadow-2xl"
                                                        whileHover={{ scale: 1.05 }}
                                                        transition={{ type: "spring", stiffness: 300 }}
                                                >
                                                        <Utensils className="h-16 w-16 text-white" />
                                                        {/* Sparkle Effect */}
                                                        <motion.div
                                                                className="absolute -right-2 -top-2"
                                                                animate={{
                                                                        rotate: [0, 20, 0],
                                                                        scale: [1, 1.2, 1],
                                                                }}
                                                                transition={{
                                                                        duration: 2,
                                                                        repeat: Infinity,
                                                                }}
                                                        >
                                                                <Sparkles className="h-8 w-8 text-yellow-300" fill="currentColor" />
                                                        </motion.div>
                                                </motion.div>
                                        </Reveal>

                                        {/* Main Invitation Text */}
                                        <div className="space-y-8 text-center">
                                                <Reveal variant={slideInLeft} delay={0.2}>
                                                        <p className="font-serif text-xl italic text-rose-300">
                                                                A Special Evening
                                                        </p>
                                                </Reveal>

                                                <h1 className="font-serif text-5xl font-bold leading-tight tracking-tight sm:text-6xl md:text-7xl">
                                                        <TextReveal delay={0.3} staggerDelay={0.06} as="div">
                                                                You deserve something extraordinary
                                                        </TextReveal>
                                                </h1>

                                                <Reveal variant={fadeInUp} delay={0.7}>
                                                        <p className="mx-auto max-w-2xl font-serif text-xl leading-relaxed text-rose-100">
                                                                Let me take you to an unforgettable dining experience. Candlelit
                                                                ambiance, exquisite cuisine, and a night dedicated entirely to
                                                                celebrating you.
                                                        </p>
                                                </Reveal>
                                        </div>

                                        {/* Elegant Divider */}
                                        <Reveal delay={0.8}>
                                                <div className="flex items-center justify-center gap-4">
                                                        <div className="h-px w-20 bg-gradient-to-r from-transparent to-rose-400" />
                                                        <Heart className="h-5 w-5 text-rose-400" fill="currentColor" />
                                                        <div className="h-px w-20 bg-gradient-to-l from-transparent to-rose-400" />
                                                </div>
                                        </Reveal>

                                        {/* Event Details */}
                                        <div className="space-y-5">
                                                <Reveal variant={slideInLeft} delay={0.9}>
                                                        <div className="rounded-2xl border border-rose-400/30 bg-white/5 p-6 backdrop-blur-xl">
                                                                <div className="flex items-center gap-5">
                                                                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-rose-400/30 to-pink-500/30">
                                                                                <Clock className="h-8 w-8 text-rose-300" />
                                                                        </div>
                                                                        <div>
                                                                                <p className="font-serif text-xl font-semibold">
                                                                                        Saturday Evening, 7:30 PM
                                                                                </p>
                                                                                <p className="text-rose-200">Dress code: Elegantly yourself</p>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                </Reveal>

                                                <Reveal variant={slideInRight} delay={1}>
                                                        <div className="rounded-2xl border border-pink-400/30 bg-white/5 p-6 backdrop-blur-xl">
                                                                <div className="flex items-center gap-5">
                                                                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-pink-400/30 to-purple-500/30">
                                                                                <Utensils className="h-8 w-8 text-pink-300" />
                                                                        </div>
                                                                        <div>
                                                                                <p className="font-serif text-xl font-semibold">
                                                                                        La Belle Étoile Restaurant
                                                                                </p>
                                                                                <p className="text-pink-200">
                                                                                        Michelin-starred dining with city views
                                                                                </p>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                </Reveal>
                                        </div>

                                        {/* CTA */}
                                        <Reveal variant={fadeInUp} delay={1.1} className="flex justify-center pt-4">
                                                {!hasAccepted ? (
                                                        <MagneticButton
                                                                onClick={() => setHasAccepted(true)}
                                                                strength={0.6}
                                                                className="h-16 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 px-14 font-serif text-xl font-semibold text-white shadow-2xl transition-all hover:shadow-rose-500/50"
                                                        >
                                                                I'll be there ♥
                                                        </MagneticButton>
                                                ) : (
                                                        <motion.div
                                                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                                                transition={{ type: "spring", duration: 0.7 }}
                                                        >
                                                                <div className="rounded-2xl border-2 border-rose-300/50 bg-rose-500/10 px-12 py-8 text-center backdrop-blur-sm">
                                                                        <motion.div
                                                                                animate={{ scale: [1, 1.1, 1] }}
                                                                                transition={{ duration: 1.5, repeat: Infinity }}
                                                                        >
                                                                                <Heart className="mx-auto mb-4 h-12 w-12 text-rose-300" fill="currentColor" />
                                                                        </motion.div>
                                                                        <p className="font-serif text-2xl font-bold text-rose-200">
                                                                                It's a date!
                                                                        </p>
                                                                        <p className="mt-2 text-rose-300">
                                                                                I can't wait to see you ✨
                                                                        </p>
                                                                </div>
                                                        </motion.div>
                                                )}
                                        </Reveal>
                                </motion.div>
                        </div>
                </div>
        );
}
