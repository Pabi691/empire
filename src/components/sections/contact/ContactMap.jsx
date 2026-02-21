import React from 'react';
import ScrollReveal from '../../ui/ScrollReveal';

export default function ContactMap() {
    return (
        <section className="bg-white">
            <div className="container-empire py-10">
                <ScrollReveal>
                    <div className="rounded-card overflow-hidden shadow-standard border border-border-soft">
                        <iframe
                            title="Empire Logistics Location"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.1549!2d88.3489!3d22.5726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sDiamond+Heritage%2C+Strand+Rd%2C+B.B.D.+Bagh%2C+Kolkata%2C+West+Bengal+700001!5e0!3m2!1sen!2sin!4v1"
                            width="100%"
                            height="400"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
