'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function submitRSVP(weddingId, formData) {
        const name = formData.get('name');
        const email = formData.get('email');
        const attending = formData.get('attending'); // 'yes' or 'no'
        const diet = formData.get('diet');
        const meal = formData.get('meal'); // Not in current form but good to have

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
                                dietary: diet,
                                meal
                        }
                });

                return { success: true };
        } catch (e) {
                console.error(e);
                return { error: 'Failed to submit RSVP' };
        }
}
