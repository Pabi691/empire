import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaBullseye, FaEye, FaHandshake, FaStar } from 'react-icons/fa';

const items = [
    {
        icon: <FaBullseye />,
        title: 'Our Mission',
        desc: 'To simplify cross-border logistics for businesses across South and Southeast Asia — combining industry expertise, cutting-edge technology, and trusted regional partnerships to deliver solutions that scale with your business.',
        gradient: 'linear-gradient(135deg, #0c328e, #1a4fbd)',
        accent: '#0c328e',
        delay: 0,
    },
    {
        icon: <FaEye />,
        title: 'Our Vision',
        desc: 'To be the most trusted cross-border logistics partner in South and Southeast Asia — recognized for operational excellence, technology-driven innovation, and an unwavering commitment to client success across every corridor we serve.',
        gradient: 'linear-gradient(135deg, #f06f1f, #f5a623)',
        accent: '#f06f1f',
        delay: 0.15,
    },
    {
        icon: <FaHandshake />,
        title: "Founders' Vision",
        desc: "Empire Logistics was built on a simple belief: cross-border trade should not be complicated. Our founders envisioned a logistics company that combines regional expertise with technology — creating pathways for businesses to grow beyond borders, without the hassle. Every shipment we handle carries that founding promise forward.",
        gradient: 'linear-gradient(135deg, #0a2870, #0c328e)',
        accent: '#1a4fbd',
        delay: 0.3,
    },
];

/* Floating animated orb */
function GlassOrb({ size, color, style, delay = 0 }) {
    return (
        <div
            className="absolute rounded-full pointer-events-none"
            style={{
                width: size,
                height: size,
                background: color,
                filter: 'blur(80px)',
                animation: `orbFloat1 ${18 + delay * 4}s ease-in-out infinite`,
                animationDelay: `${delay}s`,
                ...style,
            }}
        />
    );
}

export default function MissionVision() {
    const sectionRef = useRef(null);
    const [inView, setInView] = useState(false);

    /* Scroll-driven parallax */
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });
    const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
    const orbY1 = useTransform(scrollYProgress, [0, 1], ['-20px', '40px']);
    const orbY2 = useTransform(scrollYProgress, [0, 1], ['40px', '-20px']);

    /* Mouse spotlight */
    const handleMouseMove = (e) => {
        const rect = sectionRef.current?.getBoundingClientRect();
        if (!rect) return;
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        sectionRef.current.style.setProperty('--mx', `${x}%`);
        sectionRef.current.style.setProperty('--my', `${y}%`);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setInView(true); },
            { threshold: 0.2 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            onMouseMove={handleMouseMove}
            className={`section-padding relative overflow-hidden mouse-spotlight animated-top-border ${inView ? 'in-view' : ''}`}
            style={{ background: 'linear-gradient(160deg, #05102e 0%, #0a1a50 40%, #0d1f3c 100%)' }}
        >
            {/* Parallax background image */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ y: bgY }}
            >
                <img
                    src="/cargo-ship.png"
                    alt=""
                    aria-hidden="true"
                    className="w-full h-full object-cover opacity-[0.15]"
                    style={{ objectPosition: 'center' }}
                />
            </motion.div>

            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#05102e]/90 via-[#0a1a50]/80 to-[#05102e]/95 pointer-events-none" />

            {/* Floating orbs with parallax */}
            <motion.div style={{ y: orbY1 }} className="absolute inset-0 pointer-events-none">
                <GlassOrb size="500px" color="rgba(12,50,142,0.20)" style={{ top: '-100px', left: '-100px' }} delay={0} />
            </motion.div>
            <motion.div style={{ y: orbY2 }} className="absolute inset-0 pointer-events-none">
                <GlassOrb size="400px" color="rgba(240,111,31,0.12)" style={{ bottom: '-80px', right: '-80px' }} delay={2} />
                <GlassOrb size="250px" color="rgba(26,79,189,0.15)" style={{ top: '30%', right: '20%' }} delay={4} />
            </motion.div>

            {/* Grid dot pattern overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
                style={{
                    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
                    backgroundSize: '28px 28px',
                }} />

            {/* Content */}
            <div className="container-empire relative z-10">
                {/* Header */}
                <motion.div
                    className="text-center mb-14"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className="glass-pill mb-4 inline-flex">
                        <FaStar className="text-accent text-xs" />
                        Our Foundation
                    </span>
                    <h2 className="font-heading font-extrabold text-h2-mobile md:text-h2 text-white mt-3">
                        Mission, Vision &amp;{' '}
                        <span className="gradient-text-ora">Promise</span>
                    </h2>
                </motion.div>

                {/* Glass cards grid */}
                <div className="grid md:grid-cols-3 gap-6">
                    {items.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 50, scale: 0.96 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.65, delay: item.delay, ease: [0.16, 1, 0.3, 1] }}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="glass-dark rounded-card p-8 shine-on-hover relative overflow-hidden group cursor-default"
                            style={{
                                background: 'rgba(255,255,255,0.04)',
                                backdropFilter: 'blur(28px) saturate(180%)',
                                WebkitBackdropFilter: 'blur(28px) saturate(180%)',
                                border: '1px solid rgba(255,255,255,0.10)',
                                boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)',
                            }}
                        >
                            {/* Subtle inner glow on hover */}
                            <div
                                className="absolute inset-0 rounded-card opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                style={{
                                    background: `radial-gradient(ellipse at top left, ${item.accent}22 0%, transparent 60%)`,
                                }}
                            />
                            {/* Top accent line */}
                            <div
                                className="absolute top-0 left-0 right-0 h-[2px] rounded-t-card"
                                style={{ background: item.gradient }}
                            />
                            {/* Icon */}
                            <div
                                className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl mb-6 group-hover:scale-110 transition-transform duration-300"
                                style={{ background: item.gradient, boxShadow: `0 8px 24px ${item.accent}40` }}
                            >
                                {item.icon}
                            </div>
                            <h3 className="font-heading font-bold text-xl text-white mb-3">{item.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>

                            {/* Animated corner glow */}
                            <div
                                className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full opacity-[0.15] group-hover:opacity-30 transition-opacity duration-500"
                                style={{ background: item.accent, filter: 'blur(20px)', animation: `glowPulse 3s ease-in-out infinite ${item.delay + 0.5}s` }}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
