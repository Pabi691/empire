import React, { useState, useEffect } from 'react';

export default function PageLoader() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timeout);
    }, []);

    if (!loading) return null;

    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9999,
                background: '#0a0f1e',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'opacity 0.5s ease',
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
                <div
                    style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '16px',
                        background: 'linear-gradient(135deg, #0c328e, #f06f1f)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontFamily: '"Bebas Neue", cursive',
                        fontSize: '36px',
                    }}
                >
                    E
                </div>
                <div>
                    <div style={{ fontFamily: '"Inter", sans-serif', fontWeight: 800, fontSize: '24px', color: '#fff' }}>
                        EMPIRE
                    </div>
                    <div style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: '#f5a623' }}>
                        Logistics
                    </div>
                </div>
            </div>
            <div style={{ width: '192px', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                <div
                    style={{
                        height: '100%',
                        background: 'linear-gradient(90deg, #f06f1f, #0c328e)',
                        borderRadius: '4px',
                        animation: 'loaderBar 1.5s ease-in-out forwards',
                    }}
                />
            </div>
            <p style={{ marginTop: '16px', fontFamily: '"Space Grotesk", sans-serif', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>
                Loading...
            </p>
        </div>
    );
}
