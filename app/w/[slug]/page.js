import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { cn } from '@/lib/utils';
import { MapPin, Calendar, Gift, Info } from 'lucide-react';
import Timeline from '@/components/wedding/Timeline';
import RSVPForm from '@/components/wedding/RSVPForm';
import Countdown from '@/components/wedding/Countdown';

// Theme Configuration Mapping
const THEMES = {
        classic: {
                fontTitle: "font-[family-name:var(--font-playfair)]",
                fontBody: "font-[family-name:var(--font-lato)]",
                bg: "bg-stone-50",
                text: "text-stone-900",
                accent: "text-stone-600",
                cardBg: "bg-white border-stone-200"
        },
        midnight: {
                fontTitle: "font-[family-name:var(--font-cinzel)]",
                fontBody: "font-[family-name:var(--font-inter)]",
                bg: "bg-slate-950",
                text: "text-slate-200",
                accent: "text-amber-400",
                cardBg: "bg-slate-900/50 border-slate-800"
        },
        boho: {
                fontTitle: "font-[family-name:var(--font-cormorant)]",
                fontBody: "font-[family-name:var(--font-montserrat)]",
                bg: "bg-[#FDFBF7]",
                text: "text-stone-800",
                accent: "text-green-700",
                cardBg: "bg-white border-stone-100 shadow-sm"
        },
        modern: {
                fontTitle: "font-[family-name:var(--font-oswald)]",
                fontBody: "font-[family-name:var(--font-roboto)]",
                bg: "bg-white",
                text: "text-black",
                accent: "text-black",
                cardBg: "bg-white border-2 border-black"
        },
        retro: {
                fontTitle: "font-[family-name:var(--font-abril)]",
                fontBody: "font-[family-name:var(--font-courier)]",
                bg: "bg-[#FFF8E7]",
                text: "text-stone-800",
                accent: "text-orange-900",
                cardBg: "bg-[#FFFDF5] border-stone-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]"
        }
};

export async function generateMetadata({ params }) {
        const { slug } = await params;
        const wedding = await prisma.wedding.findUnique({ where: { slug } });
        if (!wedding) return { title: 'Not Found' };
        return { title: `${wedding.coupleNames} - Wedding Invite` };
}

