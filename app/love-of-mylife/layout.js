export const metadata = {
        title: "Love of My Life | Our Great Story",
        description: "A special interactive story for the one I love.",
        openGraph: {
                title: "Love of My Life | Our Great Story",
                description: "A special interactive story for the one I love.",
                images: [
                        {
                                url: "/ogimage.jpg",
                                width: 1200,
                                height: 630,
                                alt: "Love of My Life",
                        },
                ],
                type: "website",
        },
        twitter: {
                card: "summary_large_image",
                title: "Love of My Life | Our Great Story",
                description: "A special interactive story for the one I love.",
                images: ["/ogimage.jpg"],
        },
};

export default function LoveOfMyLifeLayout({ children }) {
        return (
                <div className="w-full min-h-screen">
                        {children}
                </div>
        );
}
