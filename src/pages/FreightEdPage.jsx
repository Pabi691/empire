import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaGraduationCap, FaWeight, FaFileAlt, FaShip, FaRoute,
    FaBoxOpen, FaClipboardList, FaChevronDown, FaCheckCircle,
    FaPlane, FaTruck, FaArrowRight, FaBook
} from 'react-icons/fa';
import Button from '../components/ui/Button';

/* ── shared fade-up animation ── */
const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] } }),
};

/* ── Module images ── */
const moduleImages = {
    'vol-weight': '/freighted-volumetric.png',
    'incoterms':  '/freighted-incoterms.png',
    'containers': '/freighted-containers.png',
    'port-ops':   '/freighted-port-ops.png',
    'customs':    '/freighted-customs.png',
    'documents':  '/freighted-documents.png',
};

/* ── Module data ── */
const modules = [
    { id: 'vol-weight',   icon: FaWeight,        color: '#0ea5e9', label: 'Module 1', title: 'Volumetric Weight in Logistics' },
    { id: 'incoterms',    icon: FaRoute,          color: '#0c328e', label: 'Module 2', title: 'INCOTERMS 2020' },
    { id: 'containers',   icon: FaBoxOpen,        color: '#f59e0b', label: 'Module 3', title: 'Container Types & Specifications' },
    { id: 'port-ops',     icon: FaShip,           color: '#10b981', label: 'Module 4', title: 'Port Operations Journey' },
    { id: 'customs',      icon: FaClipboardList,  color: '#f06f1f', label: 'Module 5', title: 'Customs Clearance Process' },
    { id: 'documents',    icon: FaFileAlt,        color: '#8b5cf6', label: 'Module 6', title: 'Shipping Documents & Key Concepts' },
];

