"use client";

/**
 * RunawayButton Component
 * Physics-based button that moves away from cursor (playful interaction)
 */

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useState } from 'react';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';
import { Button } from '@/components/ui/button';

export function RunawayButton({
        children,
        onCatch,
        repulsionRadius = 150,
        repulsionStrength = 100,
        catchAfterAttempts = 5,
        className = '',
        ...props
}) {
        const ref = useRef(null);
        const [attempts, setAttempts] = useState(0);
        const [isCaught, setIsCaught] = useState(false);
        const shouldReduceMotion = useReducedMotion();

        const x = useMotionValue(0);
        const y = useMotionValue(0);

        const springConfig = { damping: 15, stiffness: 200 };
        const springX = useSpring(x, springConfig);
        const springY = useSpring(y, springConfig);

        const handleMouseMove = (e) => {
                if (!ref.current || shouldReduceMotion || isCaught) return;

                const rect = ref.current.getBoundingClientRect();
                const buttonCenterX = rect.left + rect.width / 2;
                const buttonCenterY = rect.top + rect.height / 2;

                const distanceX = e.clientX - buttonCenterX;
                const distanceY = e.clientY - buttonCenterY;
                const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

                // If cursor is within repulsion radius and hasn't been caught yet
                if (distance < repulsionRadius && attempts < catchAfterAttempts) {
                        const angle = Math.atan2(distanceY, distanceX);
                        const force = Math.max(0, repulsionRadius - distance) / repulsionRadius;

                        // Calculate new position (repel away from cursor)
                        const moveX = -Math.cos(angle) * repulsionStrength * force;
                        const moveY = -Math.sin(angle) * repulsionStrength * force;

                        // Keep button within viewport bounds
                        const maxX = window.innerWidth / 2 - rect.width;
                        const maxY = window.innerHeight / 2 - rect.height;

                        const newX = Math.max(-maxX, Math.min(maxX, x.get() + moveX));
                        const newY = Math.max(-maxY, Math.min(maxY, y.get() + moveY));

                        x.set(newX);
                        y.set(newY);

                        setAttempts((prev) => prev + 1);
                }
        };

        const handleClick = () => {
                setIsCaught(true);
                x.set(0);
                y.set(0);
                if (onCatch) onCatch();
        };

        // If reduced motion or caught, render normal button
        if (shouldReduceMotion || (isCaught && attempts >= catchAfterAttempts)) {
                return (
                        <Button className={className} onClick={handleClick} {...props}>
                                {children}
                        </Button>
                );
        }

        return (
                <div
                        onMouseMove={handleMouseMove}
                        className="relative flex items-center justify-center"
                        style={{ minHeight: '200px', minWidth: '100%' }}
                >
                        <motion.div
                                ref={ref}
                                style={{ x: springX, y: springY }}
                                className="inline-block"
                        >
                                <Button
                                        className={className}
                                        onClick={handleClick}
                                        {...props}
                                >
                                        {children}
                                </Button>
                        </motion.div>
                        {attempts > 0 && attempts < catchAfterAttempts && (
                                <p className="absolute bottom-0 text-sm text-gray-500">
                                        Try again! ({catchAfterAttempts - attempts} more attempts)
                                </p>
                        )}
                </div>
        );
}
