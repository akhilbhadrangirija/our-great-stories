/**
 * useLenis Hook
 * Provides access to the Lenis scroll instance
 */

import { useContext } from 'react';
import { LenisContext } from '@/lib/providers/MotionProvider';

export function useLenis() {
        const lenis = useContext(LenisContext);
        return lenis;
}
