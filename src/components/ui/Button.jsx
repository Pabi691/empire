import React, { useRef } from 'react';
import { motion } from 'framer-motion';

const variants = {
    primary: {
        className: 'btn-liquid-glass',
        style: {
            background: 'linear-gradient(135deg, rgba(240,111,31,0.9), rgba(245,166,35,0.95))',
            border: '1px solid rgba(255,255,255,0.35)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            color: '#fff',
            boxShadow: '0 8px 32px rgba(240,111,31,0.35), inset 0 1px 0 rgba(255,255,255,0.3)',
        },
        hover: {
            boxShadow: '0 20px 60px rgba(240,111,31,0.45), inset 0 1px 0 rgba(255,255,255,0.4)',
            y: -3,
        },
    },
    glass: {
        className: 'btn-liquid-glass-secondary',
        style: {
            background: 'rgba(255,255,255,0.06)',
            border: '1.5px solid rgba(255,255,255,0.3)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            color: '#fff',
        },
        hover: {
            background: 'rgba(255,255,255,0.12)',
            borderColor: 'rgba(255,255,255,0.5)',
            y: -3,
        },
    },
    outline: {
        className: 'btn-liquid-glass-outline',
        style: {
            background: 'rgba(255,255,255,0.04)',
            border: '1.5px solid rgba(12,50,142,0.3)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            color: '#0c328e',
            boxShadow: '0 8px 32px rgba(12,50,142,0.08)',
        },
        hover: {
            background: 'rgba(12,50,142,0.05)',
            borderColor: 'rgba(12,50,142,0.5)',
            boxShadow: '0 16px 48px rgba(12,50,142,0.15)',
            color: '#0c328e',
            y: -2,
        },
    },
};

export default function Button({
    children,
    variant = 'primary',
    onClick,
    href,
    className = '',
    icon,
    ...props
}) {
    const btnRef = useRef(null);
    const config = variants[variant] || variants.primary;

    const handleClick = (e) => {
        // Ripple effect
        const btn = btnRef.current;
        if (btn) {
            const rect = btn.getBoundingClientRect();
            const ripple = document.createElement('span');
            const size = Math.max(rect.width, rect.height);
            ripple.style.cssText = `
        position: absolute; border-radius: 50%;
        background: rgba(255,255,255,0.3);
        width: ${size}px; height: ${size}px;
        left: ${e.clientX - rect.left - size / 2}px;
        top: ${e.clientY - rect.top - size / 2}px;
        transform: scale(0); animation: ripple 0.6s ease-out;
        pointer-events: none;
      `;
            btn.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        }
        onClick?.(e);
    };

    const Component = href ? motion.a : motion.button;

    return (
        <Component
            ref={btnRef}
            href={href}
            onClick={handleClick}
            className={`${config.className} relative overflow-hidden inline-flex items-center justify-center gap-2 font-heading font-bold text-base px-9 py-3.5 rounded-pill cursor-pointer transition-all duration-300 ${className}`}
            style={config.style}
            whileHover={config.hover}
            whileTap={{ scale: 0.97 }}
            {...props}
        >
            {/* Shimmer sweep overlay — for primary and outline buttons */}
            <span
                className="absolute top-0 left-0 w-1/2 h-full pointer-events-none"
                style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)',
                    transform: 'translateX(-100%) skewX(-15deg)',
                }}
                aria-hidden="true"
            />
            {/* Inner top highlight for glass depth */}
            <span
                className="absolute top-0 left-[10%] right-[10%] h-[1px] pointer-events-none"
                style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                }}
                aria-hidden="true"
            />
            {icon && <span className="text-lg relative z-10">{icon}</span>}
            <span className="relative z-10">{children}</span>
        </Component>
    );
}
