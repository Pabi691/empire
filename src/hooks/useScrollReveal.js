import { useEffect, useRef } from 'react';

export default function useScrollReveal(options = {}) {
    const ref = useRef(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        if (!options.repeat) {
                            observer.unobserve(entry.target);
                        }
                    } else if (options.repeat) {
                        entry.target.classList.remove('revealed');
                    }
                });
            },
            {
                threshold: options.threshold || 0.15,
                rootMargin: options.rootMargin || '0px 0px -50px 0px',
            }
        );

        observer.observe(element);

        return () => {
            observer.unobserve(element);
        };
    }, [options.threshold, options.rootMargin, options.repeat]);

    return ref;
}
