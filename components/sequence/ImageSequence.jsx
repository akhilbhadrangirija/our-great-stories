'use client';

import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import Lenis from 'lenis';
import useImagePreloader from '@/hooks/useImagePreloader';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

// Generate image paths
const frameCount = 240;
const imagePaths = Array.from({ length: frameCount }, (_, i) => {
        const frameNumber = (i + 1).toString().padStart(3, '0');
        return `/bg-image-frames/ezgif-frame-${frameNumber}.jpg`;
});

export default function ImageSequence() {
        const canvasRef = useRef(null);
        const containerRef = useRef(null);
        const { scrollYProgress } = useScroll({
                target: containerRef,
                offset: ['start start', 'end end'],
        });

        const { images, loaded, progress } = useImagePreloader(imagePaths);
        const [showQuestion, setShowQuestion] = useState(false);
        const [interactionState, setInteractionState] = useState('pending'); // 'pending', 'yes', 'no'
        const lenisRef = useRef(null);

        // Initialize Lenis for smooth scrolling
        useEffect(() => {
                const lenis = new Lenis({
                        duration: 1.2,
                        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                        orientation: 'vertical',
                        smoothWheel: true,
                });
                lenisRef.current = lenis;

                function raf(time) {
                        lenis.raf(time);
                        requestAnimationFrame(raf);
                }

                requestAnimationFrame(raf);

                return () => {
                        lenis.destroy();
                };
        }, []);

        // Update canvas frame based on scroll
        useMotionValueEvent(scrollYProgress, 'change', (latest) => {
                if (!loaded || !canvasRef.current || interactionState === 'yes') return;

                const frameIndex = Math.min(
                        frameCount - 1,
                        Math.floor(latest * (frameCount - 1))
                );

                // Logic for "Question" checkpoint
                // Let's say we ask at 75% scroll (approx frame 180)
                if (latest > 0.75 && interactionState === 'pending' && !showQuestion) {
                        setShowQuestion(true);
                } else if (latest < 0.70 && showQuestion) {
                        setShowQuestion(false);
                }

                // Logic to update canvas
                const ctx = canvasRef.current.getContext('2d');
                const img = images[frameIndex];

                if (img) {
                        // Draw image keeping aspect ratio 'cover'
                        const canvas = canvasRef.current;
                        const hRatio = canvas.width / img.width;
                        const vRatio = canvas.height / img.height;
                        const ratio = Math.max(hRatio, vRatio);
                        const centerShift_x = (canvas.width - img.width * ratio) / 2;
                        const centerShift_y = (canvas.height - img.height * ratio) / 2;
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        ctx.drawImage(
                                img,
                                0,
                                0,
                                img.width,
                                img.height,
                                centerShift_x,
                                centerShift_y,
                                img.width * ratio,
                                img.height * ratio
                        );
                }
        });

        // Handle resize for canvas
        useEffect(() => {
                const handleResize = () => {
                        if (canvasRef.current) {
                                canvasRef.current.width = window.innerWidth;
                                canvasRef.current.height = window.innerHeight;

                                // Redraw current frame if possible (simplified: just force update logic later or rely on scroll event)
                                if (loaded && images.length > 0) {
                                        // Trigger a redraw manually if needed, but scroll event usually covers it
                                        // For now, let's just ensure canvas size is correct
                                }
                        }
                };

                window.addEventListener('resize', handleResize);
                handleResize();

                return () => window.removeEventListener('resize', handleResize);
        }, [loaded, images]);


        const handleYes = () => {
                setInteractionState('yes');
                setShowQuestion(false);

                // Auto-scroll to end or animate to end
                if (lenisRef.current) {
                        lenisRef.current.scrollTo('bottom', { duration: 2 });
                }

                // Force animate canvas to end frame (if we want to decouple from scroll)
                // For now, let's rely on the scroll to drive it, but 'yes' sets state 
                // If we want programatic animation we'd need a separate effect driven by 'interactionState'
        };

        const handleNo = () => {
                const btn = document.getElementById('no-btn');
                if (btn) {
                        btn.classList.add('animate-shake');
                        setTimeout(() => btn.classList.remove('animate-shake'), 500);
                }
                // Maybe show a tooltip or toast?
                setInteractionState('no');
                // But allow scrolling to continue? Or block? 
                // Requirement: "Do not advance to the final frame" -> This implies we might block scroll or just not update canvas past this point?
                // Let's just keep it simple for now: shake and stay.
        };

        if (!loaded) {
                return (
                        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black text-white z-50">
                                <Loader2 className="w-10 h-10 animate-spin mb-4" />
                                <p className="text-xl font-light">Loading Experience... {progress}%</p>
                        </div>
                );
        }

        return (
                <div ref={containerRef} className="relative h-[800vh] bg-black">
                        <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
                                <canvas
                                        ref={canvasRef}
                                        className="w-full h-full object-cover"
                                />

                                {/* Interaction Overlay */}
                                <div className={cn(
                                        "absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-500",
                                        showQuestion && interactionState === 'pending' ? "opacity-100" : "opacity-0"
                                )}>
                                        <div className="bg-black/60 backdrop-blur-md p-8 rounded-2xl border border-white/10 text-center pointer-events-auto max-w-md mx-6">
                                                <h2 className="text-3xl font-bold text-white mb-2">Ready for the Beat?</h2>
                                                <p className="text-gray-300 mb-8">Unlock the full experience.</p>
                                                <div className="flex gap-4 justify-center">
                                                        <Button
                                                                onClick={handleYes}
                                                                className="bg-white text-black hover:bg-gray-200 px-8 py-6 text-lg rounded-full transition-transform hover:scale-105"
                                                        >
                                                                Yes, Let's Go
                                                        </Button>
                                                        <Button
                                                                id="no-btn"
                                                                onClick={handleNo}
                                                                variant="outline"
                                                                className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-full"
                                                        >
                                                                No, Not Yet
                                                        </Button>
                                                </div>
                                        </div>
                                </div>

                                {/* Optional: Scroll indicator or other overlays */}
                                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 text-sm animate-bounce">
                                        Scroll to explore
                                </div>
                        </div>

                        {/* Spacer content to allow scrolling? Or just pure empty height? 
          The Request implies purely visual story driven by scroll.
          We can add some text overlays at different scroll points if needed later.
      */}
                </div>
        );
}
