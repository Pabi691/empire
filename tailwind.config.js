/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#0c328e',
                accent: '#f06f1f',
                'dark-navy': '#0a0f1e',
                'soft-gray': '#f4f6fb',
                'text-primary': '#0d1b3e',
                'text-muted': '#5a6880',
            },
            fontFamily: {
                display: ['"Bebas Neue"', 'cursive'],
                heading: ['"Inter"', 'sans-serif'],
                body: ['"Inter"', 'sans-serif'],
                accent: ['"Space Grotesk"', 'sans-serif'],
            },
            fontSize: {
                'display': ['88px', { lineHeight: '1' }],
                'display-mobile': ['52px', { lineHeight: '1' }],
                'h1': ['56px', { lineHeight: '1.1' }],
                'h1-mobile': ['36px', { lineHeight: '1.15' }],
                'h2': ['40px', { lineHeight: '1.15' }],
                'h2-mobile': ['28px', { lineHeight: '1.2' }],
                'h3': ['26px', { lineHeight: '1.3' }],
                'h3-mobile': ['22px', { lineHeight: '1.3' }],
                'body': ['17px', { lineHeight: '1.7' }],
                'body-mobile': ['16px', { lineHeight: '1.7' }],
                'small': ['14px', { lineHeight: '1.5' }],
                'small-mobile': ['13px', { lineHeight: '1.5' }],
            },
            spacing: {
                'section': '100px',
                'section-tablet': '60px',
                'section-mobile': '40px',
            },
            maxWidth: {
                'container': '1280px',
            },
            borderRadius: {
                'card': '24px',
                'pill': '100px',
                'general': '12px',
            },
            boxShadow: {
                'standard': '0 20px 60px rgba(12,50,142,0.12)',
                'hover': '0 32px 80px rgba(12,50,142,0.22)',
                'orange': '0 16px 48px rgba(240,111,31,0.35)',
                'dark-card': '0 8px 32px rgba(0,0,0,0.24)',
            },
            backgroundImage: {
                'gradient-blue': 'linear-gradient(135deg, #0c328e 0%, #1a4fbd 100%)',
                'gradient-ora': 'linear-gradient(135deg, #f06f1f 0%, #f5a623 100%)',
                'gradient-dark': 'linear-gradient(180deg, #0a0f1e 0%, #0c328e 100%)',
            },
        },
    },
    plugins: [],
}
