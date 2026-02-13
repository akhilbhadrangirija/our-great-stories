'use client';

import { useEffect, useRef, useState } from 'react';
import useImagePreloader from '@/hooks/useImagePreloader';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

// Generate image paths
const frameCount = 240;
const imagePaths = Array.from({ length: frameCount }, (_, i) => {
        const frameNumber = (i + 1).toString().padStart(3, '0');
        return `/bg-image-frames/ezgif-frame-${frameNumber}.jpg`;
});

export default function ImageSequence({ start, onComplete }) {
        const canvasRef = useRef(null);
        const [currentFrame, setCurrentFrame] = useState(0);
        const [isFinished, setIsFinished] = useState(false);
        const requestRef = useRef();
        const startTimeRef = useRef();

        const { images, loaded, progress } = useImagePreloader(imagePaths);

        // Animation Logic
        const animate = (time) => {
                if (!startTimeRef.current) startTimeRef.current = time;
                const progress = time - startTimeRef.current;

                // Duration: 10 seconds (adjust as needed)
                const duration = 10000;
                const totalFrames = frameCount - 1;

                // Calculate frame based on time progress
                let frameIndex = Math.floor((progress / duration) * totalFrames);

                if (frameIndex > totalFrames) {
                        frameIndex = totalFrames;
                        setIsFinished(true);
                        if (onComplete) onComplete();
                        return; // Stop animation
                }

                setCurrentFrame(frameIndex);
                requestRef.current = requestAnimationFrame(animate);
        };

        useEffect(() => {
                if (start && loaded && !isFinished) {
                        requestRef.current = requestAnimationFrame(animate);
                }
                return () => cancelAnimationFrame(requestRef.current);
        }, [start, loaded, isFinished]);


        // Draw Frame Function
        const drawFrame = (index) => {
                if (!canvasRef.current || !loaded || !images[index]) return;

                const ctx = canvasRef.current.getContext('2d');
                const img = images[index];
                const canvas = canvasRef.current;

                // Ensure canvas dimensions match window if not set
                if (canvas.width !== window.innerWidth) canvas.width = window.innerWidth;
                if (canvas.height !== window.innerHeight) canvas.height = window.innerHeight;

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
        };

        // Animation Loop
        // ... (animate function uses setCurrentFrame)

        // Trigger draw on frame change or load
        useEffect(() => {
                drawFrame(currentFrame);
        }, [currentFrame, loaded, images]);

        // Handle Resize
        useEffect(() => {
                const handleResize = () => {
                        if (canvasRef.current) {
                                // Setting width/height clears canvas
                                canvasRef.current.width = window.innerWidth;
                                canvasRef.current.height = window.innerHeight;
                                // Redraw immediately
                                drawFrame(currentFrame);
                        }
                };

                window.addEventListener('resize', handleResize);
                // Initial size set
                handleResize();

                return () => window.removeEventListener('resize', handleResize);
        }, [loaded, currentFrame, images]); // Add dependencies so handleResize can access latest state


        return (
                <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden">
                        {/* Loader */}
                        {!loaded && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black text-white z-50">
                                        <Loader2 className="w-10 h-10 animate-spin mb-4" />
                                        <p className="text-xl font-light">Loading Experience... {progress}%</p>
                                </div>
                        )}

                        <canvas
                                ref={canvasRef}
                                className={cn(
                                        "w-full h-full object-cover transition-all duration-1000",
                                        (!start || isFinished) ? "blur-md brightness-50" : "blur-0 brightness-100"
                                )}
                        />
                </div>
        );
}
