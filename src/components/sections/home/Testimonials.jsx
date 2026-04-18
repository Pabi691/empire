import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SectionTitle from '../../ui/SectionTitle';
import TestimonialCard from '../../ui/TestimonialCard';
import Button from '../../ui/Button';
import testimonials from '../../../data/testimonials';
import { FaArrowRight } from 'react-icons/fa';

export default function Testimonials() {
    const ref = useRef(null);
    const doubled = [...testimonials, ...testimonials];

    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
    const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
    const orbY = useTransform(scrollYProgress, [0, 1], ['-30px', '30px']);

    return (
        <section ref={ref} className="section-padding relative overflow-hidden"
            style={{ background: 'linear-gradient(160deg, #050e28 0%, #0c1f4a 50%, #05102e 100%)' }}
        >
            {/* Parallax background */}
            <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
                <img
                    src="/team-office.png"
                    alt=""
                    aria-hidden="true"
                    className="w-full h-full object-cover opacity-[0.12]"
                />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#050e28]/90 via-[#0c1f4a]/85 to-[#050e28]/95 pointer-events-none" />

            {/* Animated orbs */}
            <motion.div style={{ y: orbY }} className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/3 w-80 h-80 bg-primary/15 rounded-full blur-[120px]"
                    style={{ animation: 'orbFloat1 20s ease-in-out infinite' }} />
                <div className="absolute bottom-0 right-1/4 w-60 h-60 bg-accent/10 rounded-full blur-[100px]"
                    style={{ animation: 'orbFloat2 25s ease-in-out infinite 3s' }} />
            </motion.div>

            {/* Grid dots */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
                    backgroundSize: '28px 28px',
                }} />

            <div className="container-empire relative z-10">
                <SectionTitle
                    label="Client Stories"
                    title="What Our Clients Say?"
                    subtitle="Real experiences from businesses we've helped — overcoming challenges, navigating complex corridors, and delivering cargo safely without damage, every time."
                    light
                />
                <motion.div
                    className="text-center mb-6"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <Button variant="glass" icon={<FaArrowRight />} onClick={() => window.location.href = '/projects'}>
                        Read Case Studies
                    </Button>
                </motion.div>
            </div>

            {/* Marquee carousel — glass cards */}
            <div className="marquee-container relative z-10 mt-4">
                <div className="marquee-track">
                    {doubled.map((t, i) => (
                        <div key={`${t.id}-${i}`} className="w-[350px] flex-shrink-0">
                            <TestimonialCard testimonial={t} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