export default async function WeddingPage({ params }) {
        const { slug } = await params;
        const wedding = await prisma.wedding.findUnique({ where: { slug } });

        if (!wedding) {
                notFound();
        }

        // Parse fields
        const theme = THEMES[wedding.themeId] || THEMES['classic'];
        const timelineEvents = wedding.timelineEvents ? JSON.parse(wedding.timelineEvents) : [];

        // Format Date
        const eventDate = new Date(wedding.date);
        const dateString = eventDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
        const timeString = eventDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

        return (
                <main className={cn("min-h-screen selection:bg-rose-200 selection:text-rose-900", theme.bg, theme.text, theme.fontBody)}>

                        {/* Hero Section */}
                        <section className="relative min-h-[90vh] flex flex-col items-center justify-center p-6 text-center overflow-hidden">
                                {/* Background Image Logic */}
                                {wedding.heroImageUrl && (
                                        <div className="absolute inset-0 z-0">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img src={wedding.heroImageUrl} alt="Background" className="w-full h-full object-cover opacity-40 blur-[2px]" />
                                                <div className={cn("absolute inset-0 bg-gradient-to-b from-transparent to-current", theme.bg === "bg-white" ? "from-white/0 to-white" : "from-black/0 to-black/80")} />
                                        </div>
                                )}

                                <div className="relative z-10 space-y-8 animate-in fade-in zoom-in duration-1000">
                                        <p className={cn("text-lg uppercase tracking-[0.3em] font-medium opacity-80", theme.accent)}>The Wedding Of</p>
                                        <h1 className={cn("text-6xl md:text-8xl leading-tight", theme.fontTitle)}>
                                                {wedding.coupleNames}
                                        </h1>

                                        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-xl font-light">
                                                <div className="flex items-center gap-2">
                                                        <Calendar className="w-5 h-5 opacity-70" />
                                                        <span>{dateString}</span>
                                                </div>
                                                <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-current opacity-50" />
                                                <div className="w-1.5 h-1.5 rounded-full bg-current opacity-50 md:hidden" />
                                                <div className="flex items-center gap-2">
                                                        <MapPin className="w-5 h-5 opacity-70" />
                                                        <span>{wedding.venueName}</span>
                                                </div>
                                        </div>

                                        {wedding.hasCountdown && (
                                                <div className="pt-8">
                                                        <Countdown targetDate={wedding.date} />
                                                </div>
                                        )}
                                </div>
                        </section>

                        {/* Details Grid */}
                        <div className="max-w-4xl mx-auto px-4 -mt-20 relative z-20">
                                <div className={cn("grid md:grid-cols-2 gap-6 p-8 rounded-2xl shadow-xl", theme.cardBg)}>
                                        <div className="space-y-4">
                                                <h3 className={cn("text-2xl", theme.fontTitle)}>The Details</h3>
                                                <div className="space-y-2 opacity-80">
                                                        <p><strong>When:</strong> {dateString} at {timeString}</p>
                                                        <p><strong>Where:</strong> {wedding.venueName}</p>
                                                        <p>{wedding.venueAddress}</p>
                                                </div>
                                        </div>
                                        {wedding.hasDressCode && (
                                                <div className="space-y-4 border-t md:border-t-0 md:border-l border-current/10 pt-4 md:pt-0 md:pl-8">
                                                        <h3 className={cn("text-2xl", theme.fontTitle)}>Additional Info</h3>
                                                        <div className="flex items-start gap-3 opacity-80">
                                                                <Info className="w-5 h-5 mt-1" />
                                                                <div>
                                                                        <p className="font-bold mb-1">Dress Code</p>
                                                                        <p>{wedding.dressCode}</p>
                                                                </div>
                                                        </div>
                                                </div>
                                        )}
                                </div>
                        </div>

                        {/* Story Module */}
                        {wedding.hasStory && wedding.story && (
                                <section className="py-24 px-4 max-w-3xl mx-auto text-center">
                                        <h2 className={cn("text-4xl md:text-5xl mb-8", theme.fontTitle)}>Our Story</h2>
                                        <p className="text-lg md:text-xl leading-relaxed opacity-90 whitespace-pre-wrap">
                                                {wedding.story}
                                        </p>
                                </section>
                        )}

                        {/* Timeline Module */}
                        {wedding.hasTimeline && (
                                <Timeline events={timelineEvents} />
                        )}

                        {/* Registry Module */}
                        {wedding.hasRegistry && wedding.registryUrl && (
                                <section className="py-24 px-4 bg-black/5 dark:bg-white/5">
                                        <div className="max-w-lg mx-auto text-center space-y-6">
                                                <Gift className="w-12 h-12 mx-auto opacity-70" />
                                                <h2 className={cn("text-3xl md:text-4xl", theme.fontTitle)}>Registry</h2>
                                                <p className="opacity-80">Your presence is enough, but if you&apos;d like to give a gift, please visit our registry.</p>
                                                <a
                                                        href={wedding.registryUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className={cn("inline-block px-8 py-3 rounded-full text-lg font-medium transition-transform hover:scale-105",
                                                                theme.bg === 'bg-white' ? 'bg-black text-white' : 'bg-white text-black'
                                                        )}
                                                >
                                                        View Registry
                                                </a>
                                        </div>
                                </section>
                        )}

                        {/* RSVP Section */}
                        <section className="py-24 px-4 relative">
                                <div className="max-w-xl mx-auto relative z-10">
                                        <RSVPForm weddingId={wedding.id} />
                                </div>
                        </section>

                </main>
        );
}
