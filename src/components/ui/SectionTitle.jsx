import React from 'react';
import { motion } from 'framer-motion';

export default function SectionTitle({
    label,
    title,
    subtitle,
    align = 'center',
    light = false,
}) {
    return (
        <motion.div
            className={`mb-12 md:mb-16 ${align === 'center' ? 'text-center' : 'text-left'}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
            {label && (
                <span
                    className={`inline-block font-accent text-xs uppercase tracking-[1.5px] font-medium mb-3 px-4 py-1.5 rounded-pill ${light
                            ? 'text-orange-300 bg-white/10 border border-white/20'
                            : 'text-accent bg-accent/10 border border-accent/20'
                        }`}
                >
                    {label}
                </span>
            )}
            <h2
                className={`font-heading font-extrabold text-h2-mobile md:text-h2 ${light ? 'text-white' : 'text-text-primary'
                    }`}
            >
                {title}
            </h2>
            {subtitle && (
                <p
                    className={`mt-4 text-body max-w-2xl ${align === 'center' ? 'mx-auto' : ''
                        } ${light ? 'text-gray-300' : 'text-text-muted'}`}
                >
                    {subtitle}
                </p>
            )}
        </motion.div>
    );
}
