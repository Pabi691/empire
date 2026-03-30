import React, { useRef, useEffect, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import Button from '../../ui/Button';
import { FaArrowRight, FaPlay } from 'react-icons/fa';

function Globe() {
    const meshRef = useRef();

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.002;
        }
    });

    const points = useMemo(() => {
        const pts = [];
        const numPoints = 2000;
        for (let i = 0; i < numPoints; i++) {
            const phi = Math.acos(-1 + (2 * i) / numPoints);
            const theta = Math.sqrt(numPoints * Math.PI) * phi;
            const x = 2 * Math.cos(theta) * Math.sin(phi);
            const y = 2 * Math.sin(theta) * Math.sin(phi);
            const z = 2 * Math.cos(phi);
            pts.push(new THREE.Vector3(x, y, z));
        }
        return pts;
    }, []);

    const geometry = useMemo(() => {
        const geo = new THREE.BufferGeometry();
        const positions = new Float32Array(points.length * 3);
        points.forEach((pt, i) => {
            positions[i * 3] = pt.x;
            positions[i * 3 + 1] = pt.y;
            positions[i * 3 + 2] = pt.z;
        });
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        return geo;
    }, [points]);

    return (
        <group ref={meshRef}>
            <points geometry={geometry}>
                <pointsMaterial
                    color="#4a7fff"
                    size={0.02}
                    transparent
                    opacity={0.7}
                    sizeAttenuation
                />
            </points>
            <Sphere args={[1.95, 32, 32]}>
                <meshBasicMaterial color="#0c328e" transparent opacity={0.05} />
            </Sphere>
            <Sphere args={[2.02, 16, 16]}>
                <meshBasicMaterial color="#f06f1f" transparent opacity={0.03} wireframe />
            </Sphere>
        </group>
    );
}

/* Animated SVG Route Lines */
function RouteLines() {
    return (
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-[1]" viewBox="0 0 800 500" fill="none" preserveAspectRatio="xMidYMid slice">
            {/* India → Bangladesh */}
            <path d="M420 200 Q460 180 500 195" stroke="rgba(240,111,31,0.3)" strokeWidth="1.5" strokeDasharray="8 4"
                style={{ animation: 'routeDash 3s linear infinite' }} />
            {/* India → Nepal */}
            <path d="M400 180 Q380 140 360 130" stroke="rgba(240,111,31,0.25)" strokeWidth="1.5" strokeDasharray="8 4"
                style={{ animation: 'routeDash 4s linear infinite, routePulse 3s ease-in-out infinite' }} />
            {/* India → UAE */}
            <path d="M380 210 Q280 190 200 230" stroke="rgba(74,127,255,0.3)" strokeWidth="1.5" strokeDasharray="8 4"
                style={{ animation: 'routeDash 5s linear infinite' }} />
            {/* India → Malaysia */}
            <path d="M420 240 Q500 300 580 320" stroke="rgba(74,127,255,0.25)" strokeWidth="1.5" strokeDasharray="8 4"
                style={{ animation: 'routeDash 4.5s linear infinite, routePulse 4s ease-in-out infinite' }} />
            {/* India → Bhutan */}
            <path d="M410 170 Q420 130 440 120" stroke="rgba(240,111,31,0.2)" strokeWidth="1.5" strokeDasharray="8 4"
                style={{ animation: 'routeDash 3.5s linear infinite' }} />
            {/* Pulsing dots at endpoints */}
            {[
                { cx: 420, cy: 200, label: 'India' },
                { cx: 500, cy: 195, label: 'BD' },
                { cx: 360, cy: 130, label: 'Nepal' },
                { cx: 200, cy: 230, label: 'UAE' },
                { cx: 580, cy: 320, label: 'MY' },
                { cx: 440, cy: 120, label: 'Bhutan' },
            ].map((dot, i) => (
                <circle key={i} cx={dot.cx} cy={dot.cy} r="3" fill="#f06f1f" opacity="0.6">
                    <animate attributeName="r" values="2;5;2" dur="2s" repeatCount="indefinite" begin={`${i * 0.3}s`} />
                    <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" begin={`${i * 0.3}s`} />
                </circle>
            ))}
        </svg>
    );
}

/* Floating Particle Dots */
const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    duration: `${5 + Math.random() * 8}s`,
    delay: `${Math.random() * 5}s`,
    size: `${2 + Math.random() * 2}px`,
}));

/* Staggered word animation variants */
const wordVariants = {
    hidden: { opacity: 0, y: 50, clipPath: 'inset(100% 0 0 0)' },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        clipPath: 'inset(0% 0 0 0)',
        transition: { duration: 0.7, delay: 0.3 + i * 0.15, ease: [0.16, 1, 0.3, 1] },
    }),
};

