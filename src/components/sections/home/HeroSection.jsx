import React, { useRef, useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import Button from '../../ui/Button';
import {
    FaArrowRight, FaPlay, FaShip, FaPlane, FaWarehouse, FaTruck,
    FaChevronLeft, FaChevronRight, FaStar, FaGlobeAsia
} from 'react-icons/fa';

/* ═══════════════ SLIDE DATA ═══════════════ */
const slides = [
    {
        id: 0,
        image: '/petrapole.png',
        icon: FaGlobeAsia,
        tagline: 'Cross-Border Logistics',
        headline: ['CROSSING', 'BORDERS,', 'CREATING PATHWAYS'],
        description: 'Technology-driven freight solutions connecting India with Nepal, Bhutan and Malaysia. Serving 23 States and 5 Union Territories — with speed and precision.',
        accentWord: 2,
        stat: { value: '23', label: 'States Covered' },
    },
    {
        id: 1,
        image: '/carousel-shipping.png',
        icon: FaShip,
        tagline: 'Sea Freight Excellence',
        headline: ['SHIP', 'GLOBALLY', 'WITH EMPIRE'],
        description: 'End-to-end ocean freight solutions connecting India to Bangladesh, Nepal, Bhutan, Malaysia & UAE with unmatched reliability.',
        accentWord: 1,
        stat: { value: '5,000+', label: 'Shipments' },
    },
    {
        id: 2,
        image: '/carousel-airfreight.png',
        icon: FaPlane,
        tagline: 'Air Cargo Solutions',
        headline: ['FLY YOUR', 'CARGO', 'WORLDWIDE'],
        description: 'Express air freight forwarding with customs clearance, DG shipping licensed operations across 6 countries.',
        accentWord: 1,
        stat: { value: '48hr', label: 'Express' },
    },
    {
        id: 3,
        image: '/carousel-warehouse.png',
        icon: FaWarehouse,
        tagline: 'Warehousing & Distribution',
        headline: ['STORE', 'MANAGE', 'DISTRIBUTE'],
        description: 'State-of-the-art warehousing facilities with inventory management, fulfillment & cross-docking services.',
        accentWord: 0,
        stat: { value: '50K+', label: 'Sq. Ft.' },
    },
    {
        id: 4,
        image: '/carousel-trucking.png',
        icon: FaTruck,
        tagline: 'Land Transportation',
        headline: ['MOVE', 'FREIGHT', 'SEAMLESSLY'],
        description: 'LTL & FTL trucking, container transport, and railway cargo across cross-border corridors with real-time tracking.',
        accentWord: 1,
        stat: { value: '6', label: 'Countries' },
    },
];

/* ═══════════════ ANIMATION VARIANTS ═══════════════ */
const wordVariants = {
    hidden: { opacity: 0, y: 80, rotateX: -45, filter: 'blur(8px)' },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        rotateX: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.8, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] },
    }),
    exit: (i) => ({
        opacity: 0,
        y: -50,
        rotateX: 20,
        filter: 'blur(4px)',
        transition: { duration: 0.4, delay: i * 0.04, ease: [0.7, 0, 0.84, 0] },
    }),
};

const AUTOPLAY_DELAY = 6000;

