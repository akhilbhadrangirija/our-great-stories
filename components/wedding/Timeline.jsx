'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const TimelineItem = ({ title, date, description, image, index }) => {
        const ref = useRef(null);
        const { scrollYProgress } = useScroll({
                target: ref,
                offset: ['start end', 'center center'],
        });

        const opacity = useSpring(scrollYProgress, { stiffness: 300, damping: 30 });
        const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
        const isEven = index % 2 === 0;

        return (
                <motion.div
                        ref={ref}
                        style={{ opacity, y }}
                        className={cn(
                                'flex w-full mb-24 relative',
                                isEven ? 'flex-row' : 'flex-row-reverse'
                        )}
                >
                        {/* Content Side */}
                        <div className="w-[45%] flex flex-col justify-center px-8">
                                <span className="text-sm font-medium text-muted-foreground mb-2 block font-serif tracking-widest uppercase">
                                        {date}
                                </span>
                                <h3 className="text-3xl font-bold mb-4 font-serif">{title}</h3>
                                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                                        {description}
                                </p>
                        </div>

                        {/* Center Line Point */}
                        <div className="w-[10%] flex justify-center relative items-center">
                                <div className="w-4 h-4 rounded-full bg-foreground z-10 outline outline-4 outline-background" />
                        </div>

                        {/* Image Side */}
                        <div className="w-[45%] px-8">
                                <div className="relative aspect-[3/2] rounded-lg overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 shadow-xl">
                                        {image && (
                                                <Image
                                                        src={image}
                                                        alt={title}
                                                        fill
                                                        className="object-cover"
                                                />
                                        )}
                                        {!image && (
                                                <div className="w-full h-full bg-muted flex items-center justify-center">
                                                        <span className="text-muted-foreground italic">Cinematic Moment</span>
                                                </div>
                                        )}
                                </div>
                        </div>
                </motion.div>
        );
};

export default function Timeline({ story, date }) {
        const containerRef = useRef(null);
        const { scrollYProgress } = useScroll({
                target: containerRef,
                offset: ['start start', 'end end'],
        });

        const scaleY = useSpring(scrollYProgress, {
                stiffness: 100,
                damping: 30,
                restDelta: 0.001
        });

        const formattedDate = date ? new Date(date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'Future';

        const timelineData = [
                {
                        id: 1,
                        title: "The Beginning",
                        date: "Once upon a time",
                        description: story || "Every great love story starts with a simple hello.",
                        image: "https://placehold.co/600x400/e2e8f0/475569?text=Our+Story"
                },
                {
                        id: 2,
                        title: "The Big Day",
                        date: formattedDate,
                        description: "We can't wait to celebrate this new chapter with you.",
                        image: "https://placehold.co/600x400/e2e8f0/475569?text=The+Big+Day"
                }
        ];

        return (
                <section ref={containerRef} className="relative max-w-7xl mx-auto py-24 overflow-hidden">

                        {/* Central Line */}
                        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2">
                                <motion.div
                                        style={{ scaleY, transformOrigin: "top" }}
                                        className="absolute top-0 left-0 w-full h-full bg-foreground"
                                />
                        </div>

                        <div className="relative z-10">
                                {timelineData.map((item, index) => (
                                        <TimelineItem
                                                key={item.id}
                                                index={index}
                                                title={item.title}
                                                date={item.date}
                                                description={item.description}
                                                image={item.image}
                                        />
                                ))}
                        </div>
                </section>
        );
}
