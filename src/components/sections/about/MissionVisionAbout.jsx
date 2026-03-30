import React from 'react';
import { motion } from 'framer-motion';
import { FaBullseye, FaEye } from 'react-icons/fa';

export default function MissionVisionAbout() {
    return (
        <section className="section-padding bg-dark-navy relative overflow-hidden">
            <div className="absolute inset-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/15 rounded-full blur-[200px]" />
            </div>
            <div className="container-empire relative z-10">
                <div className="grid md:grid-cols-2 gap-8">
                    {[
                        { icon: <FaBullseye />, title: 'Our Mission', content: 'To simplify cross-border trade by providing reliable, transparent, and technology-driven freight forwarding solutions that empower businesses to expand globally without operational bottlenecks.', gradient: 'from-primary to-blue-400' },
                        { icon: <FaEye />, title: 'Our Vision', content: 'To be the most trusted logistics partner in South Asia, recognized for operational excellence, innovation in supply chain management, and an unwavering commitment to client success and sustainable trade practices.', gradient: 'from-accent to-amber-400' },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.15 }}
                            className="bg-white/5 backdrop-blur-sm rounded-card p-10 border border-white/10"
                        >
                            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white text-3xl mb-6`}>
                                {item.icon}
                            </div>
                            <h3 className="font-heading font-bold text-2xl text-white mb-4">{item.title}</h3>
                            <p className="text-gray-400 leading-relaxed">{item.content}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
