"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Gateway() {
  return (
    <main className="min-h-screen flex flex-col md:flex-row bg-background">
      {/* Dating Side */}
      <section className="flex-1 relative flex flex-col items-center justify-center p-8 border-b md:border-b-0 md:border-r border-border/40 hover:bg-rose-50/10 transition-colors duration-500 group">
        <div className="text-center z-10 max-w-md">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8 p-4 bg-rose-100 dark:bg-rose-900/30 rounded-full w-20 h-20 mx-auto flex items-center justify-center"
          >
            <Heart className="w-10 h-10 text-rose-600 dark:text-rose-400" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 tracking-tight">Dating Invites</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Playful, interactive questions designed to get a "Yes". Perfect for first dates, anniversaries, or just because.
          </p>
          <Link href="/dating">
            <Button size="lg" className="rounded-full px-8 py-6 text-lg bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-200 dark:shadow-rose-900/20 transition-transform group-hover:scale-105">
              Create Date Invite <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Wedding Side */}
      <section className="flex-1 relative flex flex-col items-center justify-center p-8 hover:bg-slate-50/10 transition-colors duration-500 group">
        <div className="text-center z-10 max-w-md">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-8 p-4 bg-slate-100 dark:bg-slate-800 rounded-full w-20 h-20 mx-auto flex items-center justify-center"
          >
            <Sparkles className="w-10 h-10 text-slate-600 dark:text-slate-200" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 tracking-tight">Wedding Invites</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Elegant, cinematic digital invitations with seamless RSVP management. Tell your love story in style.
          </p>
          <Link href="/wedding">
            <Button size="lg" variant="outline" className="rounded-full px-8 py-6 text-lg border-2 border-slate-200 text-foreground hover:bg-slate-100 dark:border-slate-800 dark:hover:bg-slate-800 transition-transform group-hover:scale-105">
              Create Wedding Invite <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Central Divider Text (Desktop) */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center w-16 h-16 bg-background rounded-full border border-border shadow-sm z-20">
        <span className="font-serif italic text-muted-foreground">or</span>
      </div>
    </main>
  );
}
