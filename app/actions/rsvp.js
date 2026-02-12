'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function submitRSVP(weddingId, formData) {
        const name = formData.get('name');
        const email = formData.get('email');
        const attending = formData.get('attending'); // 'yes' or 'no'
        const guestCount = parseInt(formData.get('guestCount') || "1");
        const meal = formData.get('meal');
        const diet = formData.get('diet');
        const songRequest = formData.get('songRequest');
        const message = formData.get('message');

        if (!name || !attending) {
                return { error: 'Name and attendance are required' };
        }

        try {
                await prisma.guest.create({
                        data: {
                                weddingId,
                                name,
                                email,
                                status: attending === 'yes' ? 'ACCEPTED' : 'DECLINED',
                                guestCount,
                                meal,
                                dietary: diet,
                                songRequest,
                                message
                        }
                });

                return { success: true };
        } catch (e) {
                console.error(e);
                return { error: 'Failed to submit RSVP' };
        }
}
