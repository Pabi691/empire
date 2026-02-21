import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

export default function usePageTransition() {
    const navigate = useNavigate();

    const transitionTo = useCallback((path) => {
        const overlay = document.createElement('div');
        overlay.style.cssText = `
      position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
      background: linear-gradient(135deg, #0a0f1e, #0c328e);
      z-index: 9999; transform: translateX(-100%);
    `;
        document.body.appendChild(overlay);

        gsap.to(overlay, {
            x: 0,
            duration: 0.4,
            ease: 'power3.inOut',
            onComplete: () => {
                navigate(path);
                window.scrollTo(0, 0);
                gsap.to(overlay, {
                    x: '100%',
                    duration: 0.4,
                    ease: 'power3.inOut',
                    delay: 0.1,
                    onComplete: () => overlay.remove(),
                });
            },
        });
    }, [navigate]);

    return transitionTo;
}
