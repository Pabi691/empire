import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionTitle from '../../ui/SectionTitle';
import GalleryItem from '../../ui/GalleryItem';
import gallery from '../../../data/gallery';

const categories = ['All', 'Operations', 'Fleet', 'Infrastructure', 'Team'];

const categoryAccent = {
    All: { bg: '#0c328e', label: 'All Photos' },
    Operations: { bg: '#0c328e', label: 'Operations' },
    Fleet: { bg: '#f06f1f', label: 'Fleet' },
    Infrastructure: { bg: '#1a4fbd', label: 'Infrastructure' },
    Team: { bg: '#c2410c', label: 'Team' },
};

export default function GalleryGrid() {
    const [active, setActive] = useState('All');

    const filtered = active === 'All'
        ? gallery
        : gallery.filter((g) => g.category === active);

    return (
        <section className="section-padding bg-white relative">
            {/* Subtle dot grid */}
            <div className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle, rgba(12,50,142,0.04) 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                }} />

            <div className="container-empire relative z-10">
                <SectionTitle
                    label="Visual Portfolio"
                    title="Operations in Action"
                    subtitle="Behind the scenes of our logistics operations — from ports to warehouses to border crossings."
                />

                {/* Category filter tabs */}
                <div className="flex flex-wrap justify-center gap-3 mb-10">
                    {categories.map((cat) => {
                        const isActive = active === cat;
                        const count = cat === 'All' ? gallery.length : gallery.filter((g) => g.category === cat).length;
                        return (
                            <motion.button
                                key={cat}
                                onClick={() => setActive(cat)}
                                whileTap={{ scale: 0.95 }}
                                className="relative flex items-center gap-2 px-5 py-2.5 rounded-full font-accent text-xs uppercase tracking-wider transition-all duration-300 border"
                                style={{
                                    background: isActive ? categoryAccent[cat].bg : 'transparent',
                                    color: isActive ? '#fff' : '#6b7280',
                                    borderColor: isActive ? categoryAccent[cat].bg : 'rgba(12,50,142,0.15)',
                                    boxShadow: isActive ? `0 4px 20px ${categoryAccent[cat].bg}44` : 'none',
                                }}
                            >
                                {cat}
                                <span
                                    className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold leading-none"
                                    style={{
                                        background: isActive ? 'rgba(255,255,255,0.25)' : 'rgba(12,50,142,0.08)',
                                        color: isActive ? '#fff' : '#6b7280',
                                    }}
                                >
                                    {count}
                                </span>
                            </motion.button>
                        );
                    })}
                </div>

                {/* Masonry-style gallery grid */}
                <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <AnimatePresence>
                        {filtered.map((item, i) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.35 }}
                            >
                                <GalleryItem item={item} index={i} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Count bar */}
                <motion.p
                    className="text-center text-text-muted text-sm font-accent mt-8"
                    key={active}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    Showing <strong className="text-primary">{filtered.length}</strong> of <strong>{gallery.length}</strong> photos
                </motion.p>
            </div>
        </section>
    );
}
