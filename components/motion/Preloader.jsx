"use client";

/**
 * Preloader Component
 * Displays while the app is loading to hide asset loading
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

export function Preloader() {
        const [isLoading, setIsLoading] = useState(true);
        const [loadingProgress, setLoadingProgress] = useState(0);

        useEffect(() => {
                // Simulate loading progress
                const interval = setInterval(() => {
                        setLoadingProgress((prev) => {
                                if (prev >= 100) {
                                        clearInterval(interval);
                                        return 100;
                                }
                                return prev + 10;
                        });
                }, 150);

                // Hide preloader once loading is done
                const timer = setTimeout(() => {
                        setIsLoading(false);
                }, 1800);

                return () => {
                        clearInterval(interval);
                        clearTimeout(timer);
                };
        }, []);

        return (
                <AnimatePresence mode="wait">
                        {isLoading && (
                                <motion.div
                                        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-rose-50 via-indigo-50/30 to-purple-50 dark:from-gray-900 dark:via-indigo-950/20 dark:to-gray-900"
                                        initial={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.6, ease: "easeInOut" }}
                                >
                                        {/* Animated Logo/Icon */}
                                        <motion.div
                                                className="mb-8"
                                                initial={{ scale: 0.8, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{ duration: 0.5 }}
                                        >
                                                <motion.div
                                                        animate={{
                                                                scale: [1, 1.1, 1],
                                                                rotate: [0, 5, -5, 0],
                                                        }}
                                                        transition={{
                                                                duration: 2,
                                                                repeat: Infinity,
                                                                ease: "easeInOut",
                                                        }}
                                                        className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-indigo-500 shadow-2xl"
                                                >
                                                        <Heart className="h-10 w-10 text-white" fill="white" />
                                                </motion.div>
                                        </motion.div>

                                        {/* Loading Text */}
                                        <motion.h2
                                                className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.2, duration: 0.5 }}
                                        >
                                                Creating magic...
                                        </motion.h2>

                                        {/* Progress Bar */}
                                        <div className="w-64 h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                                                <motion.div
                                                        className="h-full bg-gradient-to-r from-rose-500 to-indigo-500"
                                                        initial={{ width: "0%" }}
                                                        animate={{ width: `${loadingProgress}%` }}
                                                        transition={{ duration: 0.3, ease: "easeOut" }}
                                                />
                                        </div>

                                        {/* Loading Percentage */}
                                        <motion.p
                                                className="mt-4 text-sm font-medium text-gray-600 dark:text-gray-400"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.3 }}
                                        >
                                                {loadingProgress}%
                                        </motion.p>
                                </motion.div>
                        )}
                </AnimatePresence>
        );
}
