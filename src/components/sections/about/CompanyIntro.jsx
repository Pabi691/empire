import React from 'react';
import ScrollReveal from '../../ui/ScrollReveal';
import { FaBuilding, FaCertificate, FaMapMarkerAlt } from 'react-icons/fa';

export default function CompanyIntro() {
    return (
        <section className="section-padding bg-white">
            <div className="container-empire">
                <div className="grid lg:grid-cols-2 gap-14 items-center">
                    <ScrollReveal direction="left">
                        <span className="inline-block font-accent text-xs uppercase tracking-[1.5px] text-accent font-medium mb-3">Who We Are</span>
                        <h2 className="font-heading font-extrabold text-h2-mobile md:text-h2 text-text-primary mb-5">
                            A Kolkata-Based <span className="gradient-text-blue">Global Force</span> in Logistics
                        </h2>
                        <p className="text-text-muted text-body leading-relaxed mb-5">
                            Empire Logistics was founded with a singular vision: to simplify cross-border trade for businesses
                            in South Asia and beyond. Headquartered in the historic B.B.D. Bagh district of Kolkata, we leverage
                            our strategic location near India's eastern ports to connect businesses across six countries.
                        </p>
                        <p className="text-text-muted text-body leading-relaxed mb-8">
                            As an MTO-licensed freight forwarder, we bring deep expertise in ocean freight, air cargo, customs
                            clearance, warehousing, and multi-modal transport. Our team combines industry knowledge with
                            technology-driven processes to deliver reliable, transparent, and cost-effective logistics solutions.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {[
                                { icon: <FaCertificate />, label: 'MTO License', value: 'DGS/4022' },
                                { icon: <FaBuilding />, label: 'MSME', value: 'UDYAM Certified' },
                                { icon: <FaMapMarkerAlt />, label: 'Headquarters', value: 'Kolkata, India' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 rounded-general bg-soft-gray">
                                    <div className="text-accent">{item.icon}</div>
                                    <div>
                                        <div className="text-[10px] uppercase tracking-wider text-text-muted font-accent">{item.label}</div>
                                        <div className="text-sm font-bold text-text-primary">{item.value}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollReveal>
                    <ScrollReveal direction="right">
                        <div className="relative">
                            <div className="aspect-square rounded-card overflow-hidden shadow-hover relative">
                                <img
                                    src="/team-office.png"
                                    alt="Empire Logistics Team"
                                    className="w-full h-full object-cover"
                                />
                                {/* Brand overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-transparent" />
                                {/* Floating stat card */}
                                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/50">
                                    <div className="font-display text-2xl text-primary font-bold">6+</div>
                                    <div className="text-xs text-text-muted font-accent uppercase tracking-wider">Countries Served</div>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}
