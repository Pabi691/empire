import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../../ui/SectionTitle';
import { FaFileAlt, FaClock, FaRoute, FaHeadset, FaCertificate, FaChartLine, FaCheckCircle } from 'react-icons/fa';

const reasons = [
    { icon: <FaRoute />, title: 'Extensive Cross-Border Network', desc: 'Our extensive cross-border logistics network across India, Bangladesh, Nepal, Bhutan, and Malaysia makes your shipment reach its destination efficiently, backed by reliable cross-border coordination.' },
    { icon: <FaFileAlt />, title: 'TP Shipments Expertise', desc: 'Our expertise in TP Shipments, Land-Air & Sea-Air Movements, and Re-Exports ensures that your cargo moves seamlessly, without delays or permit hassles.' },
    { icon: <FaClock />, title: 'Real-Time Cargo Tracking', desc: 'End-to-end real-time cargo tracking across every stage of transit.', showProgress: true },
    { icon: <FaCertificate />, title: 'Dedicated Customs Handling', desc: 'In-house team of Dedicated Customs Handling ensuring full compliance and swift clearance at every border.' },
    { icon: <FaChartLine />, title: 'Tech-Driven Supply Chain', desc: 'Adaptive & tech-driven logistics solutions for the unique needs of diverse industries, with streamlined warehousing and distribution.' },
    { icon: <FaHeadset />, title: '24/7 Multilingual Support', desc: '24/7 Customer Support with multilingual coordination — always available when your shipment needs us most.' },
];

const stats = [
    { value: '5,000+', label: 'Shipments Handled' },
    { value: '99.2%', label: 'On-Time Rate' },
    { value: '6', label: 'Countries' },
    { value: '200+', label: 'Happy Clients' },
];

/* Small circular progress ring for 99.2% */
function ProgressRing() {
    const circumference = 2 * Math.PI * 18;
    const offset = circumference - (99.2 / 100) * circumference;
    return (
        <div className="inline-flex items-center gap-2 mt-2">
            <svg width="44" height="44" viewBox="0 0 44 44" className="transform -rotate-90">
                <circle cx="22" cy="22" r="18" fill="none" stroke="rgba(12,50,142,0.1)" strokeWidth="3" />
                <motion.circle
                    cx="22" cy="22" r="18"
                    fill="none"
                    stroke="url(#progressGrad)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    whileInView={{ strokeDashoffset: offset }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                />
                <defs>
                    <linearGradient id="progressGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#f06f1f" />
                        <stop offset="100%" stopColor="#f5a623" />
                    </linearGradient>
                </defs>
            </svg>
            <span className="text-xs font-accent font-bold text-accent">99.2%</span>
        </div>
    );
}

export default function WhyChooseUs() {
    return (
        <section className="section-padding bg-white bg-dotgrid relative">
            <div className="container-empire relative z-10">
                <SectionTitle
                    label="Why Empire"
                    title="Why Choose Us"
                    subtitle="Industry-leading credentials, unmatched service, and a relentless focus on making your trade experience seamless."
                />

                {/* Two-column layout: left = feature tiles, right = real image + stats */}
                <div className="grid lg:grid-cols-5 gap-10 items-center">

                    {/* Left: feature grid */}
                    <div className="lg:col-span-3 grid sm:grid-cols-2 gap-5">
                        {reasons.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.08 }}
                                className="group flex gap-4 p-5 rounded-card bg-soft-gray hover:bg-white hover:shadow-standard border border-transparent hover:border-border-soft transition-all duration-300"
                            >
                                <motion.div
                                    className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center text-white text-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.1 + i * 0.08 }}
                                >
                                    {item.icon}
                                </motion.div>
                                <div>
                                    <h4 className="font-heading font-bold text-sm text-text-primary mb-1">{item.title}</h4>
                                    <p className="text-text-muted text-xs leading-relaxed">{item.desc}</p>
                                    {item.showProgress && <ProgressRing />}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Right: real image + floating stats */}
                    <motion.div
                        className="lg:col-span-2 relative"
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {/* Main image */}
                        <div className="relative rounded-card overflow-hidden shadow-hover aspect-[3/4]">
                            <img
                                src="/about-warehouse.png"
                                alt="Empire Logistics Operations"
                                className="w-full h-full object-cover"
                            />
                            {/* Navy overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />

                            {/* Stats overlaid on image */}
                            <div className="absolute bottom-0 left-0 right-0 p-5 grid grid-cols-2 gap-3">
                                {stats.map((s, i) => (
                                    <div key={i} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3 text-center">
                                        <div className="font-display text-xl text-white font-bold">{s.value}</div>
                                        <div className="text-white/70 text-[10px] font-accent uppercase tracking-wider">{s.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Floating "MTO Licensed" badge */}
                        <motion.div
                            className="absolute -top-5 -left-5 bg-white rounded-xl px-4 py-3 shadow-hover border border-border-soft"
                            animate={{ y: [0, -6, 0] }}
                            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                        >
                            <div className="flex items-center gap-2">
                                <FaCheckCircle className="text-accent text-lg" />
                                <div>
                                    <div className="font-accent text-xs uppercase tracking-wider text-text-muted">Certified</div>
                                    <div className="font-heading font-bold text-sm text-text-primary">MTO Licensed</div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