/* ═══════════════ INTERACTIVE PARTICLES with Canvas ═══════════════ */
function HeroParticles() {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const animFrameRef = useRef(null);
    const particlesRef = useRef([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let w, h;

        const resize = () => {
            w = canvas.parentElement.offsetWidth;
            h = canvas.parentElement.offsetHeight;
            canvas.width = w;
            canvas.height = h;
            // Reinit particles
            particlesRef.current = Array.from({ length: 40 }, () => ({
                x: Math.random() * w,
                y: Math.random() * h,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                r: Math.random() * 2 + 0.5,
                opacity: Math.random() * 0.4 + 0.1,
            }));
        };
        resize();
        window.addEventListener('resize', resize);

        const handleMouse = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        };
        canvas.parentElement.addEventListener('mousemove', handleMouse);

        const draw = () => {
            ctx.clearRect(0, 0, w, h);
            const mx = mouseRef.current.x;
            const my = mouseRef.current.y;
            const pts = particlesRef.current;

            for (let i = 0; i < pts.length; i++) {
                const p = pts[i];
                // Gentle mouse repel
                const dx = p.x - mx;
                const dy = p.y - my;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150 && dist > 0) {
                    const force = (150 - dist) / 150 * 0.015;
                    p.vx += (dx / dist) * force;
                    p.vy += (dy / dist) * force;
                }

                p.vx *= 0.99;
                p.vy *= 0.99;
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0) p.x = w;
                if (p.x > w) p.x = 0;
                if (p.y < 0) p.y = h;
                if (p.y > h) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(240,111,31,${p.opacity})`;
                ctx.fill();

                // Connect nearby
                for (let j = i + 1; j < pts.length; j++) {
                    const p2 = pts[j];
                    const d = Math.hypot(p.x - p2.x, p.y - p2.y);
                    if (d < 100) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(74,127,255,${0.06 * (1 - d / 100)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
            animFrameRef.current = requestAnimationFrame(draw);
        };
        draw();

        return () => {
            window.removeEventListener('resize', resize);
            canvas.parentElement?.removeEventListener('mousemove', handleMouse);
            cancelAnimationFrame(animFrameRef.current);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 z-[3] pointer-events-none" />;
}

/* ═══════════════ MAIN COMPONENT ═══════════════ */
export default function HeroSection() {
    const swiperRef = useRef(null);
    const sectionRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const progressInterval = useRef(null);

    const currentSlide = slides[activeIndex];

    /* Mouse parallax for background images */
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { stiffness: 50, damping: 30 });
    const springY = useSpring(mouseY, { stiffness: 50, damping: 30 });
    const bgX = useTransform(springX, [0, 1], [-15, 15]);
    const bgY = useTransform(springY, [0, 1], [-10, 10]);

    useEffect(() => {
        const handleMouse = (e) => {
            if (sectionRef.current) {
                const rect = sectionRef.current.getBoundingClientRect();
                mouseX.set((e.clientX - rect.left) / rect.width);
                mouseY.set((e.clientY - rect.top) / rect.height);
            }
        };
        window.addEventListener('mousemove', handleMouse);
        return () => window.removeEventListener('mousemove', handleMouse);
    }, [mouseX, mouseY]);

    /* Progress bar animation */
    const startProgress = useCallback(() => {
        setProgress(0);
        clearInterval(progressInterval.current);
        const tick = 30;
        let elapsed = 0;
        progressInterval.current = setInterval(() => {
            elapsed += tick;
            setProgress(Math.min((elapsed / AUTOPLAY_DELAY) * 100, 100));
            if (elapsed >= AUTOPLAY_DELAY) clearInterval(progressInterval.current);
        }, tick);
    }, []);

    useEffect(() => {
        startProgress();
        return () => clearInterval(progressInterval.current);
    }, [activeIndex, startProgress]);

    const handleSlideChange = (swiper) => setActiveIndex(swiper.realIndex);
    const goNext = () => swiperRef.current?.slideNext();
    const goPrev = () => swiperRef.current?.slidePrev();

    return (
        <section
            ref={sectionRef}
            id="hero-banner"
            className="relative min-h-screen flex items-center overflow-hidden bg-dark-navy -mt-20 pt-20"
        >
            {/* ─── Background Carousel with Mouse Parallax ─── */}
            <div className="absolute inset-0 z-0">
                <Swiper
                    modules={[Autoplay, EffectFade]}
                    effect="fade"
                    fadeEffect={{ crossFade: true }}
                    speed={1400}
                    autoplay={{ delay: AUTOPLAY_DELAY, disableOnInteraction: false }}
                    loop
                    allowTouchMove={false}
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    onSlideChange={handleSlideChange}
                    className="h-full w-full"
                    style={{ position: 'absolute', inset: 0 }}
                >
                    {slides.map((slide, idx) => (
                        <SwiperSlide key={slide.id} className="relative">
                            <motion.div
                                className="absolute inset-[-20px]"
                                style={{
                                    backgroundImage: `url(${slide.image})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    x: bgX,
                                    y: bgY,
                                }}
                            >
                                {/* Ken Burns zoom */}
                                <div
                                    className="absolute inset-0 transition-transform duration-[10000ms] ease-linear"
                                    style={{
                                        backgroundImage: `url(${slide.image})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        transform: activeIndex === idx ? 'scale(1.12)' : 'scale(1)',
                                        opacity: 0, /* overlay hidden, main bg visible */
                                    }}
                                />
                            </motion.div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Lighter overlays — images more visible */}
                <div className="absolute inset-0 z-[1]" style={{
                    background: 'linear-gradient(105deg, rgba(10,15,30,0.88) 0%, rgba(10,15,30,0.65) 40%, rgba(10,15,30,0.30) 70%, rgba(10,15,30,0.15) 100%)'
                }} />
                <div className="absolute inset-0 z-[1]" style={{
                    background: 'linear-gradient(180deg, rgba(10,15,30,0.4) 0%, transparent 30%, transparent 70%, rgba(10,15,30,0.7) 100%)'
                }} />
                {/* Accent glow orbs */}
                <div className="absolute top-[-200px] right-[-100px] w-[700px] h-[700px] rounded-full z-[1] opacity-30"
                    style={{ background: 'radial-gradient(circle, rgba(12,50,142,0.5) 0%, transparent 70%)' }} />
                <div className="absolute bottom-[-150px] left-[-100px] w-[500px] h-[500px] rounded-full z-[1] opacity-20"
                    style={{ background: 'radial-gradient(circle, rgba(240,111,31,0.4) 0%, transparent 70%)' }} />
            </div>

            {/* Subtle grid pattern */}
            <div className="absolute inset-0 z-[2] opacity-[0.025]" style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                backgroundSize: '80px 80px',
            }} />

            {/* Interactive particles canvas */}
            <HeroParticles />

            {/* ─── Main Content ─── */}
            <div className="container-empire relative z-10 py-20 lg:py-0">
                <div className="grid lg:grid-cols-[1fr_320px] gap-8 lg:gap-16 items-center min-h-[calc(100vh-80px)]">

                    {/* LEFT — Text Content */}
                    <div className="max-w-[680px]">
                        <AnimatePresence mode="wait">
                            <motion.div key={`content-${activeIndex}`}>
                                {/* Service badge */}
                                <motion.div
                                    initial={{ opacity: 0, x: -30, filter: 'blur(6px)' }}
                                    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                                    exit={{ opacity: 0, x: 20, filter: 'blur(4px)' }}
                                    transition={{ duration: 0.5, delay: 0.05 }}
                                    className="mb-8"
                                >
                                    <span className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-pill border text-xs uppercase tracking-[2px] font-accent"
                                        style={{
                                            background: 'linear-gradient(135deg, rgba(240,111,31,0.12), rgba(255,255,255,0.04))',
                                            borderColor: 'rgba(240,111,31,0.25)',
                                            color: '#f5a623',
                                            boxShadow: '0 0 20px rgba(240,111,31,0.08)',
                                        }}
                                    >
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inset-0 rounded-full bg-accent opacity-75" />
                                            <span className="relative rounded-full h-2 w-2 bg-accent" />
                                        </span>
                                        {currentSlide.tagline}
                                    </span>
                                </motion.div>

                                {/* Headline with 3D perspective */}
                                <h1 className="font-display text-display-mobile md:text-[76px] lg:text-[92px] text-white leading-[0.9] mb-7"
                                    style={{ perspective: '800px' }}
                                >
                                    {currentSlide.headline.map((word, i) => (
                                        <motion.span
                                            key={`word-${activeIndex}-${i}`}
                                            className="block"
                                            custom={i}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                            variants={wordVariants}
                                            style={{ transformOrigin: 'left center' }}
                                        >
                                            {i === currentSlide.accentWord ? (
                                                <span style={{
                                                    background: 'linear-gradient(135deg, #f06f1f 0%, #f5a623 50%, #ff8c42 100%)',
                                                    WebkitBackgroundClip: 'text',
                                                    WebkitTextFillColor: 'transparent',
                                                    backgroundClip: 'text',
                                                    filter: 'drop-shadow(0 0 30px rgba(240,111,31,0.3))',
                                                }}>
                                                    {word}
                                                </span>
                                            ) : word}
                                        </motion.span>
                                    ))}
                                </h1>

                                {/* Description with animated underline */}
                                <motion.p
                                    initial={{ opacity: 0, y: 25, filter: 'blur(4px)' }}
                                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                    exit={{ opacity: 0, y: -15 }}
                                    transition={{ duration: 0.6, delay: 0.5 }}
                                    className="text-white/60 text-lg md:text-xl max-w-[520px] mb-10 leading-relaxed font-body"
                                >
                                    {currentSlide.description}
                                </motion.p>

                                {/* CTA Row */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5, delay: 0.65 }}
                                    className="flex flex-wrap items-center gap-4"
                                >
                                    <Button variant="primary" icon={<FaArrowRight />} onClick={() => window.location.href = '/contact'}>
                                        Get a Free Quote
                                    </Button>
                                    <Button variant="glass" icon={<FaPlay />} onClick={() => window.location.href = '/services'}>
                                        Our Services
                                    </Button>

                                    {/* Inline stat chip */}
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.9, type: 'spring' }}
                                        className="hidden md:flex items-center gap-3 ml-2 px-5 py-3 rounded-2xl"
                                        style={{
                                            background: 'rgba(255,255,255,0.04)',
                                            border: '1px solid rgba(255,255,255,0.08)',
                                            backdropFilter: 'blur(12px)',
                                        }}
                                    >
                                        <div className="text-right">
                                            <div className="text-white font-display text-2xl leading-none">{currentSlide.stat.value}</div>
                                            <div className="text-white/40 text-[10px] font-accent uppercase tracking-wider">{currentSlide.stat.label}</div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Trust Row */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.4 }}
                            className="mt-12 flex items-center gap-5"
                        >
                            {[
                                { icon: FaStar, value: '5.0', label: 'Google Rated', color: '#f5a623' },
                                { icon: FaGlobeAsia, value: '6+', label: 'Countries', color: '#4a7fff' },
                            ].map((badge, i) => (
                                <div key={i} className="flex items-center gap-2.5">
                                    <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                                        style={{
                                            background: `${badge.color}15`,
                                            border: `1px solid ${badge.color}25`,
                                        }}
                                    >
                                        <badge.icon style={{ color: badge.color, fontSize: 13 }} />
                                    </div>
                                    <div>
                                        <div className="text-white font-heading font-bold text-sm leading-none">{badge.value}</div>
                                        <div className="text-white/35 text-[10px] font-accent uppercase tracking-wider">{badge.label}</div>
                                    </div>
                                    {i < 1 && <div className="w-px h-8 bg-white/10 ml-3" />}
                                </div>
                            ))}
                            <div className="h-6 px-3 rounded-pill flex items-center text-[10px] font-accent uppercase tracking-wider text-white/30"
                                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                            >
                                MSME Certified
                            </div>
                        </motion.div>
                    </div>

                    {/* RIGHT — Modern Carousel Navigator */}
                    <div className="hidden lg:flex flex-col items-stretch gap-3">
                        {/* Slide cards */}
                        {slides.map((slide, idx) => {
                            const Icon = slide.icon;
                            const isActive = idx === activeIndex;
                            return (
                                <motion.button
                                    key={slide.id}
                                    onClick={() => swiperRef.current?.slideToLoop(idx)}
                                    className="relative text-left cursor-pointer overflow-hidden"
                                    animate={{
                                        scale: isActive ? 1 : 0.97,
                                        opacity: isActive ? 1 : 0.6,
                                    }}
                                    whileHover={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.4 }}
                                    style={{
                                        borderRadius: 16,
                                        padding: '16px 20px',
                                        background: isActive
                                            ? 'linear-gradient(135deg, rgba(240,111,31,0.12), rgba(255,255,255,0.06))'
                                            : 'rgba(255,255,255,0.02)',
                                        border: isActive
                                            ? '1px solid rgba(240,111,31,0.35)'
                                            : '1px solid rgba(255,255,255,0.06)',
                                        backdropFilter: 'blur(16px)',
                                        boxShadow: isActive ? '0 8px 32px rgba(240,111,31,0.12)' : 'none',
                                    }}
                                >
                                    <div className="flex items-center gap-3.5">
                                        {/* Icon with glow */}
                                        <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-500"
                                            style={{
                                                background: isActive
                                                    ? 'linear-gradient(135deg, rgba(240,111,31,0.25), rgba(240,111,31,0.1))'
                                                    : 'rgba(255,255,255,0.04)',
                                                border: isActive
                                                    ? '1px solid rgba(240,111,31,0.3)'
                                                    : '1px solid rgba(255,255,255,0.06)',
                                                boxShadow: isActive ? '0 0 20px rgba(240,111,31,0.15)' : 'none',
                                            }}
                                        >
                                            <Icon size={16} style={{
                                                color: isActive ? '#f5a623' : 'rgba(255,255,255,0.3)',
                                                transition: 'color 0.4s',
                                            }} />
                                        </div>
                                        {/* Text */}
                                        <div className="flex-1 min-w-0">
                                            <div className="text-[10px] font-accent uppercase tracking-[2px] mb-0.5"
                                                style={{ color: isActive ? '#f5a623' : 'rgba(255,255,255,0.25)' }}
                                            >
                                                {String(idx + 1).padStart(2, '0')}
                                            </div>
                                            <div className="text-sm font-heading font-semibold truncate"
                                                style={{ color: isActive ? '#fff' : 'rgba(255,255,255,0.45)' }}
                                            >
                                                {slide.tagline}
                                            </div>
                                        </div>
                                        {/* Active arrow */}
                                        <motion.div
                                            animate={{ x: isActive ? 0 : -5, opacity: isActive ? 1 : 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <FaChevronRight size={10} style={{ color: '#f5a623' }} />
                                        </motion.div>
                                    </div>
                                    {/* Progress bar */}
                                    {isActive && (
                                        <div className="mt-3 h-[2px] rounded-full overflow-hidden"
                                            style={{ background: 'rgba(255,255,255,0.06)' }}
                                        >
                                            <motion.div
                                                className="h-full rounded-full"
                                                style={{
                                                    width: `${progress}%`,
                                                    background: 'linear-gradient(90deg, #f06f1f, #f5a623)',
                                                    transition: 'width 30ms linear',
                                                }}
                                            />
                                        </div>
                                    )}
                                </motion.button>
                            );
                        })}

                        {/* Nav arrows */}
                        <div className="flex gap-2.5 mt-2 justify-center">
                            {[
                                { fn: goPrev, icon: FaChevronLeft },
                                { fn: goNext, icon: FaChevronRight },
                            ].map((btn, i) => (
                                <motion.button
                                    key={i}
                                    onClick={btn.fn}
                                    whileHover={{ scale: 1.08, borderColor: 'rgba(240,111,31,0.4)' }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-11 h-11 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300"
                                    style={{
                                        background: 'rgba(255,255,255,0.03)',
                                        border: '1px solid rgba(255,255,255,0.08)',
                                        backdropFilter: 'blur(12px)',
                                        color: 'rgba(255,255,255,0.5)',
                                    }}
                                    aria-label={i === 0 ? 'Previous slide' : 'Next slide'}
                                >
                                    <btn.icon size={12} />
                                </motion.button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Mobile dots */}
                <div className="flex lg:hidden justify-center gap-2 mt-8">
                    {slides.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => swiperRef.current?.slideToLoop(idx)}
                            className="relative h-1 rounded-full transition-all duration-500 cursor-pointer"
                            style={{
                                width: idx === activeIndex ? 40 : 16,
                                background: idx === activeIndex
                                    ? 'linear-gradient(90deg, #f06f1f, #f5a623)'
                                    : 'rgba(255,255,255,0.15)',
                            }}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>

            {/* ─── Scroll Indicator ─── */}
            <motion.div
                className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
            >
                <span className="text-white/20 text-[9px] font-accent uppercase tracking-[3px]">Scroll</span>
                <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
                    <div className="w-5 h-8 rounded-pill border border-white/15 flex justify-center pt-2">
                        <motion.div
                            className="w-0.5 h-1.5 rounded-full"
                            style={{ background: 'linear-gradient(180deg, #f06f1f, transparent)' }}
                            animate={{ y: [0, 5, 0], opacity: [0.8, 0.2, 0.8] }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                        />
                    </div>
                </motion.div>
            </motion.div>

            {/* Decorative bottom gradient edge */}
            <div className="absolute bottom-0 left-0 right-0 h-32 z-[4] pointer-events-none"
                style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(10,15,30,1) 100%)' }}
            />
        </section>
    );
}
