'use server';

import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const WeddingSchema = z.object({
        coupleNames: z.string().min(1, 'Couple names are required'),
        date: z.string().transform((str) => new Date(str)),
        venueName: z.string().min(1, 'Venue name is required'),
        venueAddress: z.string().min(1, 'Venue address is required'),
        story: z.string().optional(),
});

export async function createWedding(formData) {
        const data = {
                coupleNames: formData.get('coupleNames'),
                date: formData.get('date'),
                venueName: formData.get('venueName'),
                venueAddress: formData.get('venueAddress'),
                story: formData.get('story'),
        };

        const validation = WeddingSchema.safeParse(data);

        if (!validation.success) {
                return { error: 'Validation failed' };
        }

        // Generate a random slug
        const slug = Math.random().toString(36).substring(2, 8);

        try {
                const wedding = await prisma.wedding.create({
                        data: {
                                slug,
                                coupleNames: validation.data.coupleNames,
                                date: validation.data.date,
                                venueName: validation.data.venueName,
                                venueAddress: validation.data.venueAddress,
                                story: validation.data.story,
                        },
                });

        } catch (e) {
                console.error(e);
                return { error: 'Failed to create invite' };
        }

        redirect(`/w/${slug}`);
}
