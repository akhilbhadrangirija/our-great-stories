'use client';

import dynamic from 'next/dynamic';

const ImageSequence = dynamic(() => import('../../components/sequence/ImageSequence'), {
        ssr: false,
        loading: () => <p>Loading...</p>
});

export default function SequencePage() {
        return (
                <main className="relative w-full min-h-screen bg-black">
                        <ImageSequence />
                </main>
        );
}
