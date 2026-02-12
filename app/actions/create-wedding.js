'use server';

import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const WeddingSchema = z.object({
        themeId: z.string().default("classic"),
        aiStyle: z.string().default("watercolor"),
        heroImageUrl: z.string().optional(),
        coupleNames: z.string().min(1, 'Couple names are required'),
        date: z.string().transform((str) => new Date(str)),
        venueName: z.string().min(1, 'Venue name is required'),
        venueAddress: z.string().min(1, 'Venue address is required'),
        hasTimeline: z.coerce.boolean(),
        timelineEvents: z.string().optional(), // JSON string
        hasStory: z.coerce.boolean(),
        story: z.string().optional(),
        hasRegistry: z.coerce.boolean(),
        registryUrl: z.string().optional(),
        hasCountdown: z.coerce.boolean(),
        hasDressCode: z.coerce.boolean(),
        dressCode: z.string().optional(),
});

export async function createWedding(formData) {
        const rawData = Object.fromEntries(formData.entries());

        // Handle boolean conversions explicitly where needed if zod coerce is not enough for formData strings "true"/"false"
        // But Zod coerce.boolean() handles "true", "false", "on" etc.

        const validation = WeddingSchema.safeParse(rawData);

        if (!validation.success) {
                console.error("Validation Error:", validation.error.format());
                return { error: 'Validation failed' };
        }

        // Generate a random slug
        const slug = Math.random().toString(36).substring(2, 8);

        try {
                await prisma.wedding.create({
                        data: {
                                slug,
                                ...validation.data,
                        },
                });

        } catch (e) {
                console.error(e);
                return { error: 'Failed to create invite' };
        }

        redirect(`/w/${slug}`);
}