/* ─────────────────────────────────────────────
   HERO
───────────────────────────────────────────── */
function Hero() {
    return (
        <section className="relative min-h-[52vh] flex items-center overflow-hidden -mt-20 pt-20"
            style={{ background: 'linear-gradient(135deg, #05102e 0%, #0a1a50 50%, #0c328e 100%)' }}>
            {/* Background image */}
            <div className="absolute inset-0 pointer-events-none">
                <img src="/freighted-port-ops.png" alt="" aria-hidden="true"
                    className="w-full h-full object-cover opacity-[0.12]" />
            </div>
            <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(135deg, #05102eee 0%, #0a1a50dd 50%, #0c328ecc 100%)' }} />
            <div className="absolute inset-0 pointer-events-none opacity-[0.06]"
                style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(240,111,31,0.18) 0%, transparent 70%)' }} />

            <div className="container-empire relative z-10 py-20">
                <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-3xl">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill text-xs font-accent uppercase tracking-widest mb-5"
                        style={{ background: 'rgba(240,111,31,0.12)', border: '1px solid rgba(240,111,31,0.3)', color: '#f5a623' }}>
                        <FaGraduationCap className="text-sm" /> Free Logistics Education
                    </span>
                    <h1 className="font-display text-[56px] md:text-[72px] text-white leading-[0.95] mb-5">
                        Freight<span style={{ background: 'linear-gradient(135deg,#f06f1f,#f5a623)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Ed</span>
                    </h1>
                    <p className="text-white/60 text-lg md:text-xl max-w-xl leading-relaxed mb-3">
                        by Empire Logistics
                    </p>
                    <p className="text-white/50 text-base max-w-2xl leading-relaxed">
                        Master the fundamentals of cross-border trade — from Incoterms and container specs to customs clearance and shipping documents. All in one place, completely free.
                    </p>
                    <div className="flex flex-wrap gap-6 mt-8">
                        {['6 Modules', '40+ Key Concepts', 'Free Access'].map((tag, i) => (
                            <div key={i} className="flex items-center gap-2 text-white/60 text-sm">
                                <FaCheckCircle className="text-accent text-xs" />
                                {tag}
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

/* ─────────────────────────────────────────────
   MODULE NAV GRID
───────────────────────────────────────────── */
function ModuleNav({ active, onSelect }) {
    return (
        <section className="bg-white border-b border-border-soft sticky top-[72px] z-30 shadow-sm">
            <div className="container-empire">
                <div className="flex overflow-x-auto gap-1 py-3 scrollbar-hide">
                    {modules.map((m) => {
                        const Icon = m.icon;
                        const isActive = active === m.id;
                        return (
                            <button
                                key={m.id}
                                onClick={() => onSelect(m.id)}
                                className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-heading font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap"
                                style={isActive
                                    ? { background: m.color, color: '#fff', boxShadow: `0 0 16px ${m.color}50` }
                                    : { color: '#64748b', background: 'transparent' }}
                            >
                                <Icon className="text-xs flex-shrink-0" style={!isActive ? { color: m.color } : {}} />
                                {m.title}
                            </button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

/* ─────────────────────────────────────────────
   MODULE 1 — VOLUMETRIC WEIGHT
───────────────────────────────────────────── */
function VolumetricWeight() {
    const modes = [
        { icon: FaPlane, name: 'Air Cargo',       formula: '(L × W × H in cm) ÷ 6000',    example: '100 × 80 × 60 cm = 80 kg volumetric',       color: '#0ea5e9' },
        { icon: FaBoxOpen, name: 'Courier / Express', formula: '(L × W × H in cm) ÷ 5000', example: '60 × 40 × 40 cm = 19.2 kg volumetric',      color: '#8b5cf6' },
        { icon: FaShip,  name: 'Sea Cargo',        formula: '(L × W × H in cm) ÷ 1,000,000', example: '1 CBM = 1 Ton / 1.2 fons = 1.2 Tons',    color: '#0c328e' },
        { icon: FaTruck, name: 'Road Cargo',        formula: '(L × W × H in cm) ÷ 4000',    example: '100 × 50 × 60 cm = 75 kg volumetric',       color: '#f59e0b' },
    ];
    const summaryRows = [
        { mode: 'Air Cargo',        formula: '(L × W × H) ÷ 6000' },
        { mode: 'Courier',          formula: '(L × W × H) ÷ 5000' },
        { mode: 'Sea Cargo',        formula: '(L × W × H) ÷ 1,000,000' },
        { mode: 'Road Cargo',       formula: '(L × W × H) ÷ 4000' },
    ];
    const whyPoints = [
        'Helps optimise packaging → reduce costs',
        'Avoids disputes with freight forwarders',
        'Ensures fair cost allocation (pay for space or weight, whichever is higher)',
    ];
    return (
        <div>
            <ModuleHeader icon={FaWeight} color="#0ea5e9" label="Module 1" title="Understanding Volumetric Weight in Logistics" moduleId="vol-weight" />
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 mb-8 flex items-start gap-3">
                <div className="w-1.5 flex-shrink-0 self-stretch rounded-full bg-blue-500" />
                <div>
                    <p className="text-blue-900 font-semibold text-sm mb-1">Key Rule</p>
                    <p className="text-blue-800 text-sm leading-relaxed">
                        In logistics, freight charges are <strong>not always based on actual (gross) weight</strong>. A lightweight but bulky shipment can occupy more space than a heavy but compact one.
                    </p>
                    <p className="mt-2 text-blue-900 font-bold text-sm">
                        Chargable Weight = Higher of (Actual Weight, Volumetric Weight)
                    </p>
                </div>
            </div>
            <h3 className="font-heading font-bold text-text-primary text-base mb-4">How to Calculate Volumetric Weight (by mode):</h3>
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {modes.map((m, i) => {
                    const Icon = m.icon;
                    return (
                        <motion.div key={i} variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }}
                            className="p-5 rounded-2xl border-2 bg-white"
                            style={{ borderColor: `${m.color}30` }}>
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-base"
                                    style={{ background: m.color }}>
                                    <Icon />
                                </div>
                                <h4 className="font-heading font-bold text-text-primary text-sm">{m.name}</h4>
                            </div>
                            <p className="text-xs font-mono text-text-muted bg-gray-50 rounded-lg px-3 py-2 mb-2">{m.formula}</p>
                            <p className="text-xs text-text-muted"><span className="font-semibold text-text-primary">Example:</span> {m.example}</p>
                        </motion.div>
                    );
                })}
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
                <div>
                    <h3 className="font-heading font-bold text-text-primary text-base mb-3">Summary Table</h3>
                    <div className="overflow-hidden rounded-2xl border border-border-soft">
                        <table className="w-full text-sm">
                            <thead>
                                <tr style={{ background: '#0ea5e9' }}>
                                    <th className="text-left px-4 py-2.5 text-white font-heading font-semibold">Mode</th>
                                    <th className="text-left px-4 py-2.5 text-white font-heading font-semibold">Formula (cm)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {summaryRows.map((row, i) => (
                                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                        <td className="px-4 py-2.5 text-text-primary font-medium text-xs">{row.mode}</td>
                                        <td className="px-4 py-2.5 text-text-muted font-mono text-xs">{row.formula}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div>
                    <h3 className="font-heading font-bold text-text-primary text-base mb-3">Why It Matters?</h3>
                    <div className="space-y-3">
                        {whyPoints.map((pt, i) => (
                            <div key={i} className="flex items-start gap-2.5 text-sm text-text-muted">
                                <FaCheckCircle className="text-accent flex-shrink-0 mt-0.5 text-xs" />
                                {pt}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────
   MODULE 2 — INCOTERMS 2020
───────────────────────────────────────────── */
function Incoterms() {
    const terms = [
        { code: 'EXW', full: 'Ex Works',                        mode: 'All',      desc: 'Goods at disposal of buyer at seller\'s premises. Seller has minimum obligation.' },
        { code: 'FCA', full: 'Free Carrier',                    mode: 'All',      desc: 'Seller delivers goods to a named carrier at a named place.' },
        { code: 'CPT', full: 'Carriage Paid To',                mode: 'All',      desc: 'Seller pays freight to named destination. Risk transfers to buyer at first carrier.' },
        { code: 'CIP', full: 'Carriage and Insurance Paid To',  mode: 'All',      desc: 'Like CPT but seller also provides insurance to named destination.' },
        { code: 'DAP', full: 'Delivered at Place',              mode: 'All',      desc: 'Seller delivers goods ready for unloading at the named destination.' },
        { code: 'DPU', full: 'Delivered at Place Unloaded',     mode: 'All',      desc: 'Seller delivers and unloads goods at the named destination.' },
        { code: 'DDP', full: 'Delivered Duty Paid',             mode: 'All',      desc: 'Seller bears all costs including import clearance and duties. Maximum seller obligation.' },
        { code: 'FAS', full: 'Free Alongside Ship',             mode: 'Sea/Inland', desc: 'Seller delivers goods alongside the named vessel at the named port.' },
        { code: 'FOB', full: 'Free on Board',                   mode: 'Sea/Inland', desc: 'Seller delivers goods on board the vessel at the named port of shipment.' },
        { code: 'CFR', full: 'Cost and Freight',                mode: 'Sea/Inland', desc: 'Seller pays cost and freight to destination port. Risk transfers when goods are on board.' },
        { code: 'CIF', full: 'Cost, Insurance and Freight',    mode: 'Sea/Inland', desc: 'Like CFR but seller also provides insurance. Named port of destination.' },
    ];
    return (
        <div>
            <ModuleHeader icon={FaRoute} color="#0c328e" label="Module 2" title="INCOTERMS 2020" moduleId="incoterms" />
            <div className="bg-primary/5 border border-primary/15 rounded-2xl p-5 mb-8">
                <p className="text-text-muted text-sm leading-relaxed">
                    <strong className="text-text-primary">Incoterms® 2020</strong> are internationally recognised rules that define the responsibilities of sellers and buyers in international trade — covering delivery, risk transfer, insurance, and cost allocation.
                </p>
            </div>
            <div className="grid gap-3 mb-6">
                <div className="grid grid-cols-[auto_1fr] gap-3 items-center mb-2">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-pill text-xs font-accent uppercase tracking-wider bg-primary/10 text-primary">All Modes of Transport</span>
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-pill text-xs font-accent uppercase tracking-wider bg-blue-100 text-blue-700 justify-self-start">Sea & Inland Waterways Only</span>
                </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
                {terms.map((t, i) => (
                    <motion.div key={i} variants={fadeUp} custom={i % 4} initial="hidden" whileInView="visible" viewport={{ once: true }}
                        className="flex gap-4 p-4 rounded-2xl bg-white border border-border-soft hover:shadow-standard hover:border-primary/20 transition-all duration-200">
                        <div className="flex-shrink-0">
                            <div className="w-14 h-14 rounded-xl flex items-center justify-center font-display font-bold text-lg text-white"
                                style={{ background: t.mode === 'Sea/Inland' ? 'linear-gradient(135deg,#0ea5e9,#2563eb)' : 'linear-gradient(135deg,#0c328e,#1a4fbd)' }}>
                                {t.code}
                            </div>
                        </div>
                        <div>
                            <h4 className="font-heading font-bold text-text-primary text-sm">{t.full}</h4>
                            <p className="text-text-muted text-xs leading-relaxed mt-1">{t.desc}</p>
                            <span className="inline-block mt-2 text-[10px] font-accent uppercase tracking-wider px-2 py-0.5 rounded-full"
                                style={{ background: t.mode === 'Sea/Inland' ? '#dbeafe' : '#e0e7ff', color: t.mode === 'Sea/Inland' ? '#1d4ed8' : '#4338ca' }}>
                                {t.mode}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────
   MODULE 3 — CONTAINER TYPES
───────────────────────────────────────────── */
function Containers() {
    const specContainers = [
        { name: "20' Dry Freight", payload: '17,568 kgs', cbm: '32.96 cbm', dims: "L: 19'5\" W: 7'8 3/8\" H: 7'9 5/8\"" },
        { name: "40' High Cube",   payload: '20,502 kgs', cbm: '76.46 cbm', dims: "L: 39'3/8\" W: 7'8 3/8\" H: 8'8\"" },
        { name: "20' Open Top",    payload: '17,282 kgs', cbm: '31.88 cbm', dims: "L: 19'5\" W: 7'8 1/8\" H: 7'9 5/8\"" },
        { name: "40' Open Top",    payload: '20,525 kgs', cbm: '64.99 cbm', dims: "L: 39'6 1/8\" W: 7'8 3/4\" H: 7'5 7/16\"" },
        { name: "20' Flat Rack",   payload: '17,762 kgs', cbm: '—',         dims: "L: 19'6\" W: 7'5\" H: 6'9 3/4\"" },
        { name: "40' Flat Rack",   payload: '25,219 kgs', cbm: '—',         dims: "L: 39'7\" W: 8'0\" H: 6'9 3/4\"" },
        { name: "20' Reefer",      payload: '17,290 kgs', cbm: '26.90 cbm', dims: "L: 17'10\" W: 7'4 1/16\" H: 7'3 1/2\"" },
        { name: "40' HC Reefer",   payload: '25,909 kgs', cbm: '54.99 cbm', dims: "L: 38'0\" W: 7'6\" H: 8'4\"" },
        { name: "48' High Cube",   payload: '21,101 kgs', cbm: '98.26 cbm', dims: "L: 47'5\" W: 7'8 3/8\" H: 8'10\"" },
        { name: "53' Dry",         payload: '20,865 kgs', cbm: '112.75 cbm', dims: "L: 52'5\" W: 8'2\" H: 9'2\"" },
    ];
    const specialTypes = [
        'Open-top Container', 'Double Door Container', 'Flat Rack Container',
        'Side Door Container', 'Tank Container', 'Hard Top Container',
        'Pallet Wide Container', 'Reefer Container', 'Insulated Container',
    ];
    return (
        <div>
            <ModuleHeader icon={FaBoxOpen} color="#f59e0b" label="Module 3" title="Container Types & Specifications" moduleId="containers" />
            <h3 className="font-heading font-bold text-text-primary text-base mb-4">Standard Container Specifications</h3>
            <div className="overflow-x-auto rounded-2xl border border-border-soft mb-8">
                <table className="w-full text-sm min-w-[600px]">
                    <thead>
                        <tr style={{ background: '#f59e0b' }}>
                            <th className="text-left px-4 py-3 text-white font-heading font-semibold">Container</th>
                            <th className="text-left px-4 py-3 text-white font-heading font-semibold">Max Payload</th>
                            <th className="text-left px-4 py-3 text-white font-heading font-semibold">CBM</th>
                            <th className="text-left px-4 py-3 text-white font-heading font-semibold">Interior Dimensions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {specContainers.map((c, i) => (
                            <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-amber-50/40'}>
                                <td className="px-4 py-2.5 font-medium text-text-primary text-xs">{c.name}</td>
                                <td className="px-4 py-2.5 text-text-muted text-xs">{c.payload}</td>
                                <td className="px-4 py-2.5 text-text-muted text-xs font-mono">{c.cbm}</td>
                                <td className="px-4 py-2.5 text-text-muted text-xs font-mono">{c.dims}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <h3 className="font-heading font-bold text-text-primary text-base mb-4">Special Container Types</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {specialTypes.map((type, i) => (
                    <motion.div key={i} variants={fadeUp} custom={i % 3} initial="hidden" whileInView="visible" viewport={{ once: true }}
                        className="flex items-center gap-2.5 p-3.5 rounded-xl bg-white border border-border-soft hover:border-amber-300 hover:shadow-standard transition-all duration-200">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ background: '#f59e0b20' }}>
                            <FaBoxOpen className="text-amber-500 text-xs" />
                        </div>
                        <span className="text-text-primary text-xs font-medium leading-tight">{type}</span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────
   MODULE 4 — PORT OPERATIONS
───────────────────────────────────────────── */
function PortOperations() {
    const steps = [
        { num: '01', title: 'Gate Entry & Security Check',      desc: 'Truck arrives at port gate. Documents are verified, security checks are performed, and container details are logged.' },
        { num: '02', title: 'Weighbridge & Inspection',         desc: 'Container is weighed on the weighbridge to verify declared weight. Physical inspection may follow.' },
        { num: '03', title: 'Stacking & Storage in Yard',       desc: 'Container is moved to the container yard and stacked using cranes or reach stackers, awaiting loading schedule.' },
        { num: '04', title: 'Customs Documentation & Clearance', desc: 'Customs officers verify shipping documents — bill of lading, packing list, commercial invoice — and grant clearance.' },
        { num: '05', title: 'Vessel Loading Operations',        desc: 'Gantry cranes load the container onto the vessel according to the loading plan (bay plan).' },
        { num: '06', title: 'Vessel Departure & Sailing',       desc: 'All containers secured, vessel departs. Departure notice issued and tracking begins.' },
    ];
    return (
        <div>
            <ModuleHeader icon={FaShip} color="#10b981" label="Module 4" title="Port Operations Journey: Gate to Vessel" moduleId="port-ops" />
            <p className="text-text-muted text-sm leading-relaxed mb-8">
                Understanding how a container moves through a port helps importers and exporters plan timelines, avoid detention charges, and ensure smooth documentation flow.
            </p>
            <div className="relative">
                <div className="absolute left-[28px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-400 via-emerald-300 to-transparent hidden sm:block" />
                <div className="space-y-5">
                    {steps.map((step, i) => (
                        <motion.div key={i} variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }}
                            className="flex gap-5 items-start">
                            <div className="relative flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center text-white font-display font-bold text-base z-10"
                                style={{ background: 'linear-gradient(135deg,#10b981,#059669)' }}>
                                {step.num}
                            </div>
                            <div className="flex-1 bg-white border border-border-soft rounded-2xl p-5 hover:shadow-standard transition-all duration-200">
                                <h4 className="font-heading font-bold text-text-primary text-sm mb-1.5">{step.title}</h4>
                                <p className="text-text-muted text-xs leading-relaxed">{step.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────
   MODULE 5 — CUSTOMS CLEARANCE
───────────────────────────────────────────── */
function CustomsClearance() {
    const stages = [
        {
            num: '1', title: 'Pre-Shipment: Preparation at Origin (Seller\'s Role)',
            color: '#f06f1f',
            points: ['Commercial Invoice', 'Packing List', 'Bill of Lading / Airway Bill (if applicable)', 'Export Declaration', 'Export clearance granted'],
        },
        {
            num: '2', title: 'In Transit (Carrier\'s Role)',
            color: '#0ea5e9',
            points: ['Cargo moves via sea, air, or land', 'Carrier submits shipment data to destination customs (e.g. ENS, AMS)', 'Buyers should be ready with import documents before cargo arrives'],
        },
        {
            num: '3', title: 'Arrival at Destination Port (Buyer\'s Responsibility Begins)',
            color: '#0c328e',
            points: ['Commercial Invoice (from seller)', 'Packing List (from seller)', 'Bill of Lading / Air Waybill', 'HS Code / Product Classification', 'Import License (if required)', 'Insurance Certificate (if applicable)', 'Customs Broker files for clearance'],
        },
        {
            num: '4', title: 'Assessment & Payment',
            color: '#10b981',
            points: ['Customs calculates duties, VAT, and taxes', 'Buyer or customs broker pays duties', 'Clearance approved if documents and payment are in order', 'Buyer arranges final delivery (or forwarder coordinates)'],
        },
    ];
    return (
        <div>
            <ModuleHeader icon={FaClipboardList} color="#f06f1f" label="Module 5" title="Customs Clearance — Full Process & Timeline" moduleId="customs" />
            <p className="text-text-muted text-sm leading-relaxed mb-8">
                Customs clearance is a mandatory process for every international shipment. Both buyers and sellers have specific roles at different stages of the journey.
            </p>
            <div className="grid sm:grid-cols-2 gap-5">
                {stages.map((stage, i) => (
                    <motion.div key={i} variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }}
                        className="bg-white border border-border-soft rounded-2xl p-6 hover:shadow-standard transition-all duration-200"
                        style={{ borderTop: `3px solid ${stage.color}` }}>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                                style={{ background: stage.color }}>
                                {stage.num}
                            </div>
                            <h4 className="font-heading font-bold text-text-primary text-xs leading-snug">{stage.title}</h4>
                        </div>
                        <ul className="space-y-2">
                            {stage.points.map((pt, j) => (
                                <li key={j} className="flex items-start gap-2 text-xs text-text-muted">
                                    <FaCheckCircle className="flex-shrink-0 mt-0.5 text-[10px]" style={{ color: stage.color }} />
                                    {pt}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────
   MODULE 6 — SHIPPING DOCUMENTS
───────────────────────────────────────────── */
function ShippingDocuments() {
    const [showBolVsAwb, setShowBolVsAwb] = useState(false);

    const docCategories = [
        {
            title: 'Transport Documents',
            color: '#0c328e',
            docs: ['Air Waybill (AWB)', 'Bill of Lading (B/L)', 'Sea Waybill', 'Multimodal Transport Document', 'Truck Consignment Note', 'Rail Consignment Note', 'Charter Party B/L'],
        },
        {
            title: 'Commercial Documents',
            color: '#f06f1f',
            docs: ['Commercial Invoice', 'Proforma Invoice', 'Packing List', 'Bill of Sale', 'Consular Invoice', 'Freight Invoice / Bill'],
        },
        {
            title: 'Customs & Compliance',
            color: '#10b981',
            docs: ['Export Declaration', 'Import Declaration', 'Customs Entry Form', 'Customs Release Order', 'Single Administrative Document', 'Goods Release Order'],
        },
        {
            title: 'Financial Documents',
            color: '#8b5cf6',
            docs: ['Letter of Credit (L/C)', 'Bank Guarantee', 'Draft / Bill of Exchange', 'Mate\'s Receipt', 'Freight Receipt', 'Pro Forma Receipt'],
        },
        {
            title: 'Regulatory & Compliance',
            color: '#0ea5e9',
            docs: ['Certificate of Origin', 'Certificate of Inspection', 'Certificate of Analysis', 'Certificate of Conformity', 'Phytosanitary Certificate', 'Health Certificate', 'Certificate of Weight'],
        },
        {
            title: 'Cargo & Logistics',
            color: '#f59e0b',
            docs: ['Dangerous Goods Declaration', 'Cargo Manifest', 'Dock Receipt', 'Warehouse Receipt', 'Bonded Warehouse Receipt', 'Loading Order', 'Cargo Release Order'],
        },
    ];

    const bolVsAwb = [
        { aspect: 'Issuance', bol: 'Document issued when goods are shipped by sea', awb: 'Document issued when goods are shipped by air' },
        { aspect: 'Legal Function', bol: 'Functions as a document of title and negotiable instrument', awb: 'Functions as a receipt of goods and contract of carriage' },
        { aspect: 'Governing Rules', bol: 'Governed by the Hague Rules or the Hague-Visby Rules', awb: 'Governed by the Warsaw Convention or the Montreal Convention' },
        { aspect: 'Originals Issued', bol: 'Three originals are typically issued', awb: 'Generally, a single original is issued' },
    ];

    return (
        <div>
            <ModuleHeader icon={FaFileAlt} color="#8b5cf6" label="Module 6" title="Shipping Documents & Key Concepts" moduleId="documents" />
            <p className="text-text-muted text-sm leading-relaxed mb-8">
                International trade requires a precise set of documents at every stage. Below are the key categories covering the 40+ most important shipping documents.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
                {docCategories.map((cat, i) => (
                    <motion.div key={i} variants={fadeUp} custom={i % 3} initial="hidden" whileInView="visible" viewport={{ once: true }}
                        className="bg-white border border-border-soft rounded-2xl p-5 hover:shadow-standard transition-all duration-200"
                        style={{ borderTop: `3px solid ${cat.color}` }}>
                        <h4 className="font-heading font-bold text-text-primary text-sm mb-3" style={{ color: cat.color }}>{cat.title}</h4>
                        <ul className="space-y-1.5">
                            {cat.docs.map((doc, j) => (
                                <li key={j} className="flex items-center gap-2 text-xs text-text-muted">
                                    <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: cat.color }} />
                                    {doc}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>

            {/* Bill of Lading vs Airway Bill comparison */}
            <div className="bg-soft-gray rounded-2xl p-1 border border-border-soft">
                <button
                    onClick={() => setShowBolVsAwb(!showBolVsAwb)}
                    className="w-full flex items-center justify-between px-5 py-4 cursor-pointer"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm"
                            style={{ background: 'linear-gradient(135deg,#0c328e,#8b5cf6)' }}>
                            <FaFileAlt />
                        </div>
                        <span className="font-heading font-bold text-text-primary text-sm">Bill of Lading vs Airway Bill — Key Differences</span>
                    </div>
                    <motion.div animate={{ rotate: showBolVsAwb ? 180 : 0 }} transition={{ duration: 0.2 }}>
                        <FaChevronDown className="text-text-muted text-xs" />
                    </motion.div>
                </button>
                <AnimatePresence>
                    {showBolVsAwb && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }} className="overflow-hidden px-5 pb-5">
                            <div className="overflow-hidden rounded-xl border border-border-soft">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr>
                                            <th className="text-left px-4 py-3 text-white font-heading font-semibold bg-primary/80 text-xs">Aspect</th>
                                            <th className="text-left px-4 py-3 text-white font-heading font-semibold text-xs" style={{ background: '#1d4ed8' }}>Bill of Lading</th>
                                            <th className="text-left px-4 py-3 text-white font-heading font-semibold text-xs" style={{ background: '#f59e0b' }}>Airway Bill</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bolVsAwb.map((row, i) => (
                                            <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-blue-50/30'}>
                                                <td className="px-4 py-3 text-text-primary font-semibold text-xs">{row.aspect}</td>
                                                <td className="px-4 py-3 text-text-muted text-xs leading-relaxed">{row.bol}</td>
                                                <td className="px-4 py-3 text-text-muted text-xs leading-relaxed">{row.awb}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────
   SHARED MODULE HEADER
───────────────────────────────────────────── */
function ModuleHeader({ icon: Icon, color, label, title, moduleId }) {
    const img = moduleId ? moduleImages[moduleId] : null;
    return (
        <div className="mb-8">
            {/* Module banner image */}
            {img && (
                <div className="relative rounded-2xl overflow-hidden mb-6 aspect-[21/9]">
                    <img src={img} alt={title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0"
                        style={{ background: `linear-gradient(to top, ${color}cc 0%, ${color}33 40%, transparent 70%)` }} />
                    <div className="absolute bottom-4 left-5 right-5 flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl flex-shrink-0 shadow-lg"
                            style={{ background: `linear-gradient(135deg, ${color}, ${color}bb)` }}>
                            <Icon />
                        </div>
                        <div>
                            <span className="text-white/70 text-[10px] font-accent uppercase tracking-[2px] font-medium">{label}</span>
                            <h2 className="font-heading font-extrabold text-white text-lg md:text-xl">{title}</h2>
                        </div>
                    </div>
                </div>
            )}
            {/* Fallback header without image */}
            {!img && (
                <div className="flex items-start gap-4 pb-6 border-b border-border-soft">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl flex-shrink-0 shadow-lg"
                        style={{ background: `linear-gradient(135deg, ${color}, ${color}bb)` }}>
                        <Icon />
                    </div>
                    <div>
                        <span className="text-xs font-accent uppercase tracking-[2px] font-medium" style={{ color }}>{label}</span>
                        <h2 className="font-heading font-extrabold text-text-primary text-xl md:text-2xl mt-0.5">{title}</h2>
                    </div>
                </div>
            )}
        </div>
    );
}

/* ─────────────────────────────────────────────
   CTA FOOTER
───────────────────────────────────────────── */
function LearnCTA() {
    return (
        <section className="section-padding bg-white border-t border-border-soft">
            <div className="container-empire text-center max-w-2xl mx-auto">
                <motion.div initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }}>
                    <FaGraduationCap className="text-4xl text-accent mx-auto mb-4" />
                    <h2 className="font-heading font-extrabold text-h2-mobile md:text-h2 text-text-primary mb-4">
                        Ready to Put Your Knowledge Into Action?
                    </h2>
                    <p className="text-text-muted text-body leading-relaxed mb-8">
                        At Empire Logistics, we apply all of this expertise every day to move your cargo across borders — safely, compliantly, and on time.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Button variant="primary" icon={<FaArrowRight />} onClick={() => window.location.href = '/contact'}>
                            Get a Free Quote
                        </Button>
                        <Button variant="outline" icon={<FaBook />} onClick={() => window.location.href = '/services'}>
                            Our Services
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
const moduleComponents = {
    'vol-weight': VolumetricWeight,
    'incoterms':  Incoterms,
    'containers': Containers,
    'port-ops':   PortOperations,
    'customs':    CustomsClearance,
    'documents':  ShippingDocuments,
};

export default function FreightEdPage() {
    const [activeModule, setActiveModule] = useState('vol-weight');
    const ActiveComponent = moduleComponents[activeModule];

    const handleSelect = (id) => {
        setActiveModule(id);
        setTimeout(() => {
            document.getElementById('module-content')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
    };

    return (
        <>
            <Hero />
            <ModuleNav active={activeModule} onSelect={handleSelect} />

            <section id="module-content" className="section-padding bg-soft-gray">
                <div className="container-empire">
                    {/* Module grid overview */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                        {modules.map((m, i) => {
                            const Icon = m.icon;
                            const isActive = activeModule === m.id;
                            const img = moduleImages[m.id];
                            return (
                                <motion.button
                                    key={m.id}
                                    variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }}
                                    onClick={() => handleSelect(m.id)}
                                    className="group text-left rounded-2xl border-2 cursor-pointer transition-all duration-250 bg-white overflow-hidden"
                                    style={isActive
                                        ? { borderColor: m.color, boxShadow: `0 0 20px ${m.color}25` }
                                        : { borderColor: 'transparent', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
                                >
                                    {/* Module thumbnail image */}
                                    {img && (
                                        <div className="relative h-28 overflow-hidden">
                                            <img src={img} alt={m.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                            <div className="absolute inset-0"
                                                style={{ background: `linear-gradient(to top, white 0%, ${m.color}22 50%, transparent 100%)` }} />
                                        </div>
                                    )}
                                    <div className="p-5">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-base flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
                                                style={{ background: m.color }}>
                                                <Icon />
                                            </div>
                                            <span className="text-[10px] font-accent uppercase tracking-widest" style={{ color: m.color }}>{m.label}</span>
                                        </div>
                                        <h3 className="font-heading font-bold text-text-primary text-sm leading-snug">{m.title}</h3>
                                    </div>
                                </motion.button>
                            );
                        })}
                    </div>

                    {/* Active module content */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeModule}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.4 }}
                            className="bg-white rounded-3xl border border-border-soft shadow-standard p-7 md:p-10"
                        >
                            <ActiveComponent />
                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>

            <LearnCTA />
        </>
    );
}
