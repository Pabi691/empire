import React from 'react';
import StatCounter from '../../ui/StatCounter';
import { motion } from 'framer-motion';
import { FaGlobeAmericas, FaShip, FaUsers, FaTrophy } from 'react-icons/fa';

const stats = [
    { value: 6, suffix: '+', label: 'Countries Served', icon: <FaGlobeAmericas /> },
    { value: 5000, suffix: '+', label: 'Shipments Handled', icon: <FaShip /> },
    { value: 200, suffix: '+', label: 'Happy Clients', icon: <FaUsers /> },
    { value: 5, suffix: '.0', label: 'Google Rating', icon: <FaTrophy /> },
];

export default function StatsBar() {
    return (
        <section className="relative py-0" style={{ background: '#050e28' }}>
            {/* Subtle top accent line */}
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-accent to-transparent opacity-60" />

            <div className="container-empire">
                <div className="grid grid-cols-2 md:grid-cols-4">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="relative py-10 px-6 text-center group"
                            style={{
                                borderRight: i < 3 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                                borderBottom: '1px solid rgba(255,255,255,0.05)',
                            }}
                        >
                            {/* Hover glow */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                style={{ background: 'radial-gradient(ellipse at center, rgba(240,111,31,0.07) 0%, transparent 70%)' }}
                            />
                            <StatCounter {...stat} index={i} />
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Subtle bottom accent line */}
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-40" />
        </section>
    );
}
