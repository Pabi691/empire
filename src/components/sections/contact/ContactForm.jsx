import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import Button from '../../ui/Button';
import ScrollReveal from '../../ui/ScrollReveal';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaWhatsapp, FaPaperPlane, FaCheckCircle } from 'react-icons/fa';

const contactInfo = [
    { icon: <FaPhone />, label: 'Phone', value: '+91 84204 42975', href: 'tel:+918420442975' },
    { icon: <FaWhatsapp />, label: 'WhatsApp', value: '+91 84204 42975', href: 'https://wa.me/918420442975' },
    { icon: <FaEnvelope />, label: 'Email', value: 'info@empirelogistics.in', href: 'mailto:info@empirelogistics.in' },
    { icon: <FaMapMarkerAlt />, label: 'Address', value: '5th Floor, Unit 513, Diamond Heritage, M-5, Strand Rd, B.B.D. Bagh, Kolkata–700001', href: null },
    { icon: <FaClock />, label: 'Working Hours', value: 'Mon–Sat: 9:00 AM – 7:00 PM', href: null },
];

const serviceOptions = [
    'Freight Forwarding', 'Custom Clearance', 'Air Freight', 'NVOCC Services',
    'Warehousing', 'Railway Cargo', 'LTL/FTL Transport', 'Container Transport', 'Other'
];

export default function ContactForm() {
    const [submitted, setSubmitted] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = (data) => {
        console.log('Form data:', data);
        // EmailJS integration would go here
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            reset();
        }, 5000);
    };

    return (
        <section className="section-padding bg-soft-gray">
            <div className="container-empire">
                <div className="grid lg:grid-cols-5 gap-10">
                    {/* Left — Contact Info */}
                    <ScrollReveal direction="left" className="lg:col-span-2">
                        <div className="bg-gradient-to-br from-primary to-blue-700 rounded-card p-8 text-white h-full">
                            <h3 className="font-heading font-bold text-2xl mb-2">Contact Information</h3>
                            <p className="text-blue-200 text-sm mb-8">Reach out and let us handle your logistics needs.</p>

                            <div className="space-y-6">
                                {contactInfo.map((item, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-orange-300 flex-shrink-0">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <div className="text-[10px] uppercase tracking-wider text-blue-300 font-accent">{item.label}</div>
                                            {item.href ? (
                                                <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="text-sm text-white hover:text-orange-300 transition-colors">
                                                    {item.value}
                                                </a>
                                            ) : (
                                                <p className="text-sm text-white/90">{item.value}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-10 pt-6 border-t border-white/20">
                                <div className="text-xs text-blue-300 font-accent uppercase tracking-wider mb-1">Certifications</div>
                                <p className="text-white/70 text-xs">MTO/DGS/4022/MAY/2028</p>
                                <p className="text-white/70 text-xs">UDYAM-WB-10-0062282</p>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Right — Form */}
                    <ScrollReveal direction="right" className="lg:col-span-3">
                        <div className="bg-white rounded-card p-8 shadow-standard border border-border-soft">
                            {submitted ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-16"
                                >
                                    <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
                                        <FaCheckCircle className="text-green-500 text-4xl" />
                                    </div>
                                    <h3 className="font-heading font-bold text-2xl text-text-primary mb-2">Message Sent!</h3>
                                    <p className="text-text-muted">We'll get back to you within 24 hours.</p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                                    <h3 className="font-heading font-bold text-xl text-text-primary mb-1">Send Us a Message</h3>
                                    <p className="text-text-muted text-sm mb-4">Fill in the form and our team will respond shortly.</p>

                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-accent uppercase tracking-wider text-text-muted mb-1.5">Full Name *</label>
                                            <input
                                                {...register('name', { required: 'Name is required' })}
                                                className="w-full px-4 py-3 rounded-general border border-gray-200 bg-soft-gray text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                                placeholder="John Doe"
                                            />
                                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-xs font-accent uppercase tracking-wider text-text-muted mb-1.5">Email *</label>
                                            <input
                                                type="email"
                                                {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })}
                                                className="w-full px-4 py-3 rounded-general border border-gray-200 bg-soft-gray text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                                placeholder="john@company.com"
                                            />
                                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                                        </div>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-accent uppercase tracking-wider text-text-muted mb-1.5">Phone</label>
                                            <input
                                                {...register('phone')}
                                                className="w-full px-4 py-3 rounded-general border border-gray-200 bg-soft-gray text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                                placeholder="+91 XXXXX XXXXX"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-accent uppercase tracking-wider text-text-muted mb-1.5">Service Needed</label>
                                            <select
                                                {...register('service')}
                                                className="w-full px-4 py-3 rounded-general border border-gray-200 bg-soft-gray text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                            >
                                                <option value="">Select a service</option>
                                                {serviceOptions.map((s) => (
                                                    <option key={s} value={s}>{s}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-accent uppercase tracking-wider text-text-muted mb-1.5">Message *</label>
                                        <textarea
                                            {...register('message', { required: 'Message is required' })}
                                            rows={4}
                                            className="w-full px-4 py-3 rounded-general border border-gray-200 bg-soft-gray text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                                            placeholder="Tell us about your shipping requirements..."
                                        />
                                        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                                    </div>

                                    <Button variant="primary" icon={<FaPaperPlane />} className="w-full sm:w-auto">
                                        Send Message
                                    </Button>
                                </form>
                            )}
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}
