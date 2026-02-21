import React from 'react';
import { Link } from 'react-router-dom';
import {
    FaPhone, FaEnvelope, FaMapMarkerAlt,
    FaInstagram, FaFacebookF, FaLinkedinIn,
    FaArrowUp, FaShip
} from 'react-icons/fa';

const quickLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/services', label: 'Services' },
    { path: '/projects', label: 'Projects' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/contact', label: 'Contact' },
];

const serviceLinks = [
    { path: '/services#freight-forwarding', label: 'Freight Forwarding' },
    { path: '/services#custom-clearance', label: 'Custom Clearance' },
    { path: '/services#air-freight', label: 'Air Freight' },
    { path: '/services#nvocc', label: 'NVOCC Services' },
    { path: '/services#warehousing', label: 'Warehousing' },
    { path: '/services#ltl-ftl', label: 'LTL / FTL Transport' },
];

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-dark-navy text-white relative overflow-hidden">
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30 pointer-events-none" />

            <div className="container-empire relative z-10">
                {/* Main Footer */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-16 border-b border-white/10">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <div className="mb-5">
                            <img src="/logo.png" alt="Empire Logistics" className="h-14 w-auto" />
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed mb-5">
                            Your cross-border freight forwarding specialist. MTO Licensed, MSME Certified — serving India, Bangladesh, Nepal, Bhutan, Malaysia & UAE.
                        </p>
                        <div className="flex gap-3">
                            {[
                                { icon: FaInstagram, href: 'https://instagram.com/the_empire_logistic' },
                                { icon: FaFacebookF, href: '#' },
                                { icon: FaLinkedinIn, href: '#' },
                            ].map(({ icon: Icon, href }, i) => (
                                <a
                                    key={i}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-accent hover:text-white transition-all duration-300"
                                >
                                    <Icon className="text-sm" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-heading font-bold text-base mb-5 text-white">Quick Links</h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className="text-gray-400 text-sm hover:text-accent transition-colors duration-300 hover:pl-1"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="font-heading font-bold text-base mb-5 text-white">Our Services</h4>
                        <ul className="space-y-3">
                            {serviceLinks.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className="text-gray-400 text-sm hover:text-accent transition-colors duration-300 hover:pl-1"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-heading font-bold text-base mb-5 text-white">Contact Us</h4>
                        <div className="space-y-4">
                            <div className="flex gap-3">
                                <FaMapMarkerAlt className="text-accent mt-1 flex-shrink-0" />
                                <p className="text-gray-400 text-sm">
                                    5th Floor, Unit 513, Diamond Heritage, M-5, Strand Rd, B.B.D. Bagh, Kolkata–700001
                                </p>
                            </div>
                            <a href="tel:+918420442975" className="flex items-center gap-3 text-gray-400 text-sm hover:text-accent transition-colors">
                                <FaPhone className="text-accent" /> +91 84204 42975
                            </a>
                            <a href="mailto:info@empirelogistics.in" className="flex items-center gap-3 text-gray-400 text-sm hover:text-accent transition-colors">
                                <FaEnvelope className="text-accent" /> info@empirelogistics.in
                            </a>
                        </div>

                        <div className="mt-6 p-4 bg-white/5 rounded-general border border-white/10">
                            <div className="flex items-center gap-2 mb-1">
                                <FaShip className="text-accent text-sm" />
                                <span className="font-accent text-xs uppercase tracking-wider text-accent">MTO License</span>
                            </div>
                            <p className="text-gray-500 text-xs">MTO/DGS/4022/MAY/2028</p>
                            <p className="text-gray-500 text-xs">UDYAM-WB-10-0062282</p>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-gray-500 text-xs text-center md:text-left">
                        © {new Date().getFullYear()} Empire Logistics. All rights reserved. Trade Globally Without Hassle.
                    </p>
                    <button
                        onClick={scrollToTop}
                        className="w-10 h-10 rounded-full bg-accent/20 text-accent flex items-center justify-center hover:bg-accent hover:text-white transition-all duration-300"
                    >
                        <FaArrowUp className="text-sm" />
                    </button>
                </div>
            </div>
        </footer>
    );
}
