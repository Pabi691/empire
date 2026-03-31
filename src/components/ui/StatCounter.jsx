import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

export default function StatCounter({ value, suffix = '', prefix = '', label, icon, index = 0, color = '#f06f1f' }) {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

    return (
        <div ref={ref} className="text-center relative">
            {/* Animated number */}
            <div className="font-display text-5xl md:text-[56px] lg:text-[64px] text-white mb-1.5 leading-none tracking-tight">
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
