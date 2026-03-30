import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../../ui/SectionTitle';
import countries from '../../../data/countries';

/* Country flag + photo card */
function CountryCard({ country, index }) {
    /* Map country codes to real images we have or can use */
    const countryImages = {
        IN: '/svc-freight-forwarding.png',  /* Port — India has major seaports */
        BD: '/svc-railway-cargo.png',        /* Rail — Bangladesh land trade */
        NP: '/svc-ltl-ftl.png',             /* Road — Nepal mountain trucking */
        BT: '/svc-ltl-ftl.png',             /* Road — Bhutan mountain routes */
        MY: '/svc-nvocc.png',               /* Port — Malaysia container hub */
        AE: '/cargo-ship.png',              /* Port — UAE shipping hub */
    };
    const img = countryImages[country.code];

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="group relative rounded-card overflow-hidden shadow-standard hover:shadow-hover border border-border-soft hover:-translate-y-2 transition-all duration-400 cursor-pointer"
        >
            {/* Country photo */}
            <div className="aspect-[4/3] relative overflow-hidden">
                <img
                    src={img}
                    alt={country.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" />

                {/* Flag emoji on top */}
                <div
                    className="absolute top-3 right-3 text-3xl transition-transform duration-300 group-hover:scale-125"
                    onMouseEnter={(e) => e.currentTarget.style.animation = 'flagWave 0.6s ease-in-out'}
                    onMouseLeave={(e) => e.currentTarget.style.animation = 'none'}
                >
                    {country.flag}
                </div>
            </div>

            {/* Info */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
                <h4 className="font-heading font-bold text-base text-white mb-0.5">{country.name}</h4>
                <p className="text-white/70 text-xs leading-snug">{country.description}</p>
            </div>
        </motion.div>
    );
}

export default function CountriesWeServe() {
    return (
        <section className="section-padding bg-soft-gray relative overflow-hidden">
            {/* Background animated route lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-[0.06]" preserveAspectRatio="xMidYMid slice">
                <line x1="10%" y1="40%" x2="30%" y2="35%" stroke="#0c328e" strokeWidth="1" strokeDasharray="4 6">
                    <animate attributeName="stroke-dashoffset" values="20;0" dur="3s" repeatCount="indefinite" />
                </line>
                <line x1="30%" y1="35%" x2="50%" y2="50%" stroke="#f06f1f" strokeWidth="1" strokeDasharray="4 6">
                    <animate attributeName="stroke-dashoffset" values="20;0" dur="3.5s" repeatCount="indefinite" />
                </line>
                <line x1="50%" y1="50%" x2="70%" y2="38%" stroke="#0c328e" strokeWidth="1" strokeDasharray="4 6">
                    <animate attributeName="stroke-dashoffset" values="20;0" dur="4s" repeatCount="indefinite" />
                </line>
                <line x1="70%" y1="38%" x2="90%" y2="55%" stroke="#f06f1f" strokeWidth="1" strokeDasharray="4 6">
                    <animate attributeName="stroke-dashoffset" values="20;0" dur="3.2s" repeatCount="indefinite" />
                </line>
            </svg>

            <div className="container-empire relative z-10">
                <SectionTitle
                    label="Global Reach"
                    title="Countries We Serve"
                    subtitle="Strategic presence across key trade corridors in South and Southeast Asia, plus the Middle East."
                />

                {/* 6 country image cards */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
                    {countries.map((country, i) => (
                        <CountryCard key={country.code} country={country} index={i} />
                    ))}
                </div>

                {/* Bottom trust bar */}
                <motion.div
                    className="mt-12 flex flex-wrap justify-center gap-8 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    {[
                        { num: '6+', label: 'Countries Served' },
                        { num: '15+', label: 'Trade Corridors' },
                        { num: '50+', label: 'Port Connections' },
                        { num: '100%', label: 'Customs Compliant' },
                    ].map((item, i) => (
                        <div key={i} className="flex flex-col items-center">
                            <span className="font-display text-3xl font-bold text-primary">{item.num}</span>
                            <span className="text-text-muted text-xs font-accent uppercase tracking-wider mt-1">{item.label}</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
