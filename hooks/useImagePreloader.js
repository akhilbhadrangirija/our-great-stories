import { useState, useEffect } from 'react';

const useImagePreloader = (imagePaths) => {
        const [images, setImages] = useState([]);
        const [loaded, setLoaded] = useState(false);
        const [progress, setProgress] = useState(0);

        useEffect(() => {
                if (!imagePaths || imagePaths.length === 0) {
                        setLoaded(true);
                        return;
                }

                let loadedCount = 0;
                const imageElements = [];

                const onLoad = () => {
                        loadedCount++;
                        setProgress(Math.round((loadedCount / imagePaths.length) * 100));
                        if (loadedCount === imagePaths.length) {
                                setLoaded(true);
                                setImages(imageElements);
                        }
                };

                imagePaths.forEach((path) => {
                        const img = new Image();
                        img.src = path;
                        img.onload = onLoad;
                        img.onerror = onLoad; // Count errors as loaded to avoid blocking
                        imageElements.push(img);
                });

                return () => {
                        // transform paths to cancel load if needed (optional optimization)
                        imageElements.forEach(img => {
                                img.onload = null;
                                img.onerror = null;
                        })
                };
        }, [imagePaths]);

        return { images, loaded, progress };
};

export default useImagePreloader;
