import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

export default function StatCounter({ value, suffix = '', prefix = '', label, icon, index = 0, color = '#f06f1f', align = 'center' }) {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

    return (
        <div ref={ref} className={`relative ${align === 'left' ? 'text-left' : 'text-center'}`}>
            {/* Animated number */}
            <div className="font-display text-4xl md:text-5xl lg:text-[56px] text-white mb-1 leading-none tracking-tight">
                {inView ? (
                    <>
                        {prefix}
                        <CountUp end={value} duration={2.5} separator="," />
                        <span style={{ color }}>{suffix}</span>
                    </>
                ) : (
                    <span>{prefix}0{suffix}</span>
                )}
            </div>
            <p className="font-accent text-[10px] md:text-xs uppercase tracking-[2.5px] text-white/35 mb-0">
                {label}
            </p>
        </div>
    );
}
