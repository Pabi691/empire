import React from 'react';
import { motion } from 'framer-motion';
import Button from '../../ui/Button';
import { FaArrowRight, FaPhone } from 'react-icons/fa';

/* Inline SVG cargo ship */
function CargoShipSVG() {
    return (
        <svg className="cargo-ship-bg" viewBox="0 0 60 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 22 L12 22 L15 15 L45 15 L48 22 L55 22 L52 28 L8 28 Z" fill="rgba(255,255,255,0.12)" />
            <rect x="20" y="8" width="8" height="7" rx="1" fill="rgba(255,255,255,0.08)" />
            <rect x="30" y="10" width="6" height="5" rx="1" fill="rgba(255,255,255,0.08)" />
            <rect x="38" y="11" width="5" height="4" rx="1" fill="rgba(255,255,255,0.06)" />
            <path d="M15 15 L18 8 L20 8 L20 15" fill="rgba(255,255,255,0.1)" />
        </svg>
    );
}

export default function HomeCTA() {
    return (
        <section className="relative py-24 overflow-hidden">
            {/* Real cargo ship background photo */}
            <img
                src="/cargo-ship.png"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover object-center opacity-30"
            />
            {/* Animated gradient shift overlay */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'linear-gradient(270deg, rgba(12,50,142,0.92), rgba(14,58,158,0.88), rgba(10,40,112,0.95), rgba(12,50,142,0.92))',
                    backgroundSize: '400% 400%',
                    animation: 'gradientShift 12s ease infinite',
                }}
            />
            <div className="absolute inset-0">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[150px]" />
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-300/15 rounded-full blur-[120px]" />
            </div>
            <div
                className="absolute inset-0 opacity-[0.05]"
                style={{
                    backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                    backgroundSize: '30px 30px',
                }}
            />

            {/* Animated cargo ship */}
            <CargoShipSVG />

            <div className="container-empire relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="inline-block font-accent text-xs uppercase tracking-[1.5px] text-orange-300 font-medium mb-4 px-4 py-1.5 rounded-pill bg-white/10 border border-white/20">
                        Ready to Ship?
                    </span>
                    <h2 className="font-heading font-extrabold text-h2-mobile md:text-[48px] text-white mb-5 max-w-3xl mx-auto">
                        Let&apos;s Move Your Cargo <span className="gradient-text-orange">Across Borders</span>
                    </h2>
                    <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-8">
                        Get a free quote within 24 hours. Our expert team is ready to handle your shipment
                        with the care and precision it deserves.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        {/* Pulsing glow CTA */}
                        <div className="relative">
                            <div
                                className="absolute inset-0 rounded-pill pointer-events-none"
                                style={{ animation: 'pulseGlow 2.5s ease-in-out infinite' }}
                            />
                            <Button variant="primary" icon={<FaArrowRight />} onClick={() => window.location.href = '/contact'}>
                                Get a Free Quote
                            </Button>
                        </div>
                        <Button variant="glass" icon={<FaPhone />} href="tel:+918420442975">
                            Call +91 84204 42975
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
