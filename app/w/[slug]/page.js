import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Timeline from '@/components/wedding/Timeline';
import ImageGenerator from '@/components/wedding/ImageGenerator';
import RSVPForm from '@/components/wedding/RSVPForm';

export default async function WeddingPage({ params }) {
        const { slug } = await params;

        const wedding = await prisma.wedding.findUnique({
                where: { slug }
        });

        if (!wedding) {
                notFound();
        }

        return (
                <main className="min-h-screen bg-background text-foreground selection:bg-rose-200 selection:text-rose-900">
                        {/* Hero Section */}
                        <section className="h-[70vh] flex flex-col items-center justify-center border-b border-border/40 bg-zinc-50/50 dark:bg-zinc-900/50 p-4">
                                <h1 className="text-5xl md:text-8xl font-serif mb-6 text-center tracking-tighter leading-tight">
                                        {wedding.coupleNames}
                                </h1>
                                <p className="text-lg md:text-xl text-muted-foreground font-light tracking-wide uppercase flex flex-col items-center gap-2">
                                        <span>{new Date(wedding.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                        <span className="w-1 h-1 bg-border rounded-full" />
                                        <span>{wedding.venueName}</span>
                                </p>
                        </section>

                        {/* Timeline Section */}
                        <Timeline story={wedding.story} date={wedding.date} />

                        {/* AI Image Generation Section */}
                        <section className="py-24 bg-muted/20 border-y border-border/40">
                                <div className="container mx-auto px-4">
                                        <ImageGenerator />
                                </div>
                        </section>

                        {/* RSVP Section */}
                        <section className="min-h-screen flex flex-col items-center justify-center bg-zinc-50/50 dark:bg-zinc-900/50">
                                <div className="container mx-auto px-4 text-center mb-12">
                                        <h2 className="text-4xl md:text-6xl font-serif mb-4">Are You With Us?</h2>
                                        <p className="text-muted-foreground">We'd love to see you there.</p>
                                </div>
                                <RSVPForm weddingId={wedding.id} />
                        </section>

                        <section className="h-[20vh] flex items-center justify-center">
                                <p className="text-muted-foreground text-sm">© 2026 Our Great Story</p>
                        </section>
                </main>
        );
}
