import React from 'react';
import { motion } from 'framer-motion';

export default function ContactHero() {
    return (
        <section className="relative min-h-[60vh] flex items-center bg-dark-navy overflow-hidden -mt-20 pt-20">
            <div className="absolute inset-0 bg-gradient-to-br from-dark-navy via-[#0a1535] to-primary/30" />
            <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-accent/15 rounded-full blur-[120px]" />
            <div className="container-empire relative z-10 py-20">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
                    <span className="inline-block font-accent text-xs uppercase tracking-[1.5px] text-orange-300 font-medium mb-4 px-4 py-1.5 rounded-pill bg-white/10 border border-white/20">Get In Touch</span>
                    <h1 className="font-display text-display-mobile md:text-[72px] text-white mb-5">
                        LET&apos;S TALK<br /><span className="gradient-text-orange">LOGISTICS</span>
                    </h1>
                    <p className="text-gray-300 text-lg max-w-2xl leading-relaxed">
                        Ready to simplify your cross-border trade? Reach out for a free consultation and quote.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
