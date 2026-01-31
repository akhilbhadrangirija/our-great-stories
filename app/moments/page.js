"use client";

import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Coffee, Zap, Heart } from "lucide-react";
import { fadeInUp, scaleIn } from "@/lib/utils/motion";

const moments = [
        {
                id: "coffee-date",
                title: "Coffee Date",
                description: "Warm, minimalist aesthetic perfect for cozy morning meetups",
                icon: Coffee,
                color: "from-amber-500 to-orange-600",
                borderColor: "hover:border-amber-400",
        },
        {
                id: "adventure-night",
                title: "Adventure Night",
                description: "Bold, energetic vibes for spontaneous dates and fun times",
                icon: Zap,
                color: "from-blue-500 to-purple-600",
                borderColor: "hover:border-blue-400",
        },
        {
                id: "romantic-dinner",
                title: "Romantic Dinner",
                description: "Elegant, cinematic experience for special celebrations",
                icon: Heart,
                color: "from-rose-500 to-pink-600",
                borderColor: "hover:border-rose-400",
        },
];

export default function MomentsPage() {
        return (
                <div className="min-h-screen bg-gradient-to-br from-violet-50 via-pink-50/30 to-orange-50 dark:from-gray-900 dark:via-purple-950/20 dark:to-gray-900">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

                        <div className="relative z-10 px-4 py-16 sm:px-6 lg:px-8">
                                <div className="mx-auto max-w-6xl">
                                        {/* Header */}
                                        <Reveal className="mb-16 text-center">
                                                <h1 className="mb-4 text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl md:text-7xl dark:text-white">
                                                        <span className="bg-gradient-to-r from-violet-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                                                                Moments
                                                        </span>
                                                </h1>
                                                <p className="mx-auto max-w-2xl text-xl text-gray-600 dark:text-gray-300">
                                                        Choose your style. Create unforgettable date invites.
                                                </p>
                                        </Reveal>

                                        {/* Template Grid */}
                                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                                                {moments.map((moment, index) => {
                                                        const Icon = moment.icon;
                                                        return (
                                                                <Reveal key={moment.id} delay={0.1 * (index + 1)} variant={scaleIn}>
                                                                        <Link href={`/moments/${moment.id}`}>
                                                                                <Card className={`group cursor-pointer border-gray-200 bg-white/80 backdrop-blur-sm transition-all hover:shadow-2xl dark:border-gray-800 dark:bg-gray-900/80 ${moment.borderColor}`}>
                                                                                        <CardHeader className="space-y-4">
                                                                                                <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${moment.color} transition-transform group-hover:scale-110`}>
                                                                                                        <Icon className="h-8 w-8 text-white" />
                                                                                                </div>
                                                                                                <CardTitle className="text-2xl">{moment.title}</CardTitle>
                                                                                                <CardDescription className="text-base">
                                                                                                        {moment.description}
                                                                                                </CardDescription>
                                                                                                <div className="pt-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                                                                                                        View Template →
                                                                                                </div>
                                                                                        </CardHeader>
                                                                                </Card>
                                                                        </Link>
                                                                </Reveal>
                                                        );
                                                })}
                                        </div>

                                        {/* Back Link */}
                                        <Reveal delay={0.4} className="mt-16 text-center">
                                                <Link
                                                        href="/"
                                                        className="inline-flex items-center text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                                                >
                                                        ← Back to Home
                                                </Link>
                                        </Reveal>
                                </div>
                        </div>
                </div>
        );
}
