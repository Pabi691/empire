import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaTimes } from 'react-icons/fa';
import { getWhatsAppLink } from '../../utils/helpers';

export default function FloatingWhatsApp() {
    const [showTooltip, setShowTooltip] = useState(false);
    const phoneNumber = '+918420442975';
    const message = 'Hello! I\'m interested in your logistics services. Can you help?';

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <AnimatePresence>
                {showTooltip && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        className="absolute bottom-16 right-0 bg-white rounded-2xl shadow-hover p-4 w-64 mb-2"
                    >
                        <button
                            onClick={() => setShowTooltip(false)}
                            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                        >
                            <FaTimes className="text-xs" />
                        </button>
                        <p className="text-sm font-heading font-bold text-text-primary mb-1">Need Help?</p>
                        <p className="text-xs text-text-muted mb-3">
                            Chat with us on WhatsApp for instant support!
                        </p>
                        <a
                            href={getWhatsAppLink(phoneNumber, message)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full text-center bg-[#25D366] text-white text-sm font-bold py-2 rounded-pill hover:bg-[#20BD5A] transition-colors"
                        >
                            Start Chat
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* WhatsApp button with pulse ring + liquid glass halo */}
            <div className="whatsapp-pulse-ring">
                <motion.button
                    onClick={() => setShowTooltip(!showTooltip)}
                    className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center text-2xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer relative"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                        y: { repeat: Infinity, duration: 2, ease: 'easeInOut' },
                    }}
                    style={{
                        animation: 'heartbeat 4s ease-in-out infinite',
                    }}
                >
                    {/* Liquid glass halo ring */}
                    <span
                        className="absolute inset-[-3px] rounded-full pointer-events-none"
                        style={{
                            background: 'transparent',
                            border: '1.5px solid rgba(37,211,102,0.2)',
                            backdropFilter: 'blur(4px)',
                            WebkitBackdropFilter: 'blur(4px)',
                        }}
                    />
                    <FaWhatsapp />
                </motion.button>
            </div>
        </div>
    );
}
