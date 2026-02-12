"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { useState } from "react";
import { createWedding } from "@/app/actions/create-wedding";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Loader2, Sparkles, MapPin, Calendar, Plus, Trash2, Camera, Palette } from "lucide-react";
import { cn } from "@/lib/utils";

const THEMES = [
        { id: "classic", name: "The Classic", font: "font-serif", details: "Serif + Sans, White/Cream", bg: "bg-stone-50" },
        { id: "midnight", name: "Midnight Garden", font: "font-serif", details: "Cinzel + Inter, Dark Navy", bg: "bg-slate-900 text-slate-100" },
        { id: "boho", name: "Boho Chic", font: "font-serif", details: "Cormorant + Montserrat, Sage", bg: "bg-green-50" },
        { id: "modern", name: "Modern Minimal", font: "font-sans", details: "Oswald + Roboto, High Contrast", bg: "bg-white border-2 border-black" },
        { id: "retro", name: "Retro Cinema", font: "font-serif", details: "Abril + Courier, Sepia", bg: "bg-amber-50" },
];

const AI_STYLES = [
        { id: "watercolor", name: "Soft Watercolor", desc: "Dreamy & Romantic" },
        { id: "oil", name: "Oil Painting", desc: "Rich Textures" },
        { id: "sketch", name: "Line Art", desc: "Minimalist Ink" },
        { id: "film", name: "Vintage Kodak", desc: "Warm Grain" },
        { id: "fantasy", name: "Fantasy Glow", desc: "Magical Light" },
];

