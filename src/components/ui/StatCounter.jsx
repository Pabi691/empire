import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

export default function StatCounter({ value, suffix = '', prefix = '', label, icon, index = 0 }) {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

    // Calculate progress bar width based on value
    const getProgressWidth = () => {
        if (value >= 5000) return '92%';
        if (value >= 200) return '78%';
        if (value >= 6) return '60%';
        if (value >= 5) return '100%';
        return '50%';
    };

    return (
        <div ref={ref} className="text-center">
            {/* Icon with bounce animation */}
            {icon && (
                <motion.div
                    className="text-3xl mb-2 text-accent inline-block"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={inView ? { scale: 1, opacity: 1 } : {}}
                    transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 15,
                        delay: index * 0.1,
                    }}
                >
                    {icon}
                </motion.div>
            )}
            <div className="font-display text-5xl md:text-6xl text-white mb-1">
                {inView ? (
                    <>
                        {prefix}
                        <CountUp end={value} duration={2.5} separator="," />
                        {suffix}
                    </>
                ) : (
                    <span>{prefix}0{suffix}</span>
                )}
            </div>
            <p className="font-accent text-xs uppercase tracking-[1.5px] text-gray-400 mb-3">
                {label}
            </p>
            {/* Animated progress bar */}
            <div className="w-16 h-0.5 bg-white/10 rounded-full mx-auto overflow-hidden">
                <motion.div
                    className="h-full bg-gradient-to-r from-accent to-amber-400 rounded-full"
                    initial={{ width: 0 }}
                    animate={inView ? { width: getProgressWidth() } : {}}
                    transition={{ duration: 2, delay: 0.3 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                />
            </div>
        </div>
    );
}
