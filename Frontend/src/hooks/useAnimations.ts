import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * Hook for fade-in animation on mount
 */
export const useFadeIn = (duration = 0.6, delay = 0) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current) {
            gsap.fromTo(
                ref.current,
                { opacity: 0 },
                { opacity: 1, duration, delay, ease: 'power2.out' }
            );
        }
    }, [duration, delay]);

    return ref;
};

/**
 * Hook for slide-up animation on mount
 */
export const useSlideUp = (duration = 0.6, delay = 0, distance = 30) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current) {
            gsap.fromTo(
                ref.current,
                { opacity: 0, y: distance },
                { opacity: 1, y: 0, duration, delay, ease: 'power3.out' }
            );
        }
    }, [duration, delay, distance]);

    return ref;
};

/**
 * Hook for stagger animation on children
 */
export const useStagger = (stagger = 0.1, duration = 0.5, delay = 0) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current) {
            const children = ref.current.children;
            gsap.fromTo(
                children,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration,
                    delay,
                    stagger,
                    ease: 'power2.out'
                }
            );
        }
    }, [stagger, duration, delay]);

    return ref;
};

/**
 * Hook for scale animation on mount
 */
export const useScaleIn = (duration = 0.5, delay = 0) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current) {
            gsap.fromTo(
                ref.current,
                { opacity: 0, scale: 0.9 },
                { opacity: 1, scale: 1, duration, delay, ease: 'back.out(1.2)' }
            );
        }
    }, [duration, delay]);

    return ref;
};
