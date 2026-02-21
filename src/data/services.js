import {
    FaShip, FaPlane, FaTruck, FaWarehouse,
    FaTrain, FaFileAlt, FaBoxes, FaGlobeAmericas
} from 'react-icons/fa';

const services = [
    {
        id: 'freight-forwarding',
        title: 'Freight Forwarding',
        shortDesc: 'End-to-end ocean freight solutions across major global trade lanes.',
        fullDesc: 'Empire Logistics provides comprehensive freight forwarding services spanning major international trade lanes. From FCL to LCL shipments, we handle documentation, customs coordination, and door-to-door delivery with precision. Our MTO license (DGS/4022) ensures compliance at every step.',
        icon: 'FaShip',
        features: [
            'FCL & LCL Shipments',
            'Multi-modal Transport',
            'Real-time Tracking',
            'Documentation Support',
            'Door-to-Door Delivery',
            'Trade Lane Optimization'
        ],
        color: '#0c328e',
    },
    {
        id: 'custom-clearance',
        title: 'Custom Clearance',
        shortDesc: 'Swift and compliant customs clearance for hassle-free trade.',
        fullDesc: 'Navigate complex customs regulations with our expert clearance team. We handle all documentation, duty calculations, and regulatory compliance to ensure your goods clear customs swiftly. Our deep relationships with customs authorities across India, Bangladesh, Nepal, and Bhutan set us apart.',
        icon: 'FaFileAlt',
        features: [
            'Import & Export Clearance',
            'Duty Calculation',
            'Regulatory Compliance',
            'HS Code Classification',
            'Bonded Warehousing',
            'AEO Facilitation'
        ],
        color: '#f06f1f',
    },
    {
        id: 'air-freight',
        title: 'Air Freight',
        shortDesc: 'Time-critical air cargo solutions with global network coverage.',
        fullDesc: 'When time is of the essence, our air freight services deliver. With partnerships across major airlines and access to cargo hubs worldwide, we provide express, consolidated, and charter air freight solutions tailored to your urgency and budget.',
        icon: 'FaPlane',
        features: [
            'Express Air Cargo',
            'Consolidated Shipments',
            'Charter Services',
            'Dangerous Goods Handling',
            'Temperature-Controlled',
            'Airport-to-Airport / Door-to-Door'
        ],
        color: '#0c328e',
    },
    {
        id: 'nvocc',
        title: 'NVOCC Services',
        shortDesc: 'Non-Vessel Operating Common Carrier services for flexible shipping.',
        fullDesc: 'As a licensed NVOCC, Empire Logistics offers flexible containerized shipping solutions without owning vessels. We negotiate competitive rates, manage container logistics, and provide bills of lading — giving you the agility of a carrier with the personalized service of a freight forwarder.',
        icon: 'FaGlobeAmericas',
        features: [
            'Competitive Freight Rates',
            'Container Management',
            'Bill of Lading Issuance',
            'Consolidation Services',
            'De-consolidation',
            'Inland Transportation'
        ],
        color: '#f06f1f',
    },
    {
        id: 'warehousing',
        title: 'Warehousing',
        shortDesc: 'Secure, scalable warehousing and distribution solutions.',
        fullDesc: 'Our strategically located warehousing facilities offer secure storage, inventory management, and distribution services. Whether you need short-term staging or long-term storage, our technology-driven approach ensures your goods are safe, tracked, and ready for dispatch.',
        icon: 'FaWarehouse',
        features: [
            'Bonded & Free Zone Storage',
            'Inventory Management',
            'Pick & Pack Services',
            'Cross-Docking',
            'Temperature-Controlled Units',
            'Real-time Stock Visibility'
        ],
        color: '#0c328e',
    },
    {
        id: 'railway-cargo',
        title: 'Railway Cargo',
        shortDesc: 'Cost-effective railway freight for bulk and container cargo.',
        fullDesc: 'Leverage India\'s expanding rail network for cost-effective cargo movement. We handle rail freight for bulk commodities, containerized cargo, and specialized shipments with seamless integration to road and sea transport modes.',
        icon: 'FaTrain',
        features: [
            'Container Rake Booking',
            'Bulk Commodity Transport',
            'Multi-modal Integration',
            'Siding Operations',
            'Rake Loading/Unloading',
            'GPS Tracking'
        ],
        color: '#f06f1f',
    },
    {
        id: 'ltl-ftl',
        title: 'LTL / FTL Transport',
        shortDesc: 'Flexible road transport — Less Than Load or Full Truck Load.',
        fullDesc: 'Whether you have a single pallet or need a full truck, our LTL and FTL services cover India\'s vast road network. With GPS-tracked vehicles, experienced drivers, and flexible scheduling, we ensure your cargo reaches its destination safely and on time.',
        icon: 'FaTruck',
        features: [
            'Part Load (LTL)',
            'Full Load (FTL)',
            'GPS Fleet Tracking',
            'Cross-Border Road Transport',
            'Last Mile Delivery',
            'Express & Economy Options'
        ],
        color: '#0c328e',
    },
    {
        id: 'container-transport',
        title: 'Container Transport',
        shortDesc: 'Domestic container movement between ports, ICDs, and facilities.',
        fullDesc: 'Specialized in the movement of containers between ports, Inland Container Depots (ICDs), Container Freight Stations (CFS), and final destinations. Our fleet management and logistics planning ensure timely container delivery with full visibility.',
        icon: 'FaBoxes',
        features: [
            'Port-to-ICD Movement',
            'CFS Operations',
            'Empty Container Repositioning',
            'Overweight Container Handling',
            'Reefer Container Transport',
            'Container Yard Management'
        ],
        color: '#f06f1f',
    },
];

export default services;
