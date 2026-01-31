'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const mockTimelineData = [
        {
                id: 1,
                date: 'June 2021',
                title: 'First Coffee',
                description: 'Where it all started. A nervous coffee date that turned into a 4-hour conversation.',
                image: 'https://placehold.co/600x400/e2e8f0/475569?text=First+Coffee',
        },
        {
                id: 2,
                date: 'December 2021',
                title: 'The "Yes" to Adventure',
                description: 'First road trip together. We got lost, found a hidden beach, and realized we made a great team.',
                image: 'https://placehold.co/600x400/e2e8f0/475569?text=Road+Trip',
        },
        {
                id: 3,
                date: 'August 2022',
                title: 'Moving In',
                description: 'Combining books, plants, and lives. Our first apartment felt like home immediately.',
                image: 'https://placehold.co/600x400/e2e8f0/475569?text=Moving+In',
        },
        {
                id: 4,
                date: 'February 2023',
                title: 'The Proposal',
                description: 'Under the northern lights (or at least a very nice starry night). A simple question, an easy answer.',
                image: 'https://placehold.co/600x400/e2e8f0/475569?text=Proposal',
        },
];

const TimelineItem = ({ item, index }) => {
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
                                        {item.date}
                                </span>
                                <h3 className="text-3xl font-bold mb-4 font-serif">{item.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                        {item.description}
                                </p>
                        </div>

                        {/* Center Line Point */}
                        <div className="w-[10%] flex justify-center relative items-center">
                                <div className="w-4 h-4 rounded-full bg-foreground z-10 outline outline-4 outline-background" />
                        </div>

                        {/* Image Side */}
                        <div className="w-[45%] px-8">
                                <div className="relative aspect-[3/2] rounded-lg overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 shadow-xl">
                                        <Image
                                                src={item.image}
                                                alt={item.title}
                                                fill
                                                className="object-cover"
                                        />
                                </div>
                        </div>
                </motion.div>
        );
};

export default function Timeline() {
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
                                {mockTimelineData.map((item, index) => (
                                        <TimelineItem key={item.id} item={item} index={index} />
                                ))}
                        </div>
                </section>
        );
}
