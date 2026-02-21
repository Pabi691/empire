import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Button from '../../ui/Button';
import ScrollReveal from '../../ui/ScrollReveal';
import { FaArrowRight, FaCheckCircle } from 'react-icons/fa';

const highlights = [
    'MTO Licensed — DG Shipping Certified',
    'Cross-border specialist: 6 countries',
    'Real-time shipment tracking',
    'Dedicated customs clearance team',
];

export default function AboutSnippet() {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });
    const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

    return (
        <section ref={sectionRef} className="section-padding bg-white bg-grain relative overflow-hidden">
            {/* Parallax depth layer */}
            <motion.div
                className="absolute inset-0 pointer-events-none z-0"
                style={{ y: bgY }}
            >
                <div className="absolute top-20 right-10 w-[300px] h-[300px] bg-primary/[0.03] rounded-full blur-[100px]" />
                <div className="absolute bottom-20 left-10 w-[250px] h-[250px] bg-accent/[0.03] rounded-full blur-[80px]" />
            </motion.div>

            <div className="container-empire relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left — Visual */}
                    <ScrollReveal direction="left">
                        <div className="relative">
                            <div className="aspect-[4/3] rounded-card overflow-hidden relative shadow-hover">
                                {/* Real warehouse/logistics photo */}
                                <img
                                    src="/about-warehouse.png"
                                    alt="Empire Logistics Warehouse & Operations"
                                    className="w-full h-full object-cover"
                                />
                                {/* Overlay gradient for brand colour cohesion */}
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
                                {/* "Since 2018" badge bottom-left */}
                                <div className="absolute bottom-4 left-4 px-4 py-2 rounded-pill bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-accent uppercase tracking-[2px]">
                                    Est. 2018 — Kolkata, India
                                </div>
                            </div>
                            {/* Floating card */}
                            <motion.div
                                className="absolute -bottom-6 -right-6 bg-white rounded-card p-5 shadow-hover border border-border-soft"
                                animate={{ y: [0, -8, 0] }}
                                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                            >
                                <div className="font-display text-3xl text-accent">5.0★</div>
                                <div className="font-accent text-xs uppercase tracking-wider text-text-muted">Google Rating</div>
                            </motion.div>
                        </div>
                    </ScrollReveal>

                    {/* Right — Content */}
                    <ScrollReveal direction="right">
                        <span className="inline-block font-accent text-xs uppercase tracking-[1.5px] text-accent font-medium mb-3">
                            About Empire Logistics
                        </span>
                        <h2 className="font-heading font-extrabold text-h2-mobile md:text-h2 text-text-primary mb-5">
                            Your Trusted Cross-Border <span className="gradient-text-blue">Freight Partner</span>
                        </h2>
                        <p className="text-text-muted text-body leading-relaxed mb-6">
                            Empire Logistics is a Kolkata-based, MTO-licensed cross-border freight forwarding company
                            specializing in seamless trade connectivity across South Asia and beyond. With expertise
                            spanning ocean freight, air cargo, customs clearance, and warehousing, we make international
                            trade simple and reliable.
                        </p>

                        {/* Staggered bullet points */}
                        <div className="space-y-3 mb-8">
                            {highlights.map((item, i) => (
                                <motion.div
                                    key={i}
                                    className="flex items-center gap-3"
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <FaCheckCircle className="text-accent flex-shrink-0" />
                                    <span className="text-text-primary text-sm font-medium">{item}</span>
                                </motion.div>
                            ))}
                        </div>

                        <Button variant="primary" icon={<FaArrowRight />} onClick={() => window.location.href = '/about'}>
                            Learn More About Us
                        </Button>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}
