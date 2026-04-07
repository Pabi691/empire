import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SectionTitle from '../../ui/SectionTitle';
import ServiceCard from '../../ui/ServiceCard';
import Button from '../../ui/Button';
import useServices from '../../../hooks/useServices';
import { FaArrowRight } from 'react-icons/fa';

export default function ServicesSnapshot() {
    const { services } = useServices();
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
    const bgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

    return (
        <section ref={ref} className="section-padding relative overflow-hidden">
            {/* Parallax background */}
            <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
                <img
                    src="/svc-warehousing.png"
                    alt=""
                    aria-hidden="true"
                    className="w-full h-full object-cover opacity-[0.08]"
                />
            </motion.div>

            {/* Light gradient over parallax */}
            <div className="absolute inset-0 bg-gradient-to-b from-soft-gray via-[#f2f4fb] to-soft-gray pointer-events-none" />

            {/* Dot grid */}
            <div className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle, rgba(12,50,142,0.05) 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                }} />

            {/* Floating orbs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/04 rounded-full blur-[120px] pointer-events-none" style={{ animation: 'orbFloat1 22s ease-in-out infinite' }} />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/04 rounded-full blur-[100px] pointer-events-none" style={{ animation: 'orbFloat2 26s ease-in-out infinite 3s' }} />

            <div className="container-empire relative z-10">
                <SectionTitle
                    label="What We Offer"
                    title="Our Core Services"
                    subtitle="From freight forwarding to customs clearance — end-to-end logistics solutions designed for cross-border excellence."
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.slice(0, 8).map((service, i) => (
                        <ServiceCard key={service.id} service={service} index={i} />
                    ))}
                </div>
                <motion.div
                    className="text-center mt-10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <Button variant="outline" icon={<FaArrowRight />} onClick={() => window.location.href = '/services'}>
                        View All Services
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}
