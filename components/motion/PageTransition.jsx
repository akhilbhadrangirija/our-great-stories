"use client";

/**
 * PageTransition Component
 * Provides smooth page transition animations
 */

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const pageVariants = {
        initial: {
                opacity: 0,
                y: 20,
        },
        enter: {
                opacity: 1,
                y: 0,
                transition: {
                        duration: 0.4,
                        ease: "easeOut",
                },
        },
        exit: {
                opacity: 0,
                y: -20,
                transition: {
                        duration: 0.3,
                        ease: "easeIn",
                },
        },
};

export function PageTransition({ children }) {
        const pathname = usePathname();

        return (
                <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                                key={pathname}
                                variants={pageVariants}
                                initial="initial"
                                animate="enter"
                                exit="exit"
                        >
                                {children}
                        </motion.div>
                </AnimatePresence>
        );
}
