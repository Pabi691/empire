import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaPhone, FaEnvelope } from 'react-icons/fa';
import Button from '../ui/Button';

const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
    { path: '/projects', label: 'Projects' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/contact', label: 'Contact' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setMobileOpen(false);
    }, [location]);

    return (
        <>
            {/* Top Bar */}
            <div className="hidden lg:block bg-dark-navy text-white/80 text-xs py-2">
                <div className="container-empire flex justify-between items-center">
                    <span className="font-accent tracking-wide">MTO Licensed — DG Shipping | MSME Certified</span>
                    <div className="flex items-center gap-6">
                        <a href="tel:+918420442975" className="flex items-center gap-2 hover:text-accent transition-colors">
                            <FaPhone className="text-accent text-[10px]" /> +91 84204 42975
                        </a>
                        <a href="mailto:info@empirelogistics.in" className="flex items-center gap-2 hover:text-accent transition-colors">
                            <FaEnvelope className="text-accent text-[10px]" /> info@empirelogistics.in
                        </a>
                    </div>
                </div>
            </div>

            {/* Main Navbar — enhanced frosted glass on scroll */}
            <motion.nav
                className={`sticky top-0 z-50 transition-all duration-500 ${scrolled
                    ? 'bg-white/80 backdrop-blur-2xl shadow-standard border-b border-border-soft'
                    : 'bg-transparent'
                    }`}
                style={{
                    WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
                    backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
                }}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className="container-empire flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center group">
                        <img src="/logo.png" alt="Empire Logistics" className="h-14 w-auto" />
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`relative font-heading font-semibold text-sm tracking-wide transition-colors duration-300 py-2 ${location.pathname === link.path
                                    ? scrolled ? 'text-primary' : 'text-accent'
                                    : scrolled ? 'text-text-muted hover:text-primary' : 'text-white/80 hover:text-white'
                                    }`}
                            >
                                {link.label}
                                {location.pathname === link.path && (
                                    <motion.div
                                        layoutId="navIndicator"
                                        className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-accent rounded-full"
                                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* CTA + Mobile Toggle */}
                    <div className="flex items-center gap-4">
                        <div className="hidden lg:block">
                            <Button variant={scrolled ? 'primary' : 'glass'} onClick={() => window.location.href = '/contact'}>
                                Get a Quote
                            </Button>
                        </div>

                        <button
                            className={`lg:hidden w-10 h-10 flex items-center justify-center rounded-xl transition-colors ${scrolled ? 'text-text-primary' : 'text-white'
                                }`}
                            onClick={() => setMobileOpen(!mobileOpen)}
                        >
                            {mobileOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden fixed top-[80px] left-0 right-0 bg-white z-40 border-b border-border-soft shadow-hover overflow-hidden"
                    >
                        <div className="container-empire py-6 flex flex-col gap-2">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.path}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                >
                                    <Link
                                        to={link.path}
                                        className={`block py-3 px-4 rounded-general font-heading font-semibold text-base transition-all ${location.pathname === link.path
                                            ? 'bg-primary/10 text-primary'
                                            : 'text-text-primary hover:bg-soft-gray'
                                            }`}
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                            <div className="pt-4 mt-2 border-t border-border-soft">
                                <Button variant="primary" className="w-full" onClick={() => window.location.href = '/contact'}>
                                    Get a Quote
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
