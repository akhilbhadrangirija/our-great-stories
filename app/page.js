"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Gateway() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-stone-50 text-stone-900 relative overflow-hidden">

      {/* Header Section */}
      <div className="absolute top-12 z-20 text-center px-4 w-full">
        <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight mb-2 text-stone-800">
          What are you celebrating?
        </h1>
        <p className="text-stone-500 font-medium text-sm tracking-wide uppercase">
          One brand. Two very different moments.
        </p>
      </div>

      {/* Split Container */}
      <div className="flex flex-col md:flex-row w-full h-screen">

        {/* Wedding Card */}
        <Link
          href="/wedding"
          className="group relative flex-1 flex items-center justify-center p-8 transition-all duration-500 hover:bg-white focus:outline-none focus:ring-4 focus:ring-inset focus:ring-stone-200"
        >
          <div className="absolute inset-0 bg-stone-100/50 transition-colors duration-500 group-hover:bg-white z-0" />

          <div className="relative z-10 max-w-sm text-center transform transition-transform duration-500 group-hover:scale-105">
            <span className="inline-block px-3 py-1 mb-6 text-xs font-semibold tracking-wider text-stone-500 uppercase bg-stone-200/50 rounded-full">
              Elegant
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4 text-stone-800">
              Wedding Invite
            </h2>
            <p className="text-stone-600 mb-8 leading-relaxed">
              Create a beautiful digital wedding invitation with RSVP, maps, and guest management.
            </p>
            <span className="inline-flex items-center text-sm font-semibold text-stone-800 border-b-2 border-transparent group-hover:border-stone-800 transition-all duration-300">
              Create Wedding Invite <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </Link>

        {/* Date Card */}
        <Link
          href="/dating"
          className="group relative flex-1 flex items-center justify-center p-8 transition-all duration-500 hover:bg-rose-50/50 focus:outline-none focus:ring-4 focus:ring-inset focus:ring-rose-200"
        >
          <div className="absolute inset-0 bg-stone-50 transition-colors duration-500 group-hover:bg-rose-50 z-0" />

          <div className="relative z-10 max-w-sm text-center transform transition-transform duration-500 group-hover:scale-105">
            <span className="inline-block px-3 py-1 mb-6 text-xs font-semibold tracking-wider text-rose-500 uppercase bg-rose-100/50 rounded-full">
              Playful
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4 text-stone-800">
              Date Invite
            </h2>
            <p className="text-stone-600 mb-8 leading-relaxed">
              Ask them out with a playful, interactive invite designed to get a “yes”.
            </p>
            <span className="inline-flex items-center text-sm font-semibold text-rose-600 border-b-2 border-transparent group-hover:border-rose-600 transition-all duration-300">
              Create Date Invite <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </Link>

      </div>
    </main>
  );
}
