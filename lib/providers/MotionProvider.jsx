"use client";

/**
 * MotionProvider
 * Central motion orchestrator for page transitions and Lenis scroll synchronization
 */

import { createContext, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

export const LenisContext = createContext(null);

export function MotionProvider({ children }) {
        const [lenis, setLenis] = useState(null);
        const shouldReduceMotion = useReducedMotion();
        const rafId = useRef(null);

        useEffect(() => {
                // Don't initialize Lenis if user prefers reduced motion
                if (shouldReduceMotion) {
                        return;
                }

                // Initialize Lenis smooth scrolling
                const lenisInstance = new Lenis({
                        duration: 1.2,
                        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                        orientation: 'vertical',
                        gestureOrientation: 'vertical',
                        smoothWheel: true,
                        wheelMultiplier: 1,
                        smoothTouch: false, // Disable on touch devices for better performance
                        touchMultiplier: 2,
                        infinite: false,
                });

                setLenis(lenisInstance);

                // RAF loop for Lenis
                function raf(time) {
                        lenisInstance.raf(time);
                        rafId.current = requestAnimationFrame(raf);
                }

                rafId.current = requestAnimationFrame(raf);

                // Cleanup
                return () => {
                        if (rafId.current) {
                                cancelAnimationFrame(rafId.current);
                        }
                        lenisInstance.destroy();
                };
        }, [shouldReduceMotion]);

        return (
                <LenisContext.Provider value={lenis}>
                        {children}
                </LenisContext.Provider>
        );
}
