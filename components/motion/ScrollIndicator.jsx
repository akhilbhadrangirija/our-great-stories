"use client";

/**
 * ScrollIndicator Component
 * Animated scroll indicator to encourage users to explore content below
 */

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function ScrollIndicator() {
        return (
                <motion.div
                        className="fixed bottom-8 left-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.6 }}
                >
                        <motion.div
                                animate={{
                                        y: [0, 10, 0],
                                }}
                                transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                }}
                                className="flex flex-col items-center"
                        >
                                <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                                        Scroll to explore
                                </span>
                                <div className="flex flex-col items-center gap-1">
                                        <ChevronDown className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                                        <ChevronDown className="h-5 w-5 text-gray-400 dark:text-gray-500 -mt-3" />
                                </div>
                        </motion.div>
                </motion.div>
        );
}
