"use client";

/**
 * Reveal Component
 * Generic component for viewport-based reveal animations
 */

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';
import { fadeInUp } from '@/lib/utils/motion';

export function Reveal({
        children,
        variant = fadeInUp,
        delay = 0,
        duration,
        once = true,
        className = '',
}) {
        const ref = useRef(null);
        const isInView = useInView(ref, { once, margin: '-100px' });
        const shouldReduceMotion = useReducedMotion();

        // If reduced motion, skip animations
        if (shouldReduceMotion) {
                return <div className={className}>{children}</div>;
        }

        // Apply custom duration if provided
        const customVariant = duration
                ? {
                        ...variant,
                        visible: {
                                ...variant.visible,
                                transition: {
                                        ...variant.visible.transition,
                                        duration,
                                        delay,
                                },
                        },
                }
                : {
                        ...variant,
                        visible: {
                                ...variant.visible,
                                transition: {
                                        ...variant.visible.transition,
                                        delay,
                                },
                        },
                };

        return (
                <motion.div
                        ref={ref}
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                        variants={customVariant}
                        className={className}
                >
                        {children}
                </motion.div>
        );
}
