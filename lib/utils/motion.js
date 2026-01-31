/**
 * Motion Utility Functions
 * Common animation variants and timing functions for consistency
 */

export const easings = {
        ease: [0.25, 0.1, 0.25, 1],
        easeIn: [0.42, 0, 1, 1],
        easeOut: [0, 0, 0.58, 1],
        easeInOut: [0.42, 0, 0.58, 1],
        spring: [0.34, 1.56, 0.64, 1],
};

export const fadeInUp = {
        hidden: {
                opacity: 0,
                y: 40,
        },
        visible: {
                opacity: 1,
                y: 0,
                transition: {
                        duration: 0.6,
                        ease: easings.easeOut,
                },
        },
};

export const fadeIn = {
        hidden: {
                opacity: 0,
        },
        visible: {
                opacity: 1,
                transition: {
                        duration: 0.5,
                },
        },
};

export const scaleIn = {
        hidden: {
                opacity: 0,
                scale: 0.8,
        },
        visible: {
                opacity: 1,
                scale: 1,
                transition: {
                        duration: 0.5,
                        ease: easings.easeOut,
                },
        },
};

export const slideInLeft = {
        hidden: {
                opacity: 0,
                x: -50,
        },
        visible: {
                opacity: 1,
                x: 0,
                transition: {
                        duration: 0.6,
                        ease: easings.easeOut,
                },
        },
};

export const slideInRight = {
        hidden: {
                opacity: 0,
                x: 50,
        },
        visible: {
                opacity: 1,
                x: 0,
                transition: {
                        duration: 0.6,
                        ease: easings.easeOut,
                },
        },
};

export const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
                opacity: 1,
                transition: {
                        staggerChildren: 0.1,
                        delayChildren: 0.1,
                },
        },
};
