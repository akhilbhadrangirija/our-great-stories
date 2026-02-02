'use server';

import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const DateSchema = z.object({
        senderName: z.string().min(1, 'Your name is required'),
        questionText: z.string().min(1, 'Question is required'),
        theme: z.enum(['romantic', 'playful', 'straightforward']),
});

export async function createDateInvite(formData) {
        const data = {
                senderName: formData.get('senderName'),
                questionText: formData.get('questionText'),
                theme: formData.get('theme'),
        };

        const validation = DateSchema.safeParse(data);

        if (!validation.success) {
                return { error: 'Validation failed' };
        }

        const slug = Math.random().toString(36).substring(2, 8);

        try {
                await prisma.dateInvite.create({
                        data: {
                                slug,
                                senderName: validation.data.senderName,
                                questionText: validation.data.questionText,
                                theme: validation.data.theme,
                        },
                });
        } catch (e) {
                console.error(e);
                return { error: 'Failed to create invite' };
        }

        redirect(`/d/${slug}`);
}
