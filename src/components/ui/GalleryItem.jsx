import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExpand, FaTimes, FaTag } from 'react-icons/fa';

const categoryColors = {
    Operations: { gradient: 'linear-gradient(135deg, #0c328e, #1a4fbd)', accent: '#0c328e' },
    Fleet: { gradient: 'linear-gradient(135deg, #f06f1f, #f5a623)', accent: '#f06f1f' },
    Infrastructure: { gradient: 'linear-gradient(135deg, #0a2870, #0c328e)', accent: '#1a4fbd' },
    Team: { gradient: 'linear-gradient(135deg, #c2410c, #f06f1f)', accent: '#f06f1f' },
};

export default function GalleryItem({ item, index = 0 }) {
    const [expanded, setExpanded] = useState(false);
    const [imgError, setImgError] = useState(false);
    const colors = categoryColors[item.category] || categoryColors.Operations;

    return (
        <>
            {/* === GRID TILE === */}
            <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6 }}
                className="group relative rounded-card overflow-hidden cursor-pointer aspect-[4/3] shadow-standard hover:shadow-hover transition-shadow duration-300"
                onClick={() => setExpanded(true)}
            >
                {/* Real photo or gradient fallback */}
                {item.image && !imgError ? (
                    <img
                        src={item.image}
                        alt={item.title}
                        onError={() => setImgError(true)}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                ) : (
                    <div
                        className="absolute inset-0"
                        style={{ background: colors.gradient }}
                    />
                )}

                {/* Dark gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Category badge top-left */}
                <div
                    className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-accent uppercase tracking-wider text-white"
                    style={{
                        background: 'rgba(255,255,255,0.12)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.20)',
                    }}
                >
                    <FaTag className="text-[8px] opacity-80" />
                    {item.category}
                </div>

                {/* Expand icon — top right */}
                <div
                    className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full text-white opacity-0 group-hover:opacity-100 transition-all duration-300"
                    style={{
                        background: 'rgba(255,255,255,0.15)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.25)',
                    }}
                >
                    <FaExpand className="text-xs" />
                </div>

                {/* Title at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                    <h4 className="font-heading font-bold text-sm text-white leading-snug">{item.title}</h4>
                    <p className="text-white/55 text-xs mt-0.5 leading-snug line-clamp-1">{item.description}</p>
                </div>

                {/* Bottom accent line */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-[3px] scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left"
                    style={{ background: colors.gradient }}
                />
            </motion.div>

            {/* === LIGHTBOX === */}
            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        style={{ background: 'rgba(5,14,40,0.92)', backdropFilter: 'blur(12px)' }}
                        onClick={() => setExpanded(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.85, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.85, opacity: 0, y: 20 }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            className="relative max-w-2xl w-full rounded-2xl overflow-hidden"
                            style={{
                                background: 'rgba(255,255,255,0.05)',
                                backdropFilter: 'blur(24px)',
                                border: '1px solid rgba(255,255,255,0.12)',
                                boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close button */}
                            <button
                                className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full text-white transition-all hover:bg-white/20"
                                style={{ background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.20)' }}
                                onClick={() => setExpanded(false)}
                            >
                                <FaTimes className="text-sm" />
                            </button>

                            {/* Lightbox image */}
                            <div className="aspect-video w-full overflow-hidden">
                                {item.image && !imgError ? (
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center" style={{ background: colors.gradient }}>
                                        <span className="text-white/30 text-6xl font-display">{item.category[0]}</span>
                                    </div>
                                )}
                            </div>

                            {/* Lightbox info */}
                            <div className="p-6">
                                <span
                                    className="inline-block text-[11px] uppercase tracking-widest font-accent mb-2 px-3 py-1 rounded-full"
                                    style={{ background: `${colors.accent}22`, color: colors.accent, border: `1px solid ${colors.accent}44` }}
                                >
                                    {item.category}
                                </span>
                                <h3 className="font-heading font-bold text-xl text-white mt-1 mb-2">{item.title}</h3>
                                <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
