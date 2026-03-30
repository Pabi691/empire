import React from 'react';
import { motion } from 'framer-motion';

export default function TimelineItem({ milestone, index = 0, isLast = false }) {
    const isLeft = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-center mb-12 last:mb-0"
        >
            {/* Desktop layout */}
            <div className="hidden md:grid md:grid-cols-[1fr_60px_1fr] w-full items-center">
                {/* Left content */}
                <div className={`${isLeft ? 'text-right pr-8' : ''}`}>
                    {isLeft && (
                        <div className="bg-white rounded-card p-6 shadow-standard border border-border-soft inline-block text-left hover:shadow-hover transition-shadow duration-300">
                            <span className="font-display text-2xl text-accent">{milestone.year}</span>
                            <h4 className="font-heading font-bold text-lg text-text-primary mt-1">{milestone.title}</h4>
                            <p className="text-text-muted text-sm mt-2">{milestone.description}</p>
                        </div>
                    )}
                </div>

                {/* Center dot + line — node pops in */}
                <div className="flex flex-col items-center relative">
                    <motion.div
                        className="w-4 h-4 rounded-full bg-gradient-to-r from-primary to-accent z-10 ring-4 ring-white shadow-lg"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: 'spring', stiffness: 400, damping: 15, delay: index * 0.1 + 0.2 }}
                    />
                    {/* Drawing line */}
                    {!isLast && (
                        <motion.div
                            className="w-0.5 bg-gradient-to-b from-primary/30 to-accent/30 absolute top-4"
                            initial={{ height: 0 }}
                            whileInView={{ height: '100%' }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.1 + 0.3, ease: [0.16, 1, 0.3, 1] }}
                        />
                    )}
                </div>

                {/* Right content */}
                <div className={`${!isLeft ? 'pl-8' : ''}`}>
                    {!isLeft && (
                        <div className="bg-white rounded-card p-6 shadow-standard border border-border-soft inline-block text-left hover:shadow-hover transition-shadow duration-300">
                            <span className="font-display text-2xl text-accent">{milestone.year}</span>
                            <h4 className="font-heading font-bold text-lg text-text-primary mt-1">{milestone.title}</h4>
                            <p className="text-text-muted text-sm mt-2">{milestone.description}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile layout */}
            <div className="md:hidden flex gap-4 w-full">
                <div className="flex flex-col items-center">
                    <motion.div
                        className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-accent z-10 ring-2 ring-white shadow-lg mt-2"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: 'spring', stiffness: 400, damping: 15, delay: index * 0.1 }}
                    />
                    {!isLast && (
                        <motion.div
                            className="w-0.5 flex-1 bg-gradient-to-b from-primary/30 to-accent/30"
                            initial={{ scaleY: 0 }}
                            whileInView={{ scaleY: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                            style={{ transformOrigin: 'top' }}
                        />
                    )}
                </div>
                <div className="bg-white rounded-card p-5 shadow-standard border border-border-soft flex-1 mb-2 hover:shadow-hover transition-shadow duration-300">
                    <span className="font-display text-xl text-accent">{milestone.year}</span>
                    <h4 className="font-heading font-bold text-base text-text-primary mt-1">{milestone.title}</h4>
                    <p className="text-text-muted text-sm mt-1">{milestone.description}</p>
                </div>
            </div>
        </motion.div>
    );
}
