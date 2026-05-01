import React from 'react';
import { motion } from 'framer-motion';
import useServices from '../../../hooks/useServices';
import { FaShip, FaPlane, FaTruck, FaWarehouse, FaTrain, FaFileAlt, FaBoxes, FaGlobeAmericas, FaCheckCircle, FaArrowRight } from 'react-icons/fa';
import Button from '../../ui/Button';

const iconMap = { FaShip, FaPlane, FaTruck, FaWarehouse, FaTrain, FaFileAlt, FaBoxes, FaGlobeAmericas };

/* Map each service id to its generated image */
const serviceImages = {
    'freight-forwarding': '/svc-freight-forwarding.png',
    'custom-clearance': '/svc-custom-clearance.jpeg',
    'air-freight': '/svc-air-freight.png',
    'nvocc': '/svc-nvocc.png',
    'warehousing': '/svc-warehousing.png',
    'railway-cargo': '/svc-railway-cargo.png',
    'ltl-ftl': '/svc-ltl-ftl.png',
    'container-transport': '/svc-container-transport.png',
};

export default function ServiceDetail() {
    const { services } = useServices();
    return (
        <section className="section-padding bg-white">
            <div className="container-empire space-y-24">
                {services.map((service, i) => {
                    const Icon = iconMap[service.icon] || FaShip;
                    const isEven = i % 2 === 0;
                    const img = serviceImages[service.id];
                    const accentColor = service.color === '#f06f1f' ? '#f06f1f' : '#0c328e';
                    const gradientStyle = service.color === '#f06f1f'
                        ? 'linear-gradient(135deg, #f06f1f, #f5a623)'
                        : 'linear-gradient(135deg, #0c328e, #1a4fbd)';

                    return (
                        <motion.div
                            key={service.id}
                            id={service.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className={`grid lg:grid-cols-2 gap-12 items-center`}
                        >
                            {/* Content — alternates left/right */}
                            {isEven ? (
                                <>
                                    <ServiceContent service={service} Icon={Icon} gradientStyle={gradientStyle} />
                                    <ServiceImage service={service} img={img} gradientStyle={gradientStyle} accentColor={accentColor} Icon={Icon} />
                                </>
                            ) : (
                                <>
                                    <ServiceImage service={service} img={img} gradientStyle={gradientStyle} accentColor={accentColor} Icon={Icon} />
                                    <ServiceContent service={service} Icon={Icon} gradientStyle={gradientStyle} />
                                </>
                            )}
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}

function ServiceContent({ service, Icon, gradientStyle }) {
    return (
        <div>
            <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-3xl mb-5 shadow-lg"
                style={{ background: gradientStyle }}
            >
                <Icon />
            </div>
            <h3 className="font-heading font-extrabold text-h3-mobile md:text-h3 text-text-primary mb-3">
                {service.title}
            </h3>
            <p className="text-text-muted text-body leading-relaxed mb-6">{service.fullDesc}</p>
            <div className="grid grid-cols-2 gap-3 mb-8">
                {service.features.map((feat, fi) => (
                    <div key={fi} className="flex items-center gap-2 text-sm">
                        <FaCheckCircle className="text-accent flex-shrink-0 text-xs" />
                        <span className="text-text-primary font-medium">{feat}</span>
                    </div>
                ))}
            </div>
            <Button variant="outline" icon={<FaArrowRight />} onClick={() => window.location.href = '/contact'}>
                Get a Quote
            </Button>
        </div>
    );
}

function ServiceImage({ service, img, gradientStyle, accentColor, Icon }) {
    return (
        <div className="relative group">
            <div className="aspect-[4/3] rounded-card overflow-hidden shadow-hover relative">
                {img ? (
                    <>
                        <img
                            src={img}
                            alt={service.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* Brand gradient overlay at bottom */}
                        <div
                            className="absolute inset-0"
                            style={{
                                background: `linear-gradient(to top, ${accentColor}cc 0%, ${accentColor}33 40%, transparent 70%)`,
                            }}
                        />
                        {/* Service title badge */}
                        <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                            <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg flex-shrink-0"
                                style={{ background: gradientStyle }}
                            >
                                <Icon />
                            </div>
                            <div>
                                <div className="text-white font-heading font-bold text-sm">{service.title}</div>
                                <div className="text-white/70 text-xs">{service.shortDesc}</div>
                            </div>
                        </div>
                    </>
                ) : (
                    /* Fallback: gradient + icon if image missing */
                    <div className="w-full h-full flex items-center justify-center" style={{ background: gradientStyle }}>
                        <Icon className="text-white/30 text-8xl" />
                    </div>
                )}
            </div>
            {/* Feature count badge */}
            <div
                className="absolute -top-4 -right-4 w-16 h-16 rounded-full flex flex-col items-center justify-center text-white shadow-lg text-center"
                style={{ background: gradientStyle }}
            >
                <span className="font-display text-xl leading-none">{service.features.length}</span>
                <span className="text-[9px] font-accent uppercase tracking-wider leading-tight">Features</span>
            </div>
        </div>
    );
}
