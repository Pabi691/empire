import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import SectionTitle from '../../ui/SectionTitle';
import {
    FaCalculator, FaBox, FaCubes, FaRulerCombined,
    FaExchangeAlt, FaWeightHanging, FaShippingFast,
    FaGlobeAsia, FaTruckMoving, FaWarehouse, FaCheckCircle,
    FaFileInvoiceDollar
} from 'react-icons/fa';

const UNIT_OPTIONS = [
    { value: 'mm', label: 'mm' },
    { value: 'cm', label: 'cm' },
    { value: 'inch', label: 'inch' },
    { value: 'feet', label: 'feet' },
];

const TO_FEET = {
    mm: 1 / 304.8,
    cm: 1 / 30.48,
    inch: 1 / 12,
    feet: 1,
};

/* ============================================================
   Animated Particle Canvas Background
   ============================================================ */
function ParticleCanvas() {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);
    const particlesRef = useRef([]);

    const initParticles = useCallback((width, height) => {
        const particles = [];
        const count = Math.min(60, Math.floor((width * height) / 15000));
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                radius: Math.random() * 2 + 0.5,
                opacity: Math.random() * 0.3 + 0.1,
                hue: Math.random() > 0.5 ? 220 : 25,
            });
        }
        return particles;
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let width, height;

        const resize = () => {
            width = canvas.parentElement.offsetWidth;
            height = canvas.parentElement.offsetHeight;
            canvas.width = width;
            canvas.height = height;
            particlesRef.current = initParticles(width, height);
        };

        resize();
        window.addEventListener('resize', resize);

        const draw = () => {
            ctx.clearRect(0, 0, width, height);
            const particles = particlesRef.current;

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${p.hue}, 70%, 55%, ${p.opacity})`;
                ctx.fill();

                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `hsla(220, 60%, 55%, ${0.08 * (1 - dist / 120)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
            animationRef.current = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener('resize', resize);
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, [initParticles]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen"
            style={{ width: '100%', height: '100%' }}
        />
    );
}

/* ============================================================
   Animated 3D Cube — Light outlines for dark background
   ============================================================ */
function AnimatedCube({ size = 160 }) {
    const [rotation, setRotation] = useState({ x: -25, y: 35 });

    useEffect(() => {
        let frame;
        let angle = 0;
        const animate = () => {
            angle += 0.35;
            setRotation({
                x: -20 + Math.sin(angle * 0.012) * 10,
                y: 30 + angle * 0.25,
            });
            frame = requestAnimationFrame(animate);
        };
        frame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frame);
    }, []);

    const half = size / 2;

    const faceStyle = (color, opacity) => ({
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: '12px',
        border: `2px solid`,
        borderColor: color,
        backgroundColor: `rgba(255,255,255, ${opacity})`,
        backdropFilter: 'blur(6px)',
    });

    return (
        <div className="relative" style={{ width: size, height: size, perspective: '800px' }}>
            <div
                className="absolute rounded-full blur-[60px] animate-pulse"
                style={{
                    width: size * 1.2,
                    height: size * 1.2,
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: 'radial-gradient(circle, rgba(59,130,246,0.3) 0%, rgba(240,111,31,0.2) 50%, transparent 70%)',
                }}
            />
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    transformStyle: 'preserve-3d',
                    transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                }}
            >
                {/* Front */}
                <div style={{ ...faceStyle('rgba(59,130,246,0.5)', 0.1), transform: `translateZ(${half}px)` }}>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-blue-300 font-accent text-sm font-bold tracking-wider">L × B</span>
                    </div>
                </div>
                {/* Back */}
                <div style={{ ...faceStyle('rgba(59,130,246,0.3)', 0.05), transform: `rotateY(180deg) translateZ(${half}px)` }} />
                {/* Right */}
                <div style={{ ...faceStyle('rgba(240,111,31,0.5)', 0.1), transform: `rotateY(90deg) translateZ(${half}px)` }}>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-orange-300 font-accent text-sm font-bold">H</span>
                    </div>
                </div>
                {/* Left */}
                <div style={{ ...faceStyle('rgba(240,111,31,0.3)', 0.05), transform: `rotateY(-90deg) translateZ(${half}px)` }} />
                {/* Top */}
                <div style={{ ...faceStyle('rgba(255,255,255,0.4)', 0.15), transform: `rotateX(90deg) translateZ(${half}px)` }}>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <FaBox className="text-white/40 text-[32px]" />
                    </div>
                </div>
                {/* Bottom */}
                <div style={{ ...faceStyle('rgba(255,255,255,0.2)', 0.05), transform: `rotateX(-90deg) translateZ(${half}px)` }} />
            </div>
        </div>
    );
}