export default function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden bg-dark-navy -mt-20 pt-20">
            {/* Background gradient layers */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-dark-navy via-[#0a1535] to-primary/40" />
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px]" />
            </div>

            {/* Grid pattern overlay */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: '60px 60px',
                }}
            />

            {/* Floating particle dots */}
            <div className="absolute inset-0 pointer-events-none z-[1]">
                {particles.map((p) => (
                    <div
                        key={p.id}
                        className="hero-particle"
                        style={{
                            left: p.left,
                            top: p.top,
                            width: p.size,
                            height: p.size,
                            '--duration': p.duration,
                            '--delay': p.delay,
                        }}
                    />
                ))}
            </div>



            <div className="container-empire relative z-10 grid lg:grid-cols-2 gap-12 items-center py-20 lg:py-0">
                {/* Left content */}
                <div>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-pill bg-white/10 border border-white/20 text-orange-300 font-accent text-xs uppercase tracking-[1.5px] mb-6">
                            <span className="w-2 h-2 rounded-full bg-accent mto-dot-glow" />
                            MTO Licensed — DG Shipping
                        </span>
                    </motion.div>

                    {/* Staggered word-by-word headline */}
                    <h1 className="font-display text-display-mobile md:text-[72px] lg:text-display text-white leading-none mb-6">
                        <motion.span
                            className="block"
                            custom={0}
                            initial="hidden"
                            animate="visible"
                            variants={wordVariants}
                        >
                            TRADE
                        </motion.span>
                        <motion.span
                            className="block"
                            custom={1}
                            initial="hidden"
                            animate="visible"
                            variants={wordVariants}
                        >
                            <span className="gradient-text-orange">GLOBALLY</span>
                        </motion.span>
                        <motion.span
                            className="block"
                            custom={2}
                            initial="hidden"
                            animate="visible"
                            variants={wordVariants}
                        >
                            WITHOUT HASSLE
                        </motion.span>
                    </h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="text-gray-300 text-lg md:text-xl max-w-lg mb-8 leading-relaxed"
                    >
                        Your cross-border freight forwarding specialist — connecting India, Bangladesh, Nepal, Bhutan, Malaysia & UAE with precision logistics.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1 }}
                        className="flex flex-wrap gap-4"
                    >
                        <Button variant="primary" icon={<FaArrowRight />} onClick={() => window.location.href = '/contact'}>
                            Get a Free Quote
                        </Button>
                        <Button variant="glass" icon={<FaPlay />} onClick={() => window.location.href = '/services'}>
                            Our Services
                        </Button>
                    </motion.div>

                    {/* Trust badges */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.3 }}
                        className="mt-10 flex items-center gap-6 text-white/40 text-xs font-accent uppercase tracking-wider"
                    >
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-accent text-[10px] font-bold">5.0</div>
                            Google Rated
                        </div>
                        <div className="w-px h-4 bg-white/20" />
                        <div>6 Countries</div>
                        <div className="w-px h-4 bg-white/20" />
                        <div>MSME Certified</div>
                    </motion.div>
                </div>

                {/* Right — 3D Globe */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="hidden lg:block h-[500px] relative"
                >
                    <Suspense fallback={null}>
                        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                            <ambientLight intensity={0.4} />
                            <pointLight position={[10, 10, 10]} intensity={0.8} color="#4a7fff" />
                            <pointLight position={[-5, -5, 5]} intensity={0.3} color="#f06f1f" />
                            <Globe />
                            <OrbitControls
                                enableZoom={false}
                                enablePan={false}
                                autoRotate
                                autoRotateSpeed={0.5}
                                maxPolarAngle={Math.PI / 1.5}
                                minPolarAngle={Math.PI / 3}
                            />
                        </Canvas>
                    </Suspense>

                    {/* Animated Route Lines — overlaid on globe */}
                    <div className="absolute inset-0 z-[2] pointer-events-none">
                        <RouteLines />
                    </div>

                    {/* Floating country badges */}
                    {[
                        { name: 'India', top: '15%', left: '20%', delay: 1.2 },
                        { name: 'UAE', top: '25%', right: '10%', delay: 1.4 },
                        { name: 'Bangladesh', bottom: '30%', left: '5%', delay: 1.6 },
                        { name: 'Malaysia', bottom: '20%', right: '15%', delay: 1.8 },
                    ].map((badge) => (
                        <motion.div
                            key={badge.name}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: badge.delay, type: 'spring' }}
                            className="absolute px-3 py-1.5 rounded-pill bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-accent"
                            style={{ top: badge.top, left: badge.left, right: badge.right, bottom: badge.bottom }}
                        >
                            {badge.name}
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Scroll indicator with bounce */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
            >
                <div className="w-6 h-10 rounded-pill border-2 border-white/30 flex justify-center pt-2">
                    <motion.div
                        className="w-1 h-2 bg-white/60 rounded-full"
                        animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                    />
                </div>
            </motion.div>
        </section>
    );
}
