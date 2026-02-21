import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../../ui/SectionTitle';
import { FaHeart, FaLightbulb, FaUsers, FaShieldAlt, FaRocket, FaLeaf } from 'react-icons/fa';

const values = [
    { icon: <FaShieldAlt />, title: 'Integrity', desc: 'Transparent operations and honest pricing in every transaction.' },
    { icon: <FaRocket />, title: 'Excellence', desc: 'Relentless pursuit of operational perfection and service quality.' },
    { icon: <FaUsers />, title: 'Client First', desc: 'Every decision driven by what\'s best for our clients\' success.' },
    { icon: <FaLightbulb />, title: 'Innovation', desc: 'Technology-driven solutions for modern supply chain challenges.' },
    { icon: <FaHeart />, title: 'Passion', desc: 'Deep love for logistics and enabling seamless global trade.' },
    { icon: <FaLeaf />, title: 'Sustainability', desc: 'Committed to environmentally responsible logistics practices.' },
];

export default function CoreValues() {
    return (
        <section className="section-padding bg-soft-gray">
            <div className="container-empire">
                <SectionTitle
                    label="What Drives Us"
                    title="Our Core Values"
                    subtitle="The principles that guide every shipment, every decision, and every client relationship."
                />
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                    {values.map((val, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.08 }}
                            className="bg-white rounded-card p-7 text-center shadow-standard hover:shadow-hover border border-border-soft hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center text-white text-xl mx-auto mb-4">
                                {val.icon}
                            </div>
                            <h4 className="font-heading font-bold text-base text-text-primary mb-2">{val.title}</h4>
                            <p className="text-text-muted text-sm">{val.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
