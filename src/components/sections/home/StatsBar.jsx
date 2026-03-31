import React, { useRef, useEffect, useCallback } from 'react';
import StatCounter from '../../ui/StatCounter';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaGlobeAmericas, FaShip, FaUsers, FaTrophy } from 'react-icons/fa';

const stats = [
    { value: 6, suffix: '+', label: 'Countries Served', icon: FaGlobeAmericas, color: '#4a9eff' },
    { value: 5000, suffix: '+', label: 'Shipments Handled', icon: FaShip, color: '#f06f1f' },
    { value: 200, suffix: '+', label: 'Happy Clients', icon: FaUsers, color: '#22c55e' },
    { value: 5, suffix: '.0', label: 'Google Rating', icon: FaTrophy, color: '#f5a623' },
];

/* ─── Animated background mesh ─── */
function AnimatedMesh() {
    const canvasRef = useRef(null);
    const frameRef = useRef(null);

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const w = canvas.width;
        const h = canvas.height;
        const t = Date.now() * 0.0003;

        ctx.clearRect(0, 0, w, h);

        // Flowing gradient lines
        for (let i = 0; i < 5; i++) {
            ctx.beginPath();
            ctx.moveTo(0, h * 0.5 + Math.sin(t + i * 0.8) * h * 0.3);
            for (let x = 0; x <= w; x += 4) {
                const y = h * 0.5 + Math.sin(t + i * 0.8 + x * 0.003) * h * 0.3
                    + Math.cos(t * 1.3 + i * 0.5 + x * 0.005) * h * 0.1;
                ctx.lineTo(x, y);
            }
            const alpha = 0.03 + i * 0.008;
            ctx.strokeStyle = i % 2 === 0
                ? `rgba(74,158,255,${alpha})`
                : `rgba(240,111,31,${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        frameRef.current = requestAnimationFrame(draw);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const resize = () => {
            canvas.width = canvas.parentElement.offsetWidth;
            canvas.height = canvas.parentElement.offsetHeight;
        };
        resize();
        window.addEventListener('resize', resize);
        frameRef.current = requestAnimationFrame(draw);

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(frameRef.current);
        };
    }, [draw]);

    return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />;
}

export default function StatsBar() {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });
    const x1 = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);
    const x2 = useTransform(scrollYProgress, [0, 1], ['5%', '-5%']);

    return (
        <section ref={sectionRef} className="relative overflow-hidden" style={{
            background: 'linear-gradient(180deg, #040c22 0%, #070f2a 50%, #040c22 100%)',
        }}>
            {/* ─── Animated mesh background ─── */}
            <AnimatedMesh />

            {/* ─── Top accent line with glow ─── */}
            <div className="relative h-px w-full">
                <motion.div
                    className="absolute inset-0"
                    style={{ x: x1 }}
                >
                    <div className="h-px w-full" style={{
                        background: 'linear-gradient(90deg, transparent 5%, rgba(74,158,255,0.3) 30%, rgba(240,111,31,0.5) 50%, rgba(74,158,255,0.3) 70%, transparent 95%)',
                    }} />
                    <div className="h-4 w-full -mt-2" style={{
                        background: 'linear-gradient(90deg, transparent 5%, rgba(240,111,31,0.08) 40%, rgba(74,158,255,0.06) 60%, transparent 95%)',
                        filter: 'blur(8px)',
                    }} />
                </motion.div>
            </div>

            {/* ─── Stats Grid ─── */}
            <div className="container-empire relative z-10">
                <div className="grid grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat, i) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                                className="relative group cursor-default"
                            >
                                {/* Card with glass border */}
                                <div className="relative py-10 md:py-14 px-6 text-center overflow-hidden"
                                    style={{
                                        borderRight: i < 3 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                                    }}
                                >
                                    {/* Hover radial glow */}
                                    <div
                                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none"
                                        style={{
                                            background: `radial-gradient(ellipse at center, ${stat.color}08 0%, transparent 70%)`,
                                        }}
                                    />

                                    {/* Floating icon */}
                                    <motion.div
                                        className="mx-auto mb-5 w-14 h-14 rounded-2xl flex items-center justify-center relative"
                                        whileHover={{ y: -4, scale: 1.05 }}
                                        transition={{ duration: 0.3 }}
                                        style={{
                                            background: `linear-gradient(135deg, ${stat.color}15, ${stat.color}08)`,
                                            border: `1px solid ${stat.color}20`,
                                            boxShadow: `0 8px 24px ${stat.color}10`,
                                        }}
                                    >
                                        <Icon className="text-xl" style={{ color: stat.color }} />
                                        {/* Pulse ring */}
                                        <motion.div
                                            className="absolute inset-0 rounded-2xl"
                                            animate={{
                                                boxShadow: [
                                                    `0 0 0 0px ${stat.color}15`,
                                                    `0 0 0 8px ${stat.color}00`,
                                                ],
                                            }}
                                            transition={{ repeat: Infinity, duration: 2.5, delay: i * 0.4 }}
                                        />
                                    </motion.div>

                                    {/* Counter */}
                                    <StatCounter
                                        value={stat.value}
                                        suffix={stat.suffix}
                                        label={stat.label}
                                        index={i}
                                        color={stat.color}
                                    />

                                    {/* Bottom accent bar on hover */}
                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 group-hover:w-16 transition-all duration-500 rounded-full"
                                        style={{ background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)` }}
                                    />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* ─── Bottom accent line with glow ─── */}
            <div className="relative h-px w-full">
                <motion.div
                    className="absolute inset-0"
                    style={{ x: x2 }}
                >
                    <div className="h-px w-full" style={{
                        background: 'linear-gradient(90deg, transparent 5%, rgba(240,111,31,0.2) 30%, rgba(74,158,255,0.35) 50%, rgba(240,111,31,0.2) 70%, transparent 95%)',
                    }} />
                </motion.div>
            </div>
        </section>
    );
}
