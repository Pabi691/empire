import React from 'react';
import { motion } from 'framer-motion';

export default function ScrollReveal({
    children,
    direction = 'up',
    delay = 0,
    className = '',
    once = true,
}) {
    const variants = {
        up: { initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0 } },
        down: { initial: { opacity: 0, y: -40 }, animate: { opacity: 1, y: 0 } },
        left: { initial: { opacity: 0, x: -60 }, animate: { opacity: 1, x: 0 } },
        right: { initial: { opacity: 0, x: 60 }, animate: { opacity: 1, x: 0 } },
        scale: { initial: { opacity: 0, scale: 0.85 }, animate: { opacity: 1, scale: 1 } },
        fade: { initial: { opacity: 0 }, animate: { opacity: 1 } },
    };

    const v = variants[direction] || variants.up;

    return (
        <motion.div
            initial={v.initial}
            whileInView={v.animate}
            viewport={{ once, margin: '-50px' }}
            transition={{
                duration: 0.7,
                delay,
                ease: [0.16, 1, 0.3, 1],
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
