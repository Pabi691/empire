<?php
// backend/setup_database.php
require_once 'db.php';

try {
    // 1. Create the services table
    $sqlServices = "
    CREATE TABLE IF NOT EXISTS services (
        id VARCHAR(50) PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        shortDesc TEXT,
        fullDesc TEXT,
        icon VARCHAR(50),
        color VARCHAR(20)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    ";
    $pdo->exec($sqlServices);
    echo "Table 'services' created or already exists.<br>";

    // 2. Create the service_features table
    $sqlFeatures = "
    CREATE TABLE IF NOT EXISTS service_features (
        id INT AUTO_INCREMENT PRIMARY KEY,
        service_id VARCHAR(50),
        feature VARCHAR(255),
        FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    ";
    $pdo->exec($sqlFeatures);
    echo "Table 'service_features' created or already exists.<br>";

    // Check if services are already populated to prevent duplicates
    $stmt = $pdo->query("SELECT COUNT(*) FROM services");
    $count = $stmt->fetchColumn();

    if ($count == 0) {
        // Insert initial data based on src/data/services.js
        $initialData = [
            [
                'id' => 'freight-forwarding',
                'title' => 'Freight Forwarding',
                'shortDesc' => 'End-to-end ocean freight solutions across major global trade lanes.',
                'fullDesc' => 'Empire Logistics provides comprehensive freight forwarding services spanning major international trade lanes. From FCL to LCL shipments, we handle documentation, customs coordination, and door-to-door delivery with precision. Our MTO license (DGS/4022) ensures compliance at every step.',
                'icon' => 'FaShip',
                'features' => ['FCL & LCL Shipments', 'Multi-modal Transport', 'Real-time Tracking', 'Documentation Support', 'Door-to-Door Delivery', 'Trade Lane Optimization'],
                'color' => '#0c328e'
            ],
            [
                'id' => 'custom-clearance',
                'title' => 'Custom Clearance',
                'shortDesc' => 'Swift and compliant customs clearance for hassle-free trade.',
                'fullDesc' => 'Navigate complex customs regulations with our expert clearance team. We handle all documentation, duty calculations, and regulatory compliance to ensure your goods clear customs swiftly. Our deep relationships with customs authorities across India, Bangladesh, Nepal, and Bhutan set us apart.',
                'icon' => 'FaFileAlt',
                'features' => ['Import & Export Clearance', 'Duty Calculation', 'Regulatory Compliance', 'HS Code Classification', 'Bonded Warehousing', 'AEO Facilitation'],
                'color' => '#f06f1f'
            ],
            [
                'id' => 'air-freight',
                'title' => 'Air Freight',
                'shortDesc' => 'Time-critical air cargo solutions with global network coverage.',
                'fullDesc' => 'When time is of the essence, our air freight services deliver. With partnerships across major airlines and access to cargo hubs worldwide, we provide express, consolidated, and charter air freight solutions tailored to your urgency and budget.',
                'icon' => 'FaPlane',
                'features' => ['Express Air Cargo', 'Consolidated Shipments', 'Charter Services', 'Dangerous Goods Handling', 'Temperature-Controlled', 'Airport-to-Airport / Door-to-Door'],
                'color' => '#0c328e'
            ],
            [
                'id' => 'nvocc',
                'title' => 'NVOCC Services',
                'shortDesc' => 'Non-Vessel Operating Common Carrier services for flexible shipping.',
                'fullDesc' => 'As a licensed NVOCC, Empire Logistics offers flexible containerized shipping solutions without owning vessels. We negotiate competitive rates, manage container logistics, and provide bills of lading — giving you the agility of a carrier with the personalized service of a freight forwarder.',
                'icon' => 'FaGlobeAmericas',
                'features' => ['Competitive Freight Rates', 'Container Management', 'Bill of Lading Issuance', 'Consolidation Services', 'De-consolidation', 'Inland Transportation'],
                'color' => '#f06f1f'
            ],
            [
                'id' => 'warehousing',
                'title' => 'Warehousing',
                'shortDesc' => 'Secure, scalable warehousing and distribution solutions.',
                'fullDesc' => 'Our strategically located warehousing facilities offer secure storage, inventory management, and distribution services. Whether you need short-term staging or long-term storage, our technology-driven approach ensures your goods are safe, tracked, and ready for dispatch.',
                'icon' => 'FaWarehouse',
                'features' => ['Bonded & Free Zone Storage', 'Inventory Management', 'Pick & Pack Services', 'Cross-Docking', 'Temperature-Controlled Units', 'Real-time Stock Visibility'],
                'color' => '#0c328e'
            ],
            [
                'id' => 'railway-cargo',
                'title' => 'Railway Cargo',
                'shortDesc' => 'Cost-effective railway freight for bulk and container cargo.',
                'fullDesc' => 'Leverage India\'s expanding rail network for cost-effective cargo movement. We handle rail freight for bulk commodities, containerized cargo, and specialized shipments with seamless integration to road and sea transport modes.',
                'icon' => 'FaTrain',
                'features' => ['Container Rake Booking', 'Bulk Commodity Transport', 'Multi-modal Integration', 'Siding Operations', 'Rake Loading/Unloading', 'GPS Tracking'],
                'color' => '#f06f1f'
            ],
            [
                'id' => 'ltl-ftl',
                'title' => 'LTL / FTL Transport',
                'shortDesc' => 'Flexible road transport — Less Than Load or Full Truck Load.',
                'fullDesc' => 'Whether you have a single pallet or need a full truck, our LTL and FTL services cover India\'s vast road network. With GPS-tracked vehicles, experienced drivers, and flexible scheduling, we ensure your cargo reaches its destination safely and on time.',
                'icon' => 'FaTruck',
                'features' => ['Part Load (LTL)', 'Full Load (FTL)', 'GPS Fleet Tracking', 'Cross-Border Road Transport', 'Last Mile Delivery', 'Express & Economy Options'],
                'color' => '#0c328e'
            ],
            [
                'id' => 'container-transport',
                'title' => 'Container Transport',
                'shortDesc' => 'Domestic container movement between ports, ICDs, and facilities.',
                'fullDesc' => 'Specialized in the movement of containers between ports, Inland Container Depots (ICDs), Container Freight Stations (CFS), and final destinations. Our fleet management and logistics planning ensure timely container delivery with full visibility.',
                'icon' => 'FaBoxes',
                'features' => ['Port-to-ICD Movement', 'CFS Operations', 'Empty Container Repositioning', 'Overweight Container Handling', 'Reefer Container Transport', 'Container Yard Management'],
                'color' => '#f06f1f'
            ]
        ];

        $stmtService = $pdo->prepare("INSERT INTO services (id, title, shortDesc, fullDesc, icon, color) VALUES (?, ?, ?, ?, ?, ?)");
        $stmtFeature = $pdo->prepare("INSERT INTO service_features (service_id, feature) VALUES (?, ?)");

        $pdo->beginTransaction();
        try {
            foreach ($initialData as $service) {
                $stmtService->execute([
                    $service['id'],
                    $service['title'],
                    $service['shortDesc'],
                    $service['fullDesc'],
                    $service['icon'],
                    $service['color']
                ]);

                foreach ($service['features'] as $feature) {
                    $stmtFeature->execute([$service['id'], $feature]);
                }
            }
            $pdo->commit();
            echo "Initial data inserted successfully.<br>";
        } catch (Exception $e) {
            $pdo->rollBack();
            echo "Error inserting initial data: " . $e->getMessage() . "<br>";
        }
    } else {
        echo "Data already exists. Skipping insertion to avoid duplicates.<br>";
    }

    // 3. quotation_requests table
    $pdo->exec("
    CREATE TABLE IF NOT EXISTS quotation_requests (
        id INT AUTO_INCREMENT PRIMARY KEY,
        quotation_no VARCHAR(30),
        name VARCHAR(150) NOT NULL,
        email VARCHAR(200) NOT NULL,
        phone VARCHAR(30) NOT NULL,
        calc_type VARCHAR(10),
        transport_mode VARCHAR(20),
        packages INT DEFAULT 0,
        total_cft DECIMAL(10,2) DEFAULT 0,
        total_cbm DECIMAL(10,2) DEFAULT 0,
        charged_weight DECIMAL(10,2) DEFAULT 0,
        rate DECIMAL(10,2) DEFAULT 0,
        created_at DATETIME NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    ");
    echo "Table 'quotation_requests' created or already exists.<br>";

    // 4. blog_posts table
    $pdo->exec("
    CREATE TABLE IF NOT EXISTS blog_posts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        tag VARCHAR(100),
        excerpt TEXT,
        content LONGTEXT,
        read_time VARCHAR(30),
        cover_image VARCHAR(500),
        status ENUM('draft','published') DEFAULT 'draft',
        published_date DATE,
        created_at DATETIME NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    ");
    echo "Table 'blog_posts' created or already exists.<br>";

    // 5. Ensure CBM rate settings keys exist
    $cbmKeys = ['rate_air_cbm','rate_ocean_cbm','rate_road_cbm'];
    $ins = $pdo->prepare("INSERT IGNORE INTO settings (setting_key, setting_value) VALUES (?,?)");
    foreach ($cbmKeys as $k) { $ins->execute([$k, '0']); }
    echo "CBM rate settings initialised.<br>";

    echo "<h3>Setup Complete!</h3>";
    echo "<p><a href='admin/index.php'>Go to Admin Dashboard</a></p>";

} catch(PDOException $e) {
    die("Database error during setup: " . $e->getMessage());
}
?>
