import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import PageLoader from './components/layout/PageLoader';
import FloatingWhatsApp from './components/ui/FloatingWhatsApp';
import Router from './Router';

function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}

export default function App() {
    return (
        <>
            <PageLoader />
            <ScrollToTop />
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-1 page-fade-in">
                    <Router />
                </main>
                <Footer />
            </div>
            <FloatingWhatsApp />
        </>
    );
}
