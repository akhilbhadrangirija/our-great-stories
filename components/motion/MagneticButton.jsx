"use client";

/**
 * MagneticButton Component
 * Button that "pulls" towards cursor on hover with spring physics
 */

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';
import { Button } from '@/components/ui/button';

export function MagneticButton({
        children,
        strength = 0.3,
        className = '',
        ...props
}) {
        const ref = useRef(null);
        const [isHovered, setIsHovered] = useState(false);
        const shouldReduceMotion = useReducedMotion();

        const x = useMotionValue(0);
        const y = useMotionValue(0);

        const springConfig = { damping: 20, stiffness: 300 };
        const springX = useSpring(x, springConfig);
        const springY = useSpring(y, springConfig);

        const handleMouseMove = (e) => {
                if (!ref.current || shouldReduceMotion) return;

                const rect = ref.current.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                const distanceX = (e.clientX - centerX) * strength;
                const distanceY = (e.clientY - centerY) * strength;

                x.set(distanceX);
                y.set(distanceY);
        };

        const handleMouseLeave = () => {
                setIsHovered(false);
                x.set(0);
                y.set(0);
        };

        // If reduced motion, render normal button
        if (shouldReduceMotion) {
                return (
                        <Button className={className} {...props}>
                                {children}
                        </Button>
                );
        }

        return (
                <motion.div
                        ref={ref}
                        onMouseMove={handleMouseMove}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={handleMouseLeave}
                        style={{ x: springX, y: springY }}
                        className="inline-block"
                >
                        <Button className={className} {...props}>
                                {children}
                        </Button>
                </motion.div>
        );
}
