import React from 'react';
import AboutHero from '../components/sections/about/AboutHero';
import CompanyIntro from '../components/sections/about/CompanyIntro';
import MissionVisionAbout from '../components/sections/about/MissionVisionAbout';
import CoreValues from '../components/sections/about/CoreValues';
import GrowthJourney from '../components/sections/about/GrowthJourney';

export default function AboutPage() {
    return (
        <>
            <AboutHero />
            <CompanyIntro />
            <MissionVisionAbout />
            <CoreValues />
            <GrowthJourney />
        </>
    );
}
