import React from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';

export default function TestimonialCard({ testimonial }) {
    return (
        <motion.div
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="shine-on-hover relative h-full flex flex-col rounded-card overflow-hidden group cursor-default"
            style={{
                background: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(24px) saturate(160%)',
                WebkitBackdropFilter: 'blur(24px) saturate(160%)',
                border: '1px solid rgba(255,255,255,0.14)',
                boxShadow: '0 8px 40px rgba(0,0,0,0.20), inset 0 1px 0 rgba(255,255,255,0.10)',
                padding: '2rem',
            }}
        >
            {/* Inner glow on hover */}
            <div className="absolute inset-0 rounded-card opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at top left, rgba(240,111,31,0.08) 0%, transparent 60%)' }} />

            {/* Large decorative quote */}
            <div className="absolute top-3 right-4 text-[80px] leading-none font-serif pointer-events-none select-none opacity-[0.06] text-white group-hover:opacity-[0.10] transition-opacity duration-500">
                "
            </div>

            {/* Quote icon */}
            <FaQuoteLeft className="text-2xl text-accent/40 mb-3 relative z-10" />

            {/* Stars */}
            <div className="flex gap-1 mb-4 relative z-10">
                {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-amber-400 text-xs" />
                ))}
            </div>

            {/* Text */}
            <p className="text-white/75 text-sm leading-relaxed flex-1 mb-6 relative z-10">
                "{testimonial.text}"
            </p>

            {/* Author */}
            <div className="flex items-center gap-3 pt-4 relative z-10"
                style={{ borderTop: '1px solid rgba(255,255,255,0.10)' }}>
                <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #0c328e, #1a4fbd)' }}
                >
                    {testimonial.name.charAt(0)}
                </div>
                <div>
                    <p className="font-heading font-bold text-sm text-white">
                        {testimonial.name}
                    </p>
                    <p className="text-white/50 text-xs">{testimonial.company}</p>
                </div>
            </div>
        </motion.div>
    );
}
