"use client";

/**
 * Coffee Date Template
 * Warm, minimalist aesthetic with kinetic typography
 */

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Coffee, MapPin, Clock, ArrowLeft } from "lucide-react";
import { fadeInUp, slideInLeft, slideInRight } from "@/lib/utils/motion";

export default function CoffeeDateTemplate() {
        const [hasAccepted, setHasAccepted] = useState(false);

        return (
                <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50/50 to-yellow-50 dark:from-gray-900 dark:via-orange-950/10 dark:to-gray-900">
                        {/* Parallax Background Decoration */}
                        <motion.div
                                className="absolute inset-0 opacity-10"
                                style={{
                                        backgroundImage: `radial-gradient(circle at 20% 50%, rgba(251, 146, 60, 0.3) 0%, transparent 50%),
                            radial-gradient(circle at 80% 80%, rgba(245, 158, 11, 0.3) 0%, transparent 50%)`,
                                }}
                                initial={{ scale: 1.2, opacity: 0 }}
                                animate={{ scale: 1, opacity: 0.1 }}
                                transition={{ duration: 1.5 }}
                        />

                        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
                                {/* Back Button */}
                                <Reveal delay={0.1} className="absolute left-8 top-8">
                                        <Link
                                                href="/moments"
                                                className="flex items-center gap-2 text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                                        >
                                                <ArrowLeft className="h-5 w-5" />
                                                <span>Back</span>
                                        </Link>
                                </Reveal>

                                <div className="w-full max-w-2xl space-y-12">
                                        {/* Header Icon */}
                                        <Reveal variant={fadeInUp} className="flex justify-center">
                                                <motion.div
                                                        className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow-xl"
                                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                                        transition={{ type: "spring", stiffness: 300 }}
                                                >
                                                        <Coffee className="h-12 w-12 text-white" />
                                                </motion.div>
                                        </Reveal>

                                        {/* Main Invitation Text */}
                                        <div className="space-y-6 text-center">
                                                <Reveal variant={slideInLeft} delay={0.2}>
                                                        <h2 className="text-2xl font-medium text-amber-800 dark:text-amber-300">
                                                                You're Invited
                                                        </h2>
                                                </Reveal>

                                                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl dark:text-white">
                                                        <TextReveal delay={0.3} staggerDelay={0.04} as="div">
                                                                Let's grab coffee together
                                                        </TextReveal>
                                                </h1>

                                                <Reveal variant={fadeInUp} delay={0.6}>
                                                        <p className="mx-auto max-w-xl text-lg text-gray-600 dark:text-gray-300">
                                                                I know this amazing little café with the best lattes in town.
                                                                What do you say we catch up over some warm drinks?
                                                        </p>
                                                </Reveal>
                                        </div>

                                        {/* Event Details */}
                                        <div className="space-y-4">
                                                <Reveal variant={slideInLeft} delay={0.7}>
                                                        <div className="flex items-center gap-4 rounded-lg border border-amber-200 bg-white/80 p-4 backdrop-blur-sm dark:border-amber-900/50 dark:bg-gray-900/80">
                                                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
                                                                        <Clock className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                                                                </div>
                                                                <div>
                                                                        <p className="font-medium text-gray-900 dark:text-white">
                                                                                Saturday, 10:00 AM
                                                                        </p>
                                                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                                                                Perfect timing for brunch
                                                                        </p>
                                                                </div>
                                                        </div>
                                                </Reveal>

                                                <Reveal variant={slideInRight} delay={0.8}>
                                                        <div className="flex items-center gap-4 rounded-lg border border-amber-200 bg-white/80 p-4 backdrop-blur-sm dark:border-amber-900/50 dark:bg-gray-900/80">
                                                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
                                                                        <MapPin className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                                                                </div>
                                                                <div>
                                                                        <p className="font-medium text-gray-900 dark:text-white">
                                                                                The Cozy Corner Café
                                                                        </p>
                                                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                                                                123 Main Street, Downtown
                                                                        </p>
                                                                </div>
                                                        </div>
                                                </Reveal>
                                        </div>

                                        {/* CTA */}
                                        <Reveal variant={fadeInUp} delay={0.9} className="flex justify-center">
                                                {!hasAccepted ? (
                                                        <MagneticButton
                                                                onClick={() => setHasAccepted(true)}
                                                                strength={0.5}
                                                                className="h-14 bg-gradient-to-r from-amber-500 to-orange-600 px-12 text-lg font-semibold text-white shadow-xl transition-all hover:from-amber-600 hover:to-orange-700 hover:shadow-2xl"
                                                        >
                                                                I'd love to! ☕
                                                        </MagneticButton>
                                                ) : (
                                                        <motion.div
                                                                initial={{ opacity: 0, scale: 0.9 }}
                                                                animate={{ opacity: 1, scale: 1 }}
                                                                className="rounded-xl border-2 border-green-300 bg-green-50 px-8 py-4 dark:border-green-700 dark:bg-green-950/30"
                                                        >
                                                                <p className="text-xl font-semibold text-green-700 dark:text-green-300">
                                                                        Amazing! See you there! 🎉
                                                                </p>
                                                        </motion.div>
                                                )}
                                        </Reveal>
                                </div>
                        </div>
                </div>
        );
}