export default function WeddingBuilder() {
        const [isSubmitting, setIsSubmitting] = useState(false);
        const { register, control, handleSubmit, watch, formState: { errors } } = useForm({
                defaultValues: {
                        themeId: "classic",
                        aiStyle: "watercolor",
                        hasTimeline: false,
                        hasStory: false,
                        hasRegistry: false,
                        hasCountdown: true,
                        hasDressCode: false,
                        timelineEvents: [{ time: "14:00", title: "Ceremony", description: "" }]
                }
        });

        const { fields, append, remove } = useFieldArray({
                control,
                name: "timelineEvents"
        });

        const selectedTheme = watch("themeId");
        const hasTimeline = watch("hasTimeline");
        const hasStory = watch("hasStory");
        const hasRegistry = watch("hasRegistry");
        const hasDressCode = watch("hasDressCode");

        const onSubmit = async (data) => {
                setIsSubmitting(true);
                // Convert field array to JSON string for the server action
                const formData = new FormData();
                Object.keys(data).forEach(key => {
                        if (key === 'timelineEvents') {
                                formData.append(key, JSON.stringify(data[key]));
                        } else {
                                formData.append(key, data[key]);
                        }
                });

                try {
                        await createWedding(formData);
                } catch (error) {
                        console.error("Submission failed", error);
                } finally {
                        setIsSubmitting(false);
                }
        };

        return (
                <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-8">
                        <div className="w-full max-w-4xl bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden">

                                <div className="bg-slate-900 p-8 text-white text-center">
                                        <h1 className="text-3xl font-serif mb-2">Design Your Wedding</h1>
                                        <p className="text-slate-400">Craft a beautiful, interactive digital invitation.</p>
                                </div>

                                <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-12">

                                        {/* 1. Theme Selection */}
                                        <section>
                                                <div className="flex items-center gap-2 mb-6">
                                                        <Palette className="w-5 h-5 text-purple-600" />
                                                        <h2 className="text-xl font-bold text-slate-900">1. Choose Your Aesthetic</h2>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                                        {THEMES.map((theme) => (
                                                                <label key={theme.id} className={cn(
                                                                        "relative cursor-pointer rounded-xl border-2 p-4 transition-all hover:scale-105",
                                                                        selectedTheme === theme.id ? "border-purple-600 ring-2 ring-purple-600/20" : "border-slate-100",
                                                                        theme.bg
                                                                )}>
                                                                        <input
                                                                                type="radio"
                                                                                value={theme.id}
                                                                                {...register("themeId")}
                                                                                className="sr-only"
                                                                        />
                                                                        <div className="h-20 flex flex-col justify-between">
                                                                                <span className={cn("text-lg font-bold leading-none", theme.font)}>{theme.name}</span>
                                                                                <span className="text-xs opacity-70">{theme.details}</span>
                                                                        </div>
                                                                        {selectedTheme === theme.id && (
                                                                                <div className="absolute top-2 right-2 w-4 h-4 bg-purple-600 rounded-full" />
                                                                        )}
                                                                </label>
                                                        ))}
                                                </div>
                                        </section>

                                        {/* 2. AI Style Selection */}
                                        <section className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                                                <div className="flex items-center gap-2 mb-4">
                                                        <Sparkles className="w-5 h-5 text-blue-600" />
                                                        <h2 className="text-lg font-bold text-slate-900">Hero Image Style</h2>
                                                </div>
                                                <p className="text-sm text-slate-500 mb-4">We&apos;ll use AI to transform your photo into a cinematic background.</p>

                                                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                                                        {AI_STYLES.map((style) => (
                                                                <label key={style.id} className="cursor-pointer">
                                                                        <input type="radio" value={style.id} {...register("aiStyle")} className="peer sr-only" />
                                                                        <div className="p-3 rounded-lg border border-slate-200 bg-white peer-checked:border-blue-500 peer-checked:bg-blue-50 transition-all hover:border-blue-300">
                                                                                <div className="font-medium text-sm text-slate-900">{style.name}</div>
                                                                                <div className="text-xs text-slate-500">{style.desc}</div>
                                                                        </div>
                                                                </label>
                                                        ))}
                                                </div>
                                                {/* Upload Placeholder - Real upload requires blob storage */}
                                                <div className="mt-4">
                                                        <Label>Upload a Hero Photo (Optional)</Label>
                                                        <div className="mt-2 border-2 border-dashed border-slate-200 rounded-lg p-8 flex flex-col items-center justify-center text-slate-400 bg-white">
                                                                <Camera className="w-8 h-8 mb-2" />
                                                                <span className="text-sm">In production, this would upload to blob.</span>
                                                                <Input type="hidden" value="https://placehold.co/1920x1080" {...register("heroImageUrl")} />
                                                        </div>
                                                </div>
                                        </section>

                                        {/* 3. The Essentials */}
                                        <section className="space-y-6">
                                                <div className="flex items-center gap-2 mb-2">
                                                        <MapPin className="w-5 h-5 text-rose-600" />
                                                        <h2 className="text-xl font-bold text-slate-900">2. The Essentials</h2>
                                                </div>

                                                <div className="grid md:grid-cols-2 gap-6">
                                                        <div className="space-y-2">
                                                                <Label>Couple Names</Label>
                                                                <Input placeholder="e.g. Sarah & Tom" {...register("coupleNames", { required: true })} />
                                                                {errors.coupleNames && <span className="text-red-500 text-xs">Required</span>}
                                                        </div>
                                                        <div className="space-y-2">
                                                                <Label>Event Date & Time</Label>
                                                                <Input type="datetime-local" {...register("date", { required: true })} />
                                                        </div>
                                                        <div className="space-y-2">
                                                                <Label>Venue Name</Label>
                                                                <Input placeholder="e.g. The Grand Hotel" {...register("venueName", { required: true })} />
                                                        </div>
                                                        <div className="space-y-2">
                                                                <Label>Venue Address</Label>
                                                                <Input placeholder="123 Main St, City" {...register("venueAddress", { required: true })} />
                                                        </div>
                                                </div>
                                        </section>

                                        {/* 4. Optional Modules */}
                                        <section className="space-y-8">
                                                <div className="flex items-center gap-2 mb-2">
                                                        <Plus className="w-5 h-5 text-green-600" />
                                                        <h2 className="text-xl font-bold text-slate-900">3. Add-ons</h2>
                                                </div>

                                                {/* Story Toggle */}
                                                <div className="p-4 rounded-xl border border-slate-200 space-y-4">
                                                        <div className="flex items-center justify-between">
                                                                <Label htmlFor="hasStory" className="text-lg font-medium cursor-pointer">Our Story</Label>
                                                                <Switch id="hasStory" onCheckedChange={(c) => {
                                                                        // Switch component needs manual integration with RHF if not controlled
                                                                        // For simplicity using native checkbox hidden or registering logic
                                                                }}
                                                                        {...register("hasStory")} />
                                                        </div>
                                                        {hasStory && (
                                                                <div className="pt-2 animate-in slide-in-from-top-2">
                                                                        <Textarea placeholder="Tell us how you met..." className="min-h-[100px]" {...register("story")} />
                                                                </div>
                                                        )}
                                                </div>

                                                {/* Timeline Toggle */}
                                                <div className="p-4 rounded-xl border border-slate-200 space-y-4">
                                                        <div className="flex items-center justify-between">
                                                                <Label htmlFor="hasTimeline" className="text-lg font-medium">Event Timeline</Label>
                                                                <input type="checkbox" id="hasTimeline" {...register("hasTimeline")} className="w-5 h-5 accent-green-600" />
                                                        </div>
                                                        {hasTimeline && (
                                                                <div className="pt-2 space-y-3 animate-in slide-in-from-top-2">
                                                                        {fields.map((field, index) => (
                                                                                <div key={field.id} className="flex gap-2 items-start">
                                                                                        <Input placeholder="14:00" className="w-24" {...register(`timelineEvents.${index}.time`)} />
                                                                                        <Input placeholder="Event Title" className="flex-1" {...register(`timelineEvents.${index}.title`)} />
                                                                                        <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}>
                                                                                                <Trash2 className="w-4 h-4 text-red-500" />
                                                                                        </Button>
                                                                                </div>
                                                                        ))}
                                                                        <Button type="button" variant="outline" size="sm" onClick={() => append({ time: "", title: "" })} className="mt-2">
                                                                                <Plus className="w-4 h-4 mr-2" /> Add Event
                                                                        </Button>
                                                                </div>
                                                        )}
                                                </div>

                                                {/* Registry & Dress Code */}
                                                <div className="grid md:grid-cols-2 gap-4">
                                                        <div className="p-4 rounded-xl border border-slate-200">
                                                                <div className="flex items-center justify-between mb-4">
                                                                        <Label htmlFor="hasRegistry" className="font-medium">Gift Registry</Label>
                                                                        <input type="checkbox" id="hasRegistry" {...register("hasRegistry")} className="w-5 h-5 accent-green-600" />
                                                                </div>
                                                                {hasRegistry && (
                                                                        <Input placeholder="https://registry.com/..." {...register("registryUrl")} />
                                                                )}
                                                        </div>

                                                        <div className="p-4 rounded-xl border border-slate-200">
                                                                <div className="flex items-center justify-between mb-4">
                                                                        <Label htmlFor="hasDressCode" className="font-medium">Dress Code</Label>
                                                                        <input type="checkbox" id="hasDressCode" {...register("hasDressCode")} className="w-5 h-5 accent-green-600" />
                                                                </div>
                                                                {hasDressCode && (
                                                                        <Input placeholder="e.g. Black Tie Optional" {...register("dressCode")} />
                                                                )}
                                                        </div>
                                                </div>

                                                {/* Countdown Toggle */}
                                                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
                                                        <input type="checkbox" id="hasCountdown" {...register("hasCountdown")} className="w-5 h-5 accent-green-600" />
                                                        <Label htmlFor="hasCountdown">Display Countdown Timer</Label>
                                                </div>

                                        </section>

                                        <Button type="submit" size="lg" className="w-full text-lg h-14" disabled={isSubmitting}>
                                                {isSubmitting ? <Loader2 className="animate-spin mr-2" /> : <Sparkles className="mr-2" />}
                                                Generate Wedding Website
                                        </Button>

                                </form>
                        </div>
                </main>
        );
}
