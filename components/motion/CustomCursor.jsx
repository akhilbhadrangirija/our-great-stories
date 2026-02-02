"use client";

/**
 * CustomCursor Component
 * Desktop-only custom cursor with smooth interpolation
 */

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

export function CustomCursor() {
        const [isVisible, setIsVisible] = useState(false);
        const [isPointer, setIsPointer] = useState(false);
        const shouldReduceMotion = useReducedMotion();

        const cursorX = useMotionValue(-100);
        const cursorY = useMotionValue(-100);

        const springConfig = { damping: 25, stiffness: 700 };
        const cursorXSpring = useSpring(cursorX, springConfig);
        const cursorYSpring = useSpring(cursorY, springConfig);

        useEffect(() => {
                // Don't show custom cursor on touch devices or if reduced motion
                if ('ontouchstart' in window || shouldReduceMotion) {
                        return;
                }

                const updateCursor = (e) => {
                        cursorX.set(e.clientX);
                        cursorY.set(e.clientY);

                        // Check if hovering over interactive elements
                        const target = e.target;
                        const isInteractive =
                                target.tagName === 'A' ||
                                target.tagName === 'BUTTON' ||
                                target.onclick ||
                                target.classList.contains('cursor-pointer') ||
                                window.getComputedStyle(target).cursor === 'pointer';

                        setIsPointer(isInteractive);
                };

                const handleMouseEnter = () => setIsVisible(true);
                const handleMouseLeave = () => setIsVisible(false);

                window.addEventListener('mousemove', updateCursor);
                document.addEventListener('mouseenter', handleMouseEnter);
                document.addEventListener('mouseleave', handleMouseLeave);

                return () => {
                        window.removeEventListener('mousemove', updateCursor);
                        document.removeEventListener('mouseenter', handleMouseEnter);
                        document.removeEventListener('mouseleave', handleMouseLeave);
                };
        }, [cursorX, cursorY, shouldReduceMotion]);

        // Don't render on touch devices or if reduced motion
        const isTouch = typeof window !== 'undefined' && 'ontouchstart' in window;
        if (isTouch || shouldReduceMotion) {
                return null;
        }

        return (
                <>
                        <motion.div
                                className="pointer-events-none fixed left-0 top-0 z-50 mix-blend-difference"
                                style={{
                                        x: cursorXSpring,
                                        y: cursorYSpring,
                                        translateX: '-50%',
                                        translateY: '-50%',
                                }}
                        >
                                <motion.div
                                        animate={{
                                                width: isPointer ? 60 : 40,
                                                height: isPointer ? 60 : 40,
                                                opacity: isVisible ? 1 : 0,
                                        }}
                                        transition={{ duration: 0.2 }}
                                        className="rounded-full border-2 border-white"
                                />
                        </motion.div>

                        <motion.div
                                className="pointer-events-none fixed left-0 top-0 z-50"
                                style={{
                                        x: cursorXSpring,
                                        y: cursorYSpring,
                                        translateX: '-50%',
                                        translateY: '-50%',
                                }}
                        >
                                <motion.div
                                        animate={{
                                                scale: isPointer ? 0 : 1,
                                                opacity: isVisible ? 1 : 0,
                                        }}
                                        transition={{ duration: 0.15 }}
                                        className="h-2 w-2 rounded-full bg-white mix-blend-difference"
                                />
                        </motion.div>
                </>
        );
}
