import React from 'react';
import HeroSection from '../components/sections/home/HeroSection';
import StatsBar from '../components/sections/home/StatsBar';
import ServicesSnapshot from '../components/sections/home/ServicesSnapshot';
import CftCalculator from '../components/sections/home/CftCalculator';
import AboutSnippet from '../components/sections/home/AboutSnippet';
import MissionVision from '../components/sections/home/MissionVision';
import WhyChooseUs from '../components/sections/home/WhyChooseUs';
import CountriesWeServe from '../components/sections/home/CountriesWeServe';
import Milestones from '../components/sections/home/Milestones';
import Testimonials from '../components/sections/home/Testimonials';
import HomeCTA from '../components/sections/home/HomeCTA';

export default function HomePage() {
    return (
        <>
            <HeroSection />
            <StatsBar />
            <ServicesSnapshot />
            <CftCalculator />
            <AboutSnippet />
            <MissionVision />
            <WhyChooseUs />
            <CountriesWeServe />
            <Milestones />
            <Testimonials />
            <HomeCTA />
        </>
    );
}
