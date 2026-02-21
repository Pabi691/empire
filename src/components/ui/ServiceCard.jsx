import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaShip, FaPlane, FaTruck, FaWarehouse, FaTrain, FaFileAlt, FaBoxes, FaGlobeAmericas } from 'react-icons/fa';

const iconMap = {
    FaShip, FaPlane, FaTruck, FaWarehouse, FaTrain, FaFileAlt, FaBoxes, FaGlobeAmericas,
};

/* Map service id to the real image we generated */
const serviceImages = {
    'freight-forwarding': '/svc-freight-forwarding.png',
    'custom-clearance': '/svc-custom-clearance.png',
    'air-freight': '/svc-air-freight.png',
    'nvocc': '/svc-nvocc.png',
    'warehousing': '/svc-warehousing.png',
    'railway-cargo': '/svc-railway-cargo.png',
    'ltl-ftl': '/svc-ltl-ftl.png',
    'container-transport': '/svc-container-transport.png',
};

export default function ServiceCard({ service, index = 0 }) {
    const IconComponent = iconMap[service.icon] || FaShip;
    const img = serviceImages[service.id];
    const gradientStyle = service.color === '#f06f1f'
        ? 'linear-gradient(135deg, #f06f1f, #f5a623)'
        : 'linear-gradient(135deg, #0c328e, #1a4fbd)';

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
            <Link
                to={`/services#${service.id}`}
                className="service-card-shimmer group block bg-white rounded-card shadow-standard hover:shadow-hover transition-all duration-300 hover:-translate-y-2 border border-border-soft hover:border-accent/30 relative overflow-hidden"
            >
                {/* Top image section */}
                {img && (
                    <div className="relative h-44 overflow-hidden">
                        <img
                            src={img}
                            alt={service.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        {/* Brand gradient overlay */}
                        <div
                            className="absolute inset-0"
                            style={{
                                background: service.color === '#f06f1f'
                                    ? 'linear-gradient(to top, rgba(240,111,31,0.75) 0%, rgba(240,111,31,0.1) 50%, transparent 100%)'
                                    : 'linear-gradient(to top, rgba(12,50,142,0.75) 0%, rgba(12,50,142,0.1) 50%, transparent 100%)',
                            }}
                        />
                        {/* Icon badge top-left */}
                        <div
                            className="absolute top-3 left-3 w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg shadow-lg"
                            style={{ background: gradientStyle }}
                        >
                            <IconComponent />
                        </div>
                    </div>
                )}

                {/* Accent top line (for cards without images) */}
                {!img && (
                    <div
                        className="absolute top-0 left-0 w-full h-1 transition-all duration-500 origin-left scale-x-0 group-hover:scale-x-100"
                        style={{ background: service.color === '#f06f1f' ? 'var(--gradient-ora)' : 'var(--gradient-blue)' }}
                    />
                )}

                {/* Content */}
                <div className="p-6">
                    {/* Icon for cards without image */}
                    {!img && (
                        <div
                            className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl text-white mb-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
                            style={{ background: gradientStyle }}
                        >
                            <IconComponent />
                        </div>
                    )}

                    <h3 className="font-heading font-bold text-lg text-text-primary mb-2">
                        {service.title}
                    </h3>

                    <p className="text-text-muted text-sm leading-relaxed mb-4">
                        {service.shortDesc}
                    </p>

                    <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                        Learn More <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                </div>
            </Link>
        </motion.div>
    );
}
