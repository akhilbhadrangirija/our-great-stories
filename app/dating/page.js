"use client";

import Link from "next/link";
import { ArrowRight, Check, X, Sparkles, Send, Heart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DatingLanding() {
        return (
                <main className="min-h-screen bg-[#0A0A0B] text-slate-100 font-sans selection:bg-rose-500/30">

                        {/* Hero Section */}
                        <section className="relative pt-24 pb-20 md:pt-36 md:pb-32 px-6 overflow-hidden flex flex-col items-center text-center">

                                {/* Badge */}
                                <div className="relative z-10 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-medium text-rose-400 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                                        <Heart className="w-3 h-3 fill-rose-500" />
                                        <span>Join 200+ people waiting to level up their date night</span>
                                </div>

                                <h1 className="relative z-10 text-5xl md:text-8xl font-black mb-6 tracking-tight leading-none">
                                        Stop sending <br className="hidden md:block" />
                                        <span className="text-slate-500">boring texts.</span>
                                </h1>

                                <h2 className="relative z-10 text-4xl md:text-7xl font-black mb-8 tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-purple-500 to-indigo-500 animate-pulse">
                                        Start sending stories.
                                </h2>

                                <p className="relative z-10 text-lg md:text-xl text-slate-400 mb-10 max-w-xl leading-relaxed">
                                        Interactive date invites and digital tributes designed to get a
                                        <span className="font-bold text-rose-500"> "Yes"</span>.
                                </p>

                                <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 w-full max-w-md">
                                        <Link href="/dating/create" className="w-full">
                                                <Button size="lg" className="w-full rounded-lg h-14 text-lg font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-[0_0_30px_-5px_rgba(225,29,72,0.4)] transition-all hover:scale-[1.02]">
                                                        Create Invite <ArrowRight className="ml-2 w-5 h-5" />
                                                </Button>
                                        </Link>
                                </div>

                                {/* Background Gradients */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-rose-500/10 rounded-full blur-[100px] -z-0" />
                                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] -z-0" />
                        </section>

                        {/* Comparison: Boring vs Bold */}
                        <section className="py-24 px-6 border-y border-white/5 bg-slate-950/50 backdrop-blur-sm">
                                <div className="max-w-5xl mx-auto">
                                        <div className="text-center mb-16">
                                                <h2 className="text-3xl md:text-5xl font-black mb-4">Level Up Your Ask</h2>
                                                <p className="text-slate-400">Don't let your date request get lost in the group chat.</p>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-8">
                                                {/* Boring Text */}
                                                <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 opacity-60 hover:opacity-100 transition-opacity">
                                                        <div className="flex items-center gap-3 mb-6 text-slate-500">
                                                                <MessageCircle className="w-6 h-6" />
                                                                <h3 className="text-xl font-bold">The "Hey u free?" Text</h3>
                                                        </div>
                                                        <ul className="space-y-4">
                                                                {[
                                                                        "Low effort, low response rate",
                                                                        "Easily ignored or forgotten",
                                                                        "Zero personality or vibe",
                                                                        "Feels generic and transactional"
                                                                ].map((item, i) => (
                                                                        <li key={i} className="flex items-start gap-3 text-slate-500">
                                                                                <X className="w-5 h-5 shrink-0 mt-0.5 text-slate-700" />
                                                                                <span>{item}</span>
                                                                        </li>
                                                                ))}
                                                        </ul>
                                                </div>

                                                {/* Stories */}
                                                <div className="p-8 rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl relative overflow-hidden group">
                                                        <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                                        <div className="relative z-10">
                                                                <div className="flex items-center gap-3 mb-6 text-rose-500">
                                                                        <Sparkles className="w-6 h-6" />
                                                                        <h3 className="text-xl font-bold">The Story Invite</h3>
                                                                </div>
                                                                <ul className="space-y-4">
                                                                        {[
                                                                                "Shows you actually care",
                                                                                "Interactive 'Yes/No' flow",
                                                                                "Sets the mood instantly",
                                                                                "Guaranteed to make them smile"
                                                                        ].map((item, i) => (
                                                                                <li key={i} className="flex items-start gap-3 text-slate-200 font-medium">
                                                                                        <Check className="w-5 h-5 shrink-0 mt-0.5 text-rose-500" />
                                                                                        <span>{item}</span>
                                                                                </li>
                                                                        ))}
                                                                </ul>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </section>

                        {/* Styles Grid */}
                        <section className="py-24 px-6">
                                <div className="max-w-6xl mx-auto">
                                        <div className="text-center mb-16">
                                                <h2 className="text-3xl md:text-5xl font-black mb-6">Choose Your Vibe</h2>
                                                <p className="text-slate-400 text-lg">Every relationship is different. Pick the card that fits yours.</p>
                                        </div>

                                        <div className="grid md:grid-cols-3 gap-6">
                                                {[
                                                        {
                                                                emoji: "❤️",
                                                                title: "Romantic",
                                                                desc: "Soft gradients, deep questions, pure love.",
                                                                gradient: "from-rose-500 to-pink-600"
                                                        },
                                                        {
                                                                emoji: "⚡️",
                                                                title: "Playful",
                                                                desc: "Bouncy, fun, and a little bit cheeky.",
                                                                gradient: "from-amber-400 to-orange-500"
                                                        },
                                                        {
                                                                emoji: "💬",
                                                                title: "Direct",
                                                                desc: "Clean, minimal. For when you just want to ask.",
                                                                gradient: "from-slate-700 to-slate-900"
                                                        }
                                                ].map((style, i) => (
                                                        <div key={i} className="group relative rounded-3xl bg-slate-900 p-1 overflow-hidden hover:-translate-y-2 transition-transform duration-300">
                                                                <div className={`absolute inset-0 bg-gradient-to-br ${style.gradient} opacity-20 group-hover:opacity-100 transition-opacity duration-500 blur-xl`} />
                                                                <div className="relative h-full bg-[#0F0F11] rounded-[22px] p-8 flex flex-col items-center text-center">
                                                                        <span className="text-4xl mb-6">{style.emoji}</span>
                                                                        <h3 className="text-2xl font-bold mb-3">{style.title}</h3>
                                                                        <p className="text-slate-400">{style.desc}</p>
                                                                </div>
                                                        </div>
                                                ))}
                                        </div>
                                </div>
                        </section>

                        {/* How It Works (Dark) */}
                        <section className="py-24 px-6 border-t border-white/5">
                                <div className="max-w-4xl mx-auto text-center">
                                        <h2 className="text-3xl md:text-4xl font-black mb-16">3 Steps to a Date</h2>
                                        <div className="grid md:grid-cols-3 gap-8 text-left">
                                                {[
                                                        { step: "01", title: "Pick a Vibe", desc: "Select a theme that matches your energy." },
                                                        { step: "02", title: "Add Details", desc: "Where, when, and the big question." },
                                                        { step: "03", title: "Send It", desc: "Get a link they can open anywhere." }
                                                ].map((item, i) => (
                                                        <div key={i} className="p-6 rounded-2xl bg-slate-900/50 border border-white/5 hover:border-rose-500/30 transition-colors">
                                                                <div className="text-sm font-mono text-rose-500 mb-4">STEP {item.step}</div>
                                                                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                                                <p className="text-slate-400 text-sm">{item.desc}</p>
                                                        </div>
                                                ))}
                                        </div>
                                </div>
                        </section>

                        {/* CTA Footer */}
                        <section className="py-32 px-6 text-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-rose-900/20 to-transparent pointer-events-none" />
                                <div className="max-w-2xl mx-auto relative z-10">
                                        <h2 className="text-4xl md:text-6xl font-black mb-8 leading-none">Don't leave them <br /> on read.</h2>
                                        <Link href="/dating/create">
                                                <Button size="lg" className="rounded-full px-12 py-8 text-xl font-bold bg-white text-black hover:bg-slate-200 hover:scale-105 transition-all">
                                                        Start Creating <ArrowRight className="ml-2 w-6 h-6" />
                                                </Button>
                                        </Link>
                                </div>
                        </section>

                </main>
        );
}
