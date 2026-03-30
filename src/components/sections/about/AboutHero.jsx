import React from 'react';
import { motion } from 'framer-motion';

export default function AboutHero() {
    return (
        <section className="relative min-h-[60vh] flex items-center bg-dark-navy overflow-hidden -mt-20 pt-20">
            {/* Real air freight background image */}
            <img
                src="/air-freight.png"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover object-center opacity-25"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-dark-navy via-[#0a1535] to-primary/30" />
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/15 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent/10 rounded-full blur-[100px]" />
            <div className="container-empire relative z-10 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl"
                >
                    <span className="inline-block font-accent text-xs uppercase tracking-[1.5px] text-orange-300 font-medium mb-4 px-4 py-1.5 rounded-pill bg-white/10 border border-white/20">
                        About Empire Logistics
                    </span>
                    <h1 className="font-display text-display-mobile md:text-[72px] text-white mb-5">
                        BUILT ON TRUST.<br />
                        <span className="gradient-text-orange">DRIVEN BY TRADE.</span>
                    </h1>
                    <p className="text-gray-300 text-lg max-w-2xl leading-relaxed">
                        From Kolkata to the world — we're on a mission to make cross-border trade simple, reliable, and accessible for businesses of every size.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