function MeasurementLines() {
    return (
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 300 300">
            <motion.line
                x1="40" y1="230" x2="260" y2="230"
                stroke="rgba(59,130,246,0.5)" strokeWidth="1.5" strokeDasharray="4 4"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.5, ease: 'easeInOut' }}
            />
            <motion.text x="150" y="248" textAnchor="middle" className="fill-blue-300/60 text-[10px] font-accent"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>Length</motion.text>

            <motion.line
                x1="270" y1="40" x2="270" y2="220"
                stroke="rgba(240,111,31,0.5)" strokeWidth="1.5" strokeDasharray="4 4"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 1, ease: 'easeInOut' }}
            />
            <motion.text x="283" y="135" textAnchor="middle" className="fill-orange-300/60 text-[10px] font-accent"
                style={{ writingMode: 'vertical-rl' }}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}>Height</motion.text>
        </svg>
    );
}

/* ============================================================
   Floating Icon Particles (Light mode for dark bg)
   ============================================================ */
function FloatingParticle({ icon: Icon, delay, x, y, size = 'text-lg' }) {
    return (
        <motion.div
            className={`absolute ${size} text-white/10`}
            style={{ left: x, top: y }}
            animate={{
                y: [0, -20, 0, 15, 0],
                x: [0, 8, -8, 5, 0],
                opacity: [0.1, 0.3, 0.1],
                rotate: [0, 12, -12, 0],
            }}
            transition={{ duration: 8, delay, repeat: Infinity, ease: 'easeInOut' }}
        >
            <Icon />
        </motion.div>
    );
}

/* ============================================================
   Left Panel — 3D Animation + Features (Dark Theme Compatible)
   ============================================================ */
