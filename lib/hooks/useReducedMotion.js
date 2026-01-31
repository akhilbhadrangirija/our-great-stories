/**
 * useReducedMotion Hook
 * Detects if user prefers reduced motion based on OS settings and device capabilities
 */

import { useEffect, useState } from 'react';

export function useReducedMotion() {
        const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

        useEffect(() => {
                // Check for user's OS preference
                const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

                // Set initial value
                setShouldReduceMotion(mediaQuery.matches);

                // Listen for changes
                const handleChange = (e) => {
                        setShouldReduceMotion(e.matches);
                };

                mediaQuery.addEventListener('change', handleChange);

                return () => {
                        mediaQuery.removeEventListener('change', handleChange);
                };
        }, []);

        return shouldReduceMotion;
}
