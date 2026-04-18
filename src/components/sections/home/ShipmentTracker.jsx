import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaBoxOpen, FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa';

export default function ShipmentTracker() {
    const [trackingId, setTrackingId] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleTrack = (e) => {
        e.preventDefault();
        if (trackingId.trim()) setSubmitted(true);
    };

    return (
        <section className="section-padding bg-white relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle, rgba(12,50,142,0.04) 1px, transparent 1px)',
                    backgroundSize: '28px 28px',
                }} />
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/[0.03] rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/[0.03] rounded-full blur-[100px] pointer-events-none" />

            <div className="container-empire relative z-10">
                <div className="max-w-2xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block font-accent text-xs uppercase tracking-[1.5px] text-accent font-medium mb-3">
                            Live Tracking
                        </span>
                        <h2 className="font-heading font-extrabold text-h2-mobile md:text-h2 text-text-primary mb-3">
                            Track Your Shipment
                        </h2>
                        <p className="text-text-muted text-body leading-relaxed mb-8">
                            Enter your tracking ID to monitor your cargo across all touchpoints — from pickup to final delivery.
                        </p>

                        <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-3">
                            <div className="relative flex-1">
                                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted text-sm" />
                                <input
                                    type="text"
                                    value={trackingId}
                                    onChange={(e) => { setTrackingId(e.target.value); setSubmitted(false); }}
                                    placeholder="Enter Tracking ID (e.g. EMP-2025-XXXXX)"
                                    className="w-full pl-11 pr-4 py-3.5 rounded-pill border border-border-soft bg-soft-gray text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                />
                            </div>
                            <button
                                type="submit"
                                className="px-7 py-3.5 rounded-pill bg-primary text-white font-heading font-bold text-sm hover:bg-primary/90 transition-all duration-200 flex-shrink-0"
                            >
                                Track Now
                            </button>
                        </form>

                        {submitted && (
                            <motion.div
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                                className="mt-6 p-5 rounded-card bg-soft-gray border border-border-soft text-left"
                            >
                                <p className="text-text-muted text-sm text-center">
                                    No shipment found for <span className="font-semibold text-text-primary">"{trackingId}"</span>.
                                    Please check your tracking ID or{' '}
                                    <a href="/contact" className="text-primary underline underline-offset-2">contact our support team</a>.
                                </p>
                            </motion.div>
                        )}

                        {/* Touchpoints visual */}
                        <div className="mt-10 flex items-center justify-center gap-2 flex-wrap">
                            {['Pickup', 'In Transit', 'Border Clearance', 'Last Mile', 'Delivered'].map((step, i, arr) => (
                                <React.Fragment key={i}>
                                    <div className="flex flex-col items-center gap-1">
                                        <div className="w-9 h-9 rounded-full bg-soft-gray border border-border-soft flex items-center justify-center text-text-muted">
                                            {i === 0 ? <FaBoxOpen className="text-xs" /> :
                                             i === arr.length - 1 ? <FaCheckCircle className="text-xs" /> :
                                             <FaMapMarkerAlt className="text-xs" />}
                                        </div>
                                        <span className="text-[10px] text-text-muted font-accent uppercase tracking-wide">{step}</span>
                                    </div>
                                    {i < arr.length - 1 && (
                                        <div className="w-6 h-px bg-border-soft mb-4" />
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
