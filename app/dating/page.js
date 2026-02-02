"use client";

import { createDateInvite } from "@/app/actions/create-date";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Heart, Smile, MessageCircle } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function DatingBuilder() {
        const [selectedTheme, setSelectedTheme] = useState('romantic');

        return (
                <main className="min-h-screen bg-rose-50 dark:bg-rose-950/20 flex items-center justify-center p-4">
                        <div className="w-full max-w-2xl bg-background border border-border rounded-xl shadow-xl p-8">
                                <div className="text-center mb-8">
                                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-900/50 mb-4">
                                                <Heart className="w-8 h-8 text-rose-600 dark:text-rose-400" />
                                        </div>
                                        <h1 className="text-3xl font-serif font-bold">Create Date Invite</h1>
                                        <p className="text-muted-foreground mt-2">Make it impossible to say no.</p>
                                </div>

                                <form action={createDateInvite} className="space-y-8">
                                        <div className="space-y-4">
                                                <Label className="text-lg font-medium">1. Choose a Vibe</Label>
                                                <RadioGroup name="theme" defaultValue="romantic" onValueChange={setSelectedTheme} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                        <div className={cn("border-2 rounded-lg p-4 cursor-pointer transition-all hover:border-rose-300", selectedTheme === 'romantic' ? "border-rose-500 bg-rose-50 dark:bg-rose-900/20" : "border-border")}>
                                                                <RadioGroupItem value="romantic" id="romantic" className="sr-only" />
                                                                <Label htmlFor="romantic" className="cursor-pointer flex flex-col items-center gap-2">
                                                                        <Heart className="w-6 h-6 text-rose-500" />
                                                                        <span className="font-bold">Romantic</span>
                                                                        <span className="text-xs text-center text-muted-foreground">Soft, elegant, gradients</span>
                                                                </Label>
                                                        </div>
                                                        <div className={cn("border-2 rounded-lg p-4 cursor-pointer transition-all hover:border-orange-300", selectedTheme === 'playful' ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20" : "border-border")}>
                                                                <RadioGroupItem value="playful" id="playful" className="sr-only" />
                                                                <Label htmlFor="playful" className="cursor-pointer flex flex-col items-center gap-2">
                                                                        <Smile className="w-6 h-6 text-orange-500" />
                                                                        <span className="font-bold">Playful</span>
                                                                        <span className="text-xs text-center text-muted-foreground">Bright, bouncy, emojis</span>
                                                                </Label>
                                                        </div>
                                                        <div className={cn("border-2 rounded-lg p-4 cursor-pointer transition-all hover:border-slate-300", selectedTheme === 'straightforward' ? "border-slate-800 bg-slate-50 dark:bg-slate-800/20" : "border-border")}>
                                                                <RadioGroupItem value="straightforward" id="straightforward" className="sr-only" />
                                                                <Label htmlFor="straightforward" className="cursor-pointer flex flex-col items-center gap-2">
                                                                        <MessageCircle className="w-6 h-6 text-slate-700 dark:text-slate-300" />
                                                                        <span className="font-bold">Simple</span>
                                                                        <span className="text-xs text-center text-muted-foreground">Clean, direct, minimal</span>
                                                                </Label>
                                                        </div>
                                                </RadioGroup>
                                        </div>

                                        <div className="space-y-4">
                                                <Label className="text-lg font-medium">2. Who is this from?</Label>
                                                <Input name="senderName" placeholder="Your name" className="h-12 text-lg" required />
                                        </div>

                                        <div className="space-y-4">
                                                <Label className="text-lg font-medium">3. Pop the Question</Label>
                                                <Input name="questionText" placeholder="Will you go out with me?" defaultValue="Will you go out with me?" className="h-12 text-lg" required />
                                        </div>

                                        <Button type="submit" size="lg" className="w-full text-lg bg-rose-600 hover:bg-rose-700 text-white">
                                                Create Invite
                                        </Button>
                                </form>
                        </div>
                </main>
        );
}
