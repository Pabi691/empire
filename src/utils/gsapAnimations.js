import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const fadeInUp = (element, delay = 0) => {
    return gsap.fromTo(
        element,
        { opacity: 0, y: 40 },
        {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay,
            ease: 'expo.out',
        }
    );
};

export const staggerFadeIn = (elements, stagger = 0.1) => {
    return gsap.fromTo(
        elements,
        { opacity: 0, y: 30 },
        {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger,
            ease: 'expo.out',
        }
    );
};

export const slideInLeft = (element, delay = 0) => {
    return gsap.fromTo(
        element,
        { opacity: 0, x: -60 },
        {
            opacity: 1,
            x: 0,
            duration: 0.7,
            delay,
            ease: 'expo.out',
        }
    );
};

export const slideInRight = (element, delay = 0) => {
    return gsap.fromTo(
        element,
        { opacity: 0, x: 60 },
        {
            opacity: 1,
            x: 0,
            duration: 0.7,
            delay,
            ease: 'expo.out',
        }
    );
};

export const scaleIn = (element, delay = 0) => {
    return gsap.fromTo(
        element,
        { opacity: 0, scale: 0.8 },
        {
            opacity: 1,
            scale: 1,
            duration: 0.7,
            delay,
            ease: 'expo.out',
        }
    );
};

export const createScrollTrigger = (element, animation, options = {}) => {
    return ScrollTrigger.create({
        trigger: element,
        start: options.start || 'top 85%',
        end: options.end || 'bottom 15%',
        animation,
        toggleActions: options.toggleActions || 'play none none none',
        ...options,
    });
};

export const parallax = (element, speed = 0.5) => {
    return gsap.to(element, {
        yPercent: -30 * speed,
        ease: 'none',
        scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
        },
    });
};

export const heroTextReveal = (container) => {
    const tl = gsap.timeline({ delay: 0.3 });
    const chars = container.querySelectorAll('.char');
    const words = container.querySelectorAll('.word');
    const lines = container.querySelectorAll('.line');

    if (chars.length) {
        tl.fromTo(chars, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.02, ease: 'expo.out' });
    } else if (words.length) {
        tl.fromTo(words, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: 'expo.out' });
    } else if (lines.length) {
        tl.fromTo(lines, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'expo.out' });
    }

    return tl;
};
