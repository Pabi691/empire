import { useState, useEffect, useRef, useCallback } from 'react';

export default function useCounter(end, duration = 2000, startOnView = true) {
    const [count, setCount] = useState(0);
    const [started, setStarted] = useState(false);
    const ref = useRef(null);

    const startCounting = useCallback(() => {
        if (started) return;
        setStarted(true);

        const startTime = performance.now();
        const startVal = 0;

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(startVal + (end - startVal) * eased);

            setCount(current);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [end, duration, started]);

    useEffect(() => {
        if (!startOnView || !ref.current) {
            if (!startOnView) startCounting();
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    startCounting();
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );

        observer.observe(ref.current);

        return () => observer.disconnect();
    }, [startOnView, startCounting]);

    return { count, ref };
}
