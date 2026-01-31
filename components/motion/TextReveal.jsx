"use client";

/**
 * TextReveal Component
 * Kinetic typography with character-by-character staggered reveals
 */

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

export function TextReveal({
        children,
        delay = 0,
        staggerDelay = 0.03,
        className = '',
        as: Component = 'p',
}) {
        const ref = useRef(null);
        const isInView = useInView(ref, { once: true, margin: '-50px' });
        const shouldReduceMotion = useReducedMotion();

        // If reduced motion, render normally
        if (shouldReduceMotion) {
                return <Component className={className}>{children}</Component>;
        }

        // Split text into characters
        const text = typeof children === 'string' ? children : '';
        const characters = text.split('');

        const container = {
                hidden: { opacity: 0 },
                visible: {
                        opacity: 1,
                        transition: {
                                staggerChildren: staggerDelay,
                                delayChildren: delay,
                        },
                },
        };

        const child = {
                hidden: {
                        opacity: 0,
                        y: 20,
                        filter: 'blur(4px)',
                },
                visible: {
                        opacity: 1,
                        y: 0,
                        filter: 'blur(0px)',
                        transition: {
                                duration: 0.5,
                                ease: [0.25, 0.1, 0.25, 1],
                        },
                },
        };

        return (
                <Component
                        as={motion[Component]}
                        ref={ref}
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                        variants={container}
                        className={className}
                >
                        {characters.map((char, index) => (
                                <motion.span
                                        key={index}
                                        variants={child}
                                        style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
                                >
                                        {char}
                                </motion.span>
                        ))}
                </Component>
        );
}
