"use client";

import Link from "next/link";
import { ArrowRight, Check, X, Globe, Mail, Gift, MousePointerClick } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WeddingLanding() {
        return (
                <main className="min-h-screen bg-[#FDFBF7] text-stone-800 font-sans selection:bg-stone-200">

                        {/* Hero Section */}
                        <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 px-6 overflow-hidden">
                                <div className="max-w-4xl mx-auto text-center z-10 relative">
                                        <div className="inline-block mb-6">
                                                <span className="py-1 px-3 border border-stone-300 rounded-full text-xs tracking-widest uppercase text-stone-500 bg-white/50 backdrop-blur-sm">
                                                        The Modern Standard
                                                </span>
                                        </div>
                                        <h1 className="text-5xl md:text-7xl font-serif font-medium mb-6 tracking-tight leading-[1.1] text-stone-900">
                                                Timeless stationery, <br />
                                                <span className="italic text-stone-500">reimagined for digital.</span>
                                        </h1>
                                        <p className="text-lg md:text-xl text-stone-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                                                Create an elegant, cinematic wedding invitation experience that feels as precious as paper but works like magic.
                                        </p>
                                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                                <Link href="/wedding/create">
                                                        <Button size="lg" className="rounded-full px-8 py-7 text-lg bg-stone-900 hover:bg-stone-800 text-[#FDFBF7] shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                                                                Create Your Invite
                                                        </Button>
                                                </Link>
                                                <span className="text-sm text-stone-500">Free to start. No credit card required.</span>
                                        </div>
                                </div>

                                {/* Abstract Background Elements */}
                                <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-0 pointer-events-none opacity-40">
                                        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-green-100/50 rounded-full blur-3xl" />
                                        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-stone-200/50 rounded-full blur-3xl" />
                                </div>
                        </section>

                        {/* Comparison Section: Paper vs Digital */}
                        <section className="py-20 px-6 bg-white border-y border-stone-100">
                                <div className="max-w-5xl mx-auto">
                                        <div className="text-center mb-16">
                                                <h2 className="text-3xl md:text-4xl font-serif mb-4 text-stone-900">Paper vs. Digital</h2>
                                                <p className="text-stone-500 max-w-lg mx-auto">Why modern couples are switching to a cinematic digital experience.</p>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-12">
                                                {/* Paper Side */}
                                                <div className="p-8 rounded-2xl bg-[#FAFAF9] border border-stone-100 opacity-70">
                                                        <h3 className="text-xl font-serif mb-6 text-stone-500 flex items-center gap-2">
                                                                Traditional Paper
                                                        </h3>
                                                        <ul className="space-y-4">
                                                                {[
                                                                        "Expensive printing & postage costs",
                                                                        "Manual RSVP tracking in spreadsheets",
                                                                        "Limited information space",
                                                                        "Updates require re-printing",
                                                                        "Lost in the mail"
                                                                ].map((item, i) => (
                                                                        <li key={i} className="flex items-start gap-3 text-stone-400">
                                                                                <X className="w-5 h-5 shrink-0 mt-0.5" />
                                                                                <span>{item}</span>
                                                                        </li>
                                                                ))}
                                                        </ul>
                                                </div>

                                                {/* Digital Side */}
                                                <div className="p-8 rounded-2xl bg-white border border-stone-200 shadow-xl shadow-stone-200/20 relative overflow-hidden group hover:border-stone-300 transition-colors">
                                                        <div className="absolute top-0 left-0 w-1 h-full bg-stone-900" />
                                                        <h3 className="text-xl font-serif mb-6 text-stone-900 flex items-center gap-2">
                                                                Our Great Stories
                                                        </h3>
                                                        <ul className="space-y-4">
                                                                {[
                                                                        "Cinematic storytelling experience",
                                                                        "Instant, seamless RSVP tracking",
                                                                        "Maps, registries, and timelines included",
                                                                        "Update details in real-time",
                                                                        "Environmentally friendly"
                                                                ].map((item, i) => (
                                                                        <li key={i} className="flex items-start gap-3 text-stone-800 font-medium">
                                                                                <Check className="w-5 h-5 shrink-0 mt-0.5 text-green-600" />
                                                                                <span>{item}</span>
                                                                        </li>
                                                                ))}
                                                        </ul>
                                                </div>
                                        </div>
                                </div>
                        </section>

                        {/* Global / Language Section */}
                        <section className="py-24 px-6 bg-[#FDFBF7]">
                                <div className="max-w-4xl mx-auto text-center">
                                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-stone-100 text-stone-400">
                                                <Globe className="w-8 h-8" />
                                        </div>
                                        <h2 className="text-3xl md:text-5xl font-serif mb-6 text-stone-900">Love speaks every language.</h2>
                                        <p className="text-lg text-stone-600 mb-10 max-w-xl mx-auto">
                                                Your story deserves to be understood. Create invites in any language, supporting special characters and local nuances.
                                        </p>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm font-medium text-stone-400 uppercase tracking-widest opacity-60">
                                                <span>English</span>
                                                <span>Español</span>
                                                <span>Français</span>
                                                <span>Deutsch</span>
                                                <span>Italiano</span>
                                                <span>Português</span>
                                                <span>中文</span>
                                                <span>and more...</span>
                                        </div>
                                </div>
                        </section>

                        {/* How It Works */}
                        <section className="py-24 px-6 bg-white border-t border-stone-100">
                                <div className="max-w-6xl mx-auto">
                                        <div className="text-center mb-16">
                                                <h2 className="text-3xl md:text-5xl font-serif mb-6 text-stone-900">How it works</h2>
                                        </div>

                                        <div className="grid md:grid-cols-3 gap-12 relative">
                                                {/* Connecting Line (Desktop) */}
                                                <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-stone-200 -z-0" />

                                                {[
                                                        {
                                                                icon: MousePointerClick,
                                                                title: "1. Create",
                                                                desc: "Choose a template and fill in your details. Our cinematic builder makes it easy."
                                                        },
                                                        {
                                                                icon: Mail,
                                                                title: "2. Share",
                                                                desc: "Send your unique link via WhatsApp, Email, or Text. No apps required for guests."
                                                        },
                                                        {
                                                                icon: Gift,
                                                                title: "3. Celebrate",
                                                                desc: "Collect RSVPs, preferences, and excitement as you countdown to the big day."
                                                        }
                                                ].map((step, i) => (
                                                        <div key={i} className="relative z-10 flex flex-col items-center text-center">
                                                                <div className="w-24 h-24 rounded-full bg-[#FDFBF7] border border-stone-200 flex items-center justify-center mb-6 shadow-sm group hover:scale-105 transition-transform duration-500">
                                                                        <step.icon className="w-10 h-10 text-stone-400 group-hover:text-stone-800 transition-colors" />
                                                                </div>
                                                                <h3 className="text-xl font-serif font-bold mb-3 text-stone-900">{step.title}</h3>
                                                                <p className="text-stone-500 leading-relaxed px-4">{step.desc}</p>
                                                        </div>
                                                ))}
                                        </div>
                                </div>
                        </section>

                        {/* CTA Footer */}
                        <section className="py-24 px-6 bg-stone-900 text-[#FDFBF7] text-center">
                                <div className="max-w-3xl mx-auto">
                                        <h2 className="text-4xl md:text-6xl font-serif mb-8">Ready to tell your story?</h2>
                                        <p className="text-xl text-stone-400 mb-10">Join thousands of couples starting their journey with style.</p>
                                        <Link href="/wedding/create">
                                                <Button size="lg" className="rounded-full px-10 py-8 text-xl bg-[#FDFBF7] text-stone-900 hover:bg-white hover:scale-105 transition-all duration-300">
                                                        Start for Free <ArrowRight className="ml-2 w-5 h-5" />
                                                </Button>
                                        </Link>
                                </div>
                        </section>

                </main>
        );
}
