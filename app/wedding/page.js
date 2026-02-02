"use client";

import { createWedding } from "@/app/actions/create-wedding";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Calendar, MapPin, User, BookOpen } from "lucide-react";

export default function WeddingBuilder() {
        return (
                <main className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
                        <div className="w-full max-w-2xl bg-background border border-border rounded-xl shadow-xl p-8">
                                <div className="text-center mb-8">
                                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-900 mb-4">
                                                <Sparkles className="w-8 h-8 text-slate-600 dark:text-slate-400" />
                                        </div>
                                        <h1 className="text-3xl font-serif font-bold">Create Wedding Invite</h1>
                                        <p className="text-muted-foreground mt-2">Start your new chapter.</p>
                                </div>

                                <form action={createWedding} className="space-y-6">
                                        <div className="space-y-2">
                                                <Label htmlFor="coupleNames" className="flex items-center gap-2">
                                                        <User className="w-4 h-4" /> Couple Names
                                                </Label>
                                                <Input id="coupleNames" name="coupleNames" placeholder="e.g. Jane & John" required />
                                        </div>

                                        <div className="space-y-2">
                                                <Label htmlFor="date" className="flex items-center gap-2">
                                                        <Calendar className="w-4 h-4" /> Date
                                                </Label>
                                                <Input id="date" name="date" type="datetime-local" required />
                                        </div>

                                        <div className="space-y-2">
                                                <Label htmlFor="venueName" className="flex items-center gap-2">
                                                        <MapPin className="w-4 h-4" /> Venue Name
                                                </Label>
                                                <Input id="venueName" name="venueName" placeholder="e.g. The Grand Hotel" required />
                                        </div>

                                        <div className="space-y-2">
                                                <Label htmlFor="venueAddress" className="flex items-center gap-2">
                                                        Venue Address (for Map)
                                                </Label>
                                                <Input id="venueAddress" name="venueAddress" placeholder="e.g. 123 Main St, City, Country" required />
                                        </div>

                                        <div className="space-y-2">
                                                <Label htmlFor="story" className="flex items-center gap-2">
                                                        <BookOpen className="w-4 h-4" /> Our Story (Optional)
                                                </Label>
                                                <Textarea id="story" name="story" placeholder="Tell us how you met..." className="h-32" />
                                        </div>

                                        <Button type="submit" size="lg" className="w-full text-lg">
                                                Generate Cinematic Invite
                                        </Button>
                                </form>
                        </div>
                </main>
        );
}