function CalculatorInfo() {
    const features = [
        { icon: FaRulerCombined, title: 'Dimension-Based CFT', desc: 'Enter L × B × H in any unit — instant cubic feet conversion.' },
        { icon: FaWeightHanging, title: 'Charged Weight', desc: 'Calculate freight charged weight using CFT-to-Kg rate.' },
        { icon: FaExchangeAlt, title: 'CBM ↔ CFT Conversion', desc: 'Seamlessly convert between Cubic Meters and Cubic Feet.' },
        { icon: FaCubes, title: 'Multi-Package Support', desc: 'Multiply by package count for total shipment volume.' },
    ];

    return (
        <div className="h-full flex flex-col justify-between relative rounded-card bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl p-6 md:p-8">
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-card">
                <FloatingParticle icon={FaBox} delay={0} x="8%" y="5%" size="text-3xl" />
                <FloatingParticle icon={FaTruckMoving} delay={1.2} x="80%" y="3%" size="text-2xl" />
                <FloatingParticle icon={FaGlobeAsia} delay={2.5} x="85%" y="55%" size="text-3xl" />
                <FloatingParticle icon={FaWarehouse} delay={3.5} x="3%" y="65%" size="text-2xl" />
                <FloatingParticle icon={FaShippingFast} delay={4.5} x="55%" y="80%" size="text-xl" />
                <FloatingParticle icon={FaCalculator} delay={2} x="70%" y="30%" size="text-xl" />
            </div>

            <div className="relative z-10 flex flex-col h-full">
                <motion.div
                    className="flex justify-center items-center py-6 flex-shrink-0 relative"
                    initial={{ opacity: 0, scale: 0.7 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className="relative" style={{ width: 300, height: 300 }}>
                        <MeasurementLines />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <AnimatedCube size={150} />
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="mx-auto mb-6 px-5 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 shadow-sm"
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.5 }}
                >
                    <p className="text-center font-accent text-sm text-gray-200">
                        <span className="text-blue-300 font-bold">CFT</span>
                        <span className="text-gray-400 mx-1.5">=</span>
                        <span className="text-orange-300 font-semibold">Length</span>
                        <span className="text-gray-400 mx-1"> × </span>
                        <span className="text-orange-300 font-semibold">Breadth</span>
                        <span className="text-gray-400 mx-1"> × </span>
                        <span className="text-orange-300 font-semibold">Height</span>
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 gap-3 flex-1 mb-4">
                    {features.map((feat, i) => (
                        <motion.div
                            key={i}
                            className="p-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 shadow-sm hover:bg-white/10 transition-all duration-300 group"
                            initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                            whileHover={{ y: -3 }}
                        >
                            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center mb-2.5 group-hover:bg-white/20 transition-all duration-300">
                                <feat.icon className="text-blue-300 text-sm" />
                            </div>
                            <h4 className="font-heading font-bold text-white text-sm mb-1">{feat.title}</h4>
                            <p className="text-gray-400 text-xs leading-relaxed">{feat.desc}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className="p-3 rounded-xl bg-gradient-to-r from-blue-500/10 to-orange-500/10 border border-white/5"
                    initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.8 }}
                >
                    <div className="grid grid-cols-2 gap-1 text-xs text-gray-400 font-accent">
                        <span><FaCheckCircle className="inline text-orange-400/60 mr-1" />1 CBM = 35.3147 CFT</span>
                        <span><FaCheckCircle className="inline text-orange-400/60 mr-1" />1 ft = 304.8 mm</span>
                        <span><FaCheckCircle className="inline text-orange-400/60 mr-1" />1 ft = 30.48 cm</span>
                        <span><FaCheckCircle className="inline text-orange-400/60 mr-1" />1 ft = 12 inches</span>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

/* ============================================================
   Dimension Input Group
   ============================================================ */
function DimensionInput({ label, value, onChange, unit, onUnitChange }) {
    return (
        <div className="flex-1 min-w-0">
            <label className="block text-sm font-medium text-text-primary mb-1.5">{label}</label>
            <div className="flex items-stretch rounded-xl border border-gray-200 overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all bg-white">
                <input type="number" value={value} onChange={(e) => onChange(e.target.value)} placeholder="0" className="flex-1 min-w-0 px-3 py-2.5 text-sm text-text-primary bg-transparent focus:outline-none" />
                <select value={unit} onChange={(e) => onUnitChange(e.target.value)} className="w-[65px] bg-gray-50 border-l border-gray-200 px-1 py-2.5 text-sm text-text-primary focus:outline-none cursor-pointer appearance-none text-center font-medium">
                    {UNIT_OPTIONS.map(u => (<option key={u.value} value={u.value}>{u.label}</option>))}
                </select>
            </div>
        </div>
    );
}

/* ============================================================
   MAIN Component
   ============================================================ */
export default function CftCalculator() {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
    const bgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

    const [activeTab, setActiveTab] = useState('cft');

    // CFT State
    const [cftLength, setCftLength] = useState('');
    const [cftBreadth, setCftBreadth] = useState('');
    const [cftHeight, setCftHeight] = useState('');
    const [cftLengthUnit, setCftLengthUnit] = useState('mm');
    const [cftBreadthUnit, setCftBreadthUnit] = useState('mm');
    const [cftHeightUnit, setCftHeightUnit] = useState('mm');
    const [numPackages, setNumPackages] = useState('1');
    const [cftResult, setCftResult] = useState(null);

    // Charged Weight
    const [cftRate, setCftRate] = useState('');
    const [chargedWeightResult, setChargedWeightResult] = useState(null);

    // CBM State
    const [cbmValue, setCbmValue] = useState('');
    const [cbmPackages, setCbmPackages] = useState('1');
    const [cbmCftRate, setCbmCftRate] = useState('');
    const [cbmResult, setCbmResult] = useState(null);

    const calculateCFT = () => {
        const l = parseFloat(cftLength); const b = parseFloat(cftBreadth); const h = parseFloat(cftHeight); const pkgs = parseInt(numPackages) || 1;
        if (isNaN(l) || isNaN(b) || isNaN(h) || l <= 0 || b <= 0 || h <= 0) { setCftResult({ error: 'Please enter valid dimensions.' }); return; }
        const lFeet = l * TO_FEET[cftLengthUnit]; const bFeet = b * TO_FEET[cftBreadthUnit]; const hFeet = h * TO_FEET[cftHeightUnit];
        const cftPerPackage = lFeet * bFeet * hFeet; const totalCft = cftPerPackage * pkgs; const totalCbm = totalCft / 35.3147;
        setCftResult({ cftPerPackage: cftPerPackage.toFixed(4), totalCft: totalCft.toFixed(4), totalCbm: totalCbm.toFixed(4), packages: pkgs });
        setChargedWeightResult(null);
    };

    const calculateChargedWeight = () => {
        const rate = parseFloat(cftRate);
        if (!cftResult || cftResult.error) { setChargedWeightResult({ error: 'Please calculate CFT first.' }); return; }
        if (isNaN(rate) || rate <= 0) { setChargedWeightResult({ error: 'Please enter a valid rate.' }); return; }
        setChargedWeightResult({ chargedWeight: (parseFloat(cftResult.totalCft) * rate).toFixed(2), totalCft: cftResult.totalCft, rate: rate.toFixed(2) });
    };

    const calculateCBM = () => {
        const cbm = parseFloat(cbmValue); const pkgs = parseInt(cbmPackages) || 1; const rate = parseFloat(cbmCftRate);
        if (isNaN(cbm) || cbm <= 0) { setCbmResult({ error: 'Please enter a valid CBM value.' }); return; }
        const totalCftPerPkg = cbm * 35.3147; const totalCft = totalCftPerPkg * pkgs; const weight = !isNaN(rate) && rate > 0 ? totalCft * rate : null;
        setCbmResult({ cftPerPackage: totalCftPerPkg.toFixed(4), totalCft: totalCft.toFixed(4), totalCbm: (cbm * pkgs).toFixed(4), packages: pkgs, weight: weight ? weight.toFixed(2) : null });
    };

    const resetCFT = () => {
        setCftLength(''); setCftBreadth(''); setCftHeight('');
        setCftLengthUnit('mm'); setCftBreadthUnit('mm'); setCftHeightUnit('mm');
        setNumPackages('1'); setCftResult(null); setCftRate(''); setChargedWeightResult(null);
    };

    const resetCBM = () => { setCbmValue(''); setCbmPackages('1'); setCbmCftRate(''); setCbmResult(null); };

    return (
        <section ref={sectionRef} className="section-padding relative overflow-hidden bg-slate-900">
            {/* Background Image Parallax Layer */}
            <motion.div
                className="absolute inset-0 bg-[url('/cargo-bg.png')] bg-cover bg-center pointer-events-none"
                style={{ y: bgY }}
            />
            {/* Dark Overlays for amazing readability and image pop */}
            <div className="absolute inset-0 bg-slate-900/40 mix-blend-multiply pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/20 to-slate-900/90 pointer-events-none" />

            {/* Particle Canvas Overlay */}
            <ParticleCanvas />

            <div className="container-empire relative z-10">
                <SectionTitle
                    label="Logistics Tools"
                    title="Freight Calculator"
                    subtitle="Quickly calculate cubic feet (CFT), convert CBM, and determine freight charged weight for your shipments."
                    light={true}
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
                    {/* LEFT PANEL */}
                    <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
                        <CalculatorInfo />
                    </motion.div>

                    {/* RIGHT PANEL */}
                    <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}>
                        <div className="rounded-card bg-white/95 backdrop-blur-3xl shadow-[0_0_50px_rgba(0,0,0,0.3)] overflow-hidden h-full flex flex-col border border-white/20">
                            {/* Tabs */}
                            <div className="flex border-b border-gray-100 flex-shrink-0 bg-white shadow-sm z-10">
                                <button onClick={() => { setActiveTab('cft'); setCbmResult(null); }} className={`flex-1 flex items-center justify-center gap-2 py-5 px-4 text-sm font-heading font-bold tracking-wide transition-all relative ${activeTab === 'cft' ? 'text-primary' : 'text-text-muted hover:text-text-primary hover:bg-gray-50/50'}`}>
                                    <FaRulerCombined className="text-base" />
                                    CFT Calculator
                                    {activeTab === 'cft' && <motion.div layoutId="activeCalcTab" className="absolute bottom-[-1px] left-0 right-0 h-[3px] bg-primary rounded-t-sm" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />}
                                </button>
                                <button onClick={() => { setActiveTab('cbm'); setCftResult(null); setChargedWeightResult(null); }} className={`flex-1 flex items-center justify-center gap-2 py-5 px-4 text-sm font-heading font-bold tracking-wide transition-all relative ${activeTab === 'cbm' ? 'text-accent' : 'text-text-muted hover:text-text-primary hover:bg-gray-50/50'}`}>
                                    <FaExchangeAlt className="text-base" />
                                    CBM Calculator
                                    {activeTab === 'cbm' && <motion.div layoutId="activeCalcTab" className="absolute bottom-[-1px] left-0 right-0 h-[3px] bg-accent rounded-t-sm" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />}
                                </button>
                            </div>

                            {/* Content Area */}
                            <div className="flex-1 overflow-y-auto px-6 py-7">
                                <AnimatePresence mode="wait">
                                    {activeTab === 'cft' ? (
                                        <motion.div key="cft" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }} className="h-full flex flex-col">
                                            {/* CFT Content */}
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-6">
                                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-md">
                                                        <FaBox className="text-white text-sm" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-heading font-extrabold text-text-primary text-base">CFT Calculation</h3>
                                                        <p className="text-text-muted text-xs">Enter dimensions to calculate cubic feet</p>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-5">
                                                    <DimensionInput label="Length" value={cftLength} onChange={setCftLength} unit={cftLengthUnit} onUnitChange={setCftLengthUnit} />
                                                    <DimensionInput label="Breadth" value={cftBreadth} onChange={setCftBreadth} unit={cftBreadthUnit} onUnitChange={setCftBreadthUnit} />
                                                    <DimensionInput label="Height" value={cftHeight} onChange={setCftHeight} unit={cftHeightUnit} onUnitChange={setCftHeightUnit} />
                                                </div>

                                                <div className="mb-6">
                                                    <label className="block text-sm font-medium text-text-primary mb-1.5"><FaCubes className="inline mr-1.5 text-accent text-xs" />No. of Packages</label>
                                                    <input type="number" value={numPackages} onChange={(e) => setNumPackages(e.target.value)} min="1" placeholder="1" className="w-full sm:w-48 rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-text-primary bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                                                </div>

                                                <div className="flex gap-3 mb-6">
                                                    <button onClick={calculateCFT} className="flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-primary to-primary/90 text-white font-heading font-bold text-sm shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-0.5 transition-all">
                                                        <FaCalculator className="text-sm" />Calculate CFT
                                                    </button>
                                                    <button onClick={resetCFT} className="px-6 py-3 rounded-xl border border-gray-200 text-text-muted font-heading font-semibold text-sm hover:bg-gray-50 transition-all">Reset</button>
                                                </div>

                                                <AnimatePresence>
                                                    {cftResult && !cftResult.error && (
                                                        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mb-6">
                                                            <div className="p-5 rounded-xl bg-gradient-to-br from-primary/[0.04] to-accent/[0.03] border border-primary/10">
                                                                <h4 className="font-heading font-bold text-text-primary text-xs uppercase tracking-wider mb-3.5 flex items-center gap-2">
                                                                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />CFT Results
                                                                </h4>
                                                                <div className="grid grid-cols-3 gap-3">
                                                                    <ResultCard label="CFT / Pkg" value={cftResult.cftPerPackage} unit="ft³" color="primary" />
                                                                    <ResultCard label="Total CFT" value={cftResult.totalCft} unit="ft³" color="accent" />
                                                                    <ResultCard label="Total CBM" value={cftResult.totalCbm} unit="m³" color="primary" />
                                                                </div>
                                                                <p className="text-xs text-text-muted mt-3 text-center font-medium">{cftResult.packages} package{cftResult.packages > 1 ? 's' : ''}</p>
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>

                                                <div className="border-t border-gray-100 pt-6">
                                                    <div className="rounded-xl overflow-hidden mb-4 shadow-sm border border-amber-500/10">
                                                        <div className="bg-gradient-to-r from-amber-400 to-amber-500 px-5 py-3">
                                                            <h4 className="font-heading font-bold text-white text-sm flex items-center gap-2"><FaWeightHanging className="text-[13px]" />Charged Weight Calculation</h4>
                                                        </div>
                                                    </div>
                                                    <div className="mb-4">
                                                        <label className="block text-sm font-medium text-text-primary mb-1.5">1 CFT Rate (/Kg)</label>
                                                        <input type="number" value={cftRate} onChange={(e) => setCftRate(e.target.value)} placeholder="Enter 1 CFT value (Kg)" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-text-primary bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/20 focus:border-amber-400 transition-all" />
                                                    </div>
                                                    <button onClick={calculateChargedWeight} className="flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-heading font-bold text-sm shadow-lg shadow-blue-500/25 hover:shadow-xl hover:-translate-y-0.5 transition-all">
                                                        <FaCalculator className="text-sm" />Calculate Charged Weight
                                                    </button>
                                                    <AnimatePresence>
                                                        {chargedWeightResult && !chargedWeightResult.error && (
                                                            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-5">
                                                                <div className="p-5 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 shadow-sm">
                                                                    <h4 className="font-heading font-bold text-text-primary text-xs uppercase tracking-wider mb-3 flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-500" />Charged Weight Result</h4>
                                                                    <div className="grid grid-cols-3 gap-3">
                                                                        <ResultCard label="Total CFT" value={chargedWeightResult.totalCft} unit="ft³" color="primary" />
                                                                        <ResultCard label="Applied Rate" value={chargedWeightResult.rate} unit="Kg/CFT" color="accent" />
                                                                        <div className="rounded-xl bg-white p-3.5 border border-amber-300 shadow-md">
                                                                            <p className="text-text-muted text-xs mb-1 font-medium">Final Weight</p>
                                                                            <p className="font-heading font-black text-xl text-amber-600">{chargedWeightResult.chargedWeight}<span className="text-[10px] font-normal text-text-muted ml-1">Kg</span></p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            </div>

                                            {/* ===== QUOTATION ACTION AREA ===== */}
                                            <div className="mt-8 pt-6 border-t border-gray-200">
                                                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-5 border border-gray-200/60 shadow-inner flex flex-col sm:flex-row items-center justify-between gap-5 transition-all hover:border-accent/30 group">
                                                    <div className="flex-1 text-center sm:text-left">
                                                        <div className="flex items-center gap-2 justify-center sm:justify-start mb-1.5">
                                                            <FaFileInvoiceDollar className="text-accent text-lg" />
                                                            <h4 className="font-heading font-bold text-text-primary text-base">Request an Official Quote</h4>
                                                        </div>
                                                        <p className="text-xs text-text-muted leading-relaxed">
                                                            By pressing the button below, you can generate a formal quotation request using your calculated dimensions.
                                                        </p>
                                                    </div>
                                                    <button className="whitespace-nowrap w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-text-primary text-white font-heading font-bold text-sm shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                                        Generate Quotation
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <motion.div key="cbm" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="h-full flex flex-col">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-6">
                                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center shadow-md">
                                                        <FaExchangeAlt className="text-white text-sm" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-heading font-extrabold text-text-primary text-base">CBM to CFT Converter</h3>
                                                        <p className="text-text-muted text-xs">Convert cubic meters to cubic feet</p>
                                                    </div>
                                                </div>
                                                <div className="space-y-4 mb-6">
                                                    <div>
                                                        <label className="block text-sm font-medium text-text-primary mb-1.5">Enter CBM</label>
                                                        <input type="number" value={cbmValue} onChange={(e) => setCbmValue(e.target.value)} placeholder="Enter CBM value" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-text-primary bg-white focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all" />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-text-primary mb-1.5">No. of Packages</label>
                                                        <input type="number" value={cbmPackages} onChange={(e) => setCbmPackages(e.target.value)} min="1" placeholder="Enter no. of packages" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-text-primary bg-white focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all" />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-text-primary mb-1.5">1 CFT Rate (Kg) <span className="text-text-muted font-normal">— optional</span></label>
                                                        <input type="number" value={cbmCftRate} onChange={(e) => setCbmCftRate(e.target.value)} placeholder="Enter 1 CFT value (Kg)" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-text-primary bg-white focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all" />
                                                    </div>
                                                </div>
                                                <div className="flex gap-3 mb-6">
                                                    <button onClick={calculateCBM} className="flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-accent to-accent/90 text-white font-heading font-bold text-sm shadow-lg shadow-accent/25 hover:shadow-xl hover:-translate-y-0.5 transition-all">
                                                        <FaCalculator className="text-sm" />Calculate Conversion
                                                    </button>
                                                    <button onClick={resetCBM} className="px-6 py-3 rounded-xl border border-gray-200 text-text-muted font-heading font-semibold text-sm hover:bg-gray-50 transition-all">Reset</button>
                                                </div>
                                                <AnimatePresence>
                                                    {cbmResult && !cbmResult.error && (
                                                        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mb-6">
                                                            <div className="p-5 rounded-xl bg-gradient-to-br from-accent/[0.04] to-primary/[0.03] border border-accent/10">
                                                                <h4 className="font-heading font-bold text-text-primary text-xs uppercase tracking-wider mb-3.5 flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />Conversion Results</h4>
                                                                <div className={`grid grid-cols-1 ${cbmResult.weight ? 'sm:grid-cols-2' : 'sm:grid-cols-3'} gap-3`}>
                                                                    <ResultCard label="CFT / Pkg" value={cbmResult.cftPerPackage} unit="ft³" color="accent" />
                                                                    <ResultCard label="Total CFT" value={cbmResult.totalCft} unit="ft³" color="primary" />
                                                                    <ResultCard label="Total CBM" value={cbmResult.totalCbm} unit="m³" color="accent" />
                                                                    {cbmResult.weight && <ResultCard label="Charged Weight" value={cbmResult.weight} unit="Kg" color="primary" />}
                                                                </div>
                                                                <p className="text-xs text-text-muted mt-3 text-center font-medium">{cbmResult.packages} package{cbmResult.packages > 1 ? 's' : ''}</p>
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>

                                            {/* ===== QUOTATION ACTION AREA ===== */}
                                            <div className="mt-auto pt-6 border-t border-gray-200">
                                                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-5 border border-gray-200/60 shadow-inner flex flex-col sm:flex-row items-center justify-between gap-5 hover:border-primary/30 transition-all group">
                                                    <div className="flex-1 text-center sm:text-left">
                                                        <div className="flex items-center gap-2 justify-center sm:justify-start mb-1.5">
                                                            <FaFileInvoiceDollar className="text-primary text-lg" />
                                                            <h4 className="font-heading font-bold text-text-primary text-base">Request an Official Quote</h4>
                                                        </div>
                                                        <p className="text-xs text-text-muted leading-relaxed">
                                                            By pressing the button below, you can generate a formal quotation request based on your calculated results.
                                                        </p>
                                                    </div>
                                                    <button className="whitespace-nowrap w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-text-primary text-white font-heading font-bold text-sm shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                                        Generate Quotation
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function ResultCard({ label, value, unit, color }) {
    return (
        <motion.div className="rounded-xl bg-white p-3.5 border border-gray-200 shadow-sm" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.35 }}>
            <p className="text-text-muted text-xs mb-1 font-medium">{label}</p>
            <p className={`font-heading font-black text-xl ${color === 'accent' ? 'text-accent' : 'text-primary'}`}>
                {value}<span className="text-[10px] font-normal text-text-muted ml-1">{unit}</span>
            </p>
        </motion.div>
    );
}
