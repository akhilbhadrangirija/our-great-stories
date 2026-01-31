'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Sparkles, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ImageGenerator() {
        const [prompt, setPrompt] = useState('');
        const [imageSrc, setImageSrc] = useState(null);
        const [loading, setLoading] = useState(false);
        const [loadingStep, setLoadingStep] = useState('');

        const generateImage = async (e) => {
                e.preventDefault();
                if (!prompt) return;

                setLoading(true);
                setLoadingStep('Enhancing your vision...');
                setImageSrc(null);

                try {
                        // 1. Enhance the prompt using Gemini
                        const res = await fetch('/api/enhance-prompt', {
                                method: 'POST',
                                body: JSON.stringify({ prompt }),
                                headers: { 'Content-Type': 'application/json' },
                        });
                        const data = await res.json();
                        const enhancedPrompt = data.enhancedPrompt || prompt;

                        setLoadingStep('Dreaming up the image...');

                        // 2. Generate image using Pollinations.ai (reliable, no-auth, fast)
                        // Adding a random seed to ensure new images on same prompt
                        const seed = Math.floor(Math.random() * 1000);
                        const encodedPrompt = encodeURIComponent(enhancedPrompt);
                        const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?seed=${seed}&width=1024&height=768&nologo=true`;

                        // Preload image
                        const img = new Image();
                        img.onload = () => {
                                setImageSrc(imageUrl);
                                setLoading(false);
                        };
                        img.src = imageUrl;

                } catch (error) {
                        console.error('Generation failed:', error);
                        setLoading(false);
                }
        };

        return (
                <div className="w-full max-w-4xl mx-auto p-6 bg-background/50 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl">
                        <div className="text-center mb-8">
                                <h2 className="text-3xl font-serif font-bold mb-2 flex items-center justify-center gap-2">
                                        <Sparkles className="w-6 h-6 text-amber-500" />
                                        AI Dream Weaving
                                </h2>
                                <p className="text-muted-foreground">
                                        Describe a memory or a dream, and watch it come to life.
                                </p>
                        </div>

                        <form onSubmit={generateImage} className="flex gap-4 mb-8">
                                <Input
                                        value={prompt}
                                        onChange={(e) => setPrompt(e.target.value)}
                                        placeholder="e.g., A golden wedding arch by the ocean..."
                                        className="h-12 text-lg bg-background/80"
                                />
                                <Button
                                        type="submit"
                                        disabled={loading || !prompt}
                                        className="h-12 px-8 font-medium text-lg bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white border-0 transition-all duration-300 hover:scale-105"
                                >
                                        {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <Wand2 className="w-5 h-5 mr-2" />}
                                        {loading ? 'Magic...' : 'Generate'}
                                </Button>
                        </form>

                        <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-muted/30 border border-border/30 flex items-center justify-center group">
                                <AnimatePresence mode="wait">
                                        {loading && (
                                                <motion.div
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                        className="absolute inset-0 flex flex-col items-center justify-center bg-black/5"
                                                >
                                                        <Loader2 className="w-12 h-12 text-foreground/50 animate-spin mb-4" />
                                                        <p className="text-sm font-medium text-foreground/70 animate-pulse">{loadingStep}</p>
                                                </motion.div>
                                        )}

                                        {imageSrc && !loading && (
                                                <motion.img
                                                        initial={{ opacity: 0, scale: 1.1 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{ duration: 0.7, ease: "easeOut" }}
                                                        src={imageSrc}
                                                        alt="Generated Result"
                                                        className="w-full h-full object-cover"
                                                />
                                        )}

                                        {!imageSrc && !loading && (
                                                <div className="text-center p-8 opacity-50">
                                                        <div className="w-20 h-20 mx-auto border-2 border-dashed border-foreground/20 rounded-full flex items-center justify-center mb-4">
                                                                <Sparkles className="w-8 h-8 text-foreground/20" />
                                                        </div>
                                                        <p className="text-lg font-serif italic text-muted-foreground">"Imagination is the beginning of creation."</p>
                                                </div>
                                        )}
                                </AnimatePresence>
                        </div>
                </div>
        );
}
