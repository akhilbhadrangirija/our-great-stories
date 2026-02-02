import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import DateInviteView from './DateInviteView';

export default async function DateInvitePage({ params }) {
        const { slug } = await params;

        const invite = await prisma.dateInvite.findUnique({
                where: { slug },
        });

        if (!invite) {
                notFound();
        }

        return <DateInviteView invite={invite} />;
}
