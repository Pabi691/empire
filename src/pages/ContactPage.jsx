import React from 'react';
import ContactHero from '../components/sections/contact/ContactHero';
import ContactForm from '../components/sections/contact/ContactForm';
import ContactMap from '../components/sections/contact/ContactMap';

export default function ContactPage() {
    return (
        <>
            <ContactHero />
            <ContactForm />
            <ContactMap />
        </>
    );
}
