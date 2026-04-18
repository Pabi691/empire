<?php
// backend/seed_data.php
// Run this once to create missing tables and insert dummy blog data
require_once 'db.php';

$errors = [];
$messages = [];

try {
    // 1. quotation_requests table
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
    $messages[] = "Table 'quotation_requests' created or already exists.";

    // 2. blog_posts table
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
    $messages[] = "Table 'blog_posts' created or already exists.";

    // 3. Insert dummy blogs (skip if already have data)
    $count = $pdo->query("SELECT COUNT(*) FROM blog_posts")->fetchColumn();

    if ($count == 0) {
        $blogs = [
            [
                'title'          => 'Navigating the India-Bangladesh Trade Corridor in 2025',
                'slug'           => 'india-bangladesh-trade-corridor-2025',
                'tag'            => 'Cross-Border',
                'excerpt'        => 'From Petrapole to Benapole — how technology and compliance expertise are reshaping PTL and FTL movement across the busiest land border in South Asia.',
                'read_time'      => '5 min read',
                'cover_image'    => '/svc-railway-cargo.png',
                'published_date' => '2025-04-10',
                'content'        => '
<h2>The Busiest Land Border in South Asia</h2>
<p>The Petrapole–Benapole crossing handles over 60% of India-Bangladesh bilateral trade, processing thousands of trucks daily. As volumes grow, so does the complexity of compliance, documentation, and real-time coordination.</p>

<h2>Key Challenges at Petrapole</h2>
<p>Exporters and importers face several recurring pain points:</p>
<ul>
  <li>Long queuing times due to manual documentation checks</li>
  <li>Discrepancies in HS code classification causing clearance delays</li>
  <li>Currency exchange and banking settlement bottlenecks</li>
  <li>Vehicle fitness and permit mismatches flagged at the gate</li>
</ul>

<h2>How Technology Is Reshaping the Corridor</h2>
<p>Integrated Check Posts (ICPs) equipped with RFID tagging and the ICEGATE portal have dramatically reduced dwell times. Empire Logistics uses pre-lodgement of shipping bills, electronic data interchange (EDI) with Customs, and live border intelligence to keep your cargo moving.</p>

<blockquote>In 2024, our average gate-to-gate clearance at Petrapole dropped from 18 hours to under 6 hours — thanks to pre-cleared documentation and dedicated liaison support.</blockquote>

<h2>PTL vs FTL: Which Is Right for Your Cargo?</h2>
<p>For smaller consignments, Part Truck Load (PTL) offers cost efficiency through consolidation. Full Truck Load (FTL) is ideal for time-sensitive or high-volume shipments. Our operations team at Petrapole assesses your cargo type, urgency, and classification to recommend the optimal mode.</p>

<h2>The Road Ahead</h2>
<p>With the Bangladesh–Bhutan–India–Nepal (BBIN) Motor Vehicle Agreement gradually coming into effect, multimodal connectivity across the corridor is set to expand. Empire Logistics is already positioned with licenses, depot infrastructure, and partner networks to serve this growing trade arc.</p>

<p>Contact us today to discuss your India-Bangladesh logistics requirements — from single-truck moves to large-scale distribution programs.</p>
'
            ],
            [
                'title'          => 'Transit Permits Demystified: Nepal & Bhutan Cargo Guide',
                'slug'           => 'transit-permits-nepal-bhutan-cargo-guide',
                'tag'            => 'TP Shipments',
                'excerpt'        => 'Everything exporters need to know about Transit Permit shipments — documentation, timelines, and how Empire Logistics keeps your cargo moving without delays.',
                'read_time'      => '7 min read',
                'cover_image'    => '/svc-ltl-ftl.png',
                'published_date' => '2025-03-18',
                'content'        => '
<h2>What Is a Transit Permit (TP)?</h2>
<p>A Transit Permit is a document issued by the destination country (Nepal or Bhutan) allowing goods originating in a third country (e.g., the USA, China, Germany) to transit through India without attracting Indian customs duties. It is a cornerstone of landlocked-country trade facilitation.</p>

<h2>The TP Process — Step by Step</h2>
<ul>
  <li><strong>Step 1:</strong> Importer in Nepal/Bhutan applies for TP from their customs authority</li>
  <li><strong>Step 2:</strong> TP document is shared with the Indian freight forwarder (Empire Logistics)</li>
  <li><strong>Step 3:</strong> Cargo arrives at Indian port (Kolkata, Haldia, or Nhava Sheva) — filed under "Transit" in ICEGATE</li>
  <li><strong>Step 4:</strong> Bond is executed at the port for the transit movement</li>
  <li><strong>Step 5:</strong> Cargo moves under seals to the land border (Panitanki for Nepal, Jaigaon for Bhutan)</li>
  <li><strong>Step 6:</strong> Bond discharged upon confirmation from border customs that cargo has crossed</li>
</ul>

<h2>Documents Required</h2>
<p>A complete TP shipment file includes:</p>
<ul>
  <li>Original Bill of Lading / Airway Bill</li>
  <li>Commercial Invoice and Packing List</li>
  <li>Transit Permit from Nepal/Bhutan customs</li>
  <li>Customs Bond (surety or bank guarantee)</li>
  <li>Vehicle fitness certificate and driver documents</li>
</ul>

<blockquote>Missing even one document at the border can hold your cargo for 2–5 days. Our pre-departure documentation audit eliminates surprises.</blockquote>

<h2>Common Delays and How We Prevent Them</h2>
<p>The most frequent causes of TP shipment delays are expired permits, seal tampering during transit, and weight discrepancies at the border weighbridge. Empire Logistics uses GPS-sealed trucks, pre-loaded weight certificates, and border liaison officers to eliminate each of these risks.</p>

<h2>Timelines to Expect</h2>
<p>Port to Nepal border (Panitanki/Raxaul): 3–5 days. Port to Bhutan border (Jaigaon): 2–4 days. These timelines assume complete documentation and no peak congestion at the border.</p>

<p>Reach out to our TP desk to get a customised timeline and rate for your next shipment to Nepal or Bhutan.</p>
'
            ],
            [
                'title'          => 'Land-Air & Sea-Air: The Smart Way to Cut Logistics Costs',
                'slug'           => 'land-air-sea-air-multimodal-logistics',
                'tag'            => 'Multimodal',
                'excerpt'        => "When ocean freight is too slow and air is too expensive, multimodal routing offers the best of both worlds. Here's how we build optimised routes.",
                'read_time'      => '6 min read',
                'cover_image'    => '/svc-freight-forwarding.png',
                'published_date' => '2025-02-22',
                'content'        => '
<h2>The Multimodal Advantage</h2>
<p>Pure air freight is fast but expensive — often 5–8x the cost of ocean freight. Pure ocean is economical but slow — 18–35 days from Asia to Europe. Multimodal routing breaks the trade-off by combining the best segments of each mode to hit your delivery window at a fraction of the all-air cost.</p>

<h2>Sea-Air Routing: How It Works</h2>
<p>In a typical Sea-Air route from China to the UK, cargo travels by ocean to Dubai (12–14 days), then by air from Dubai to London (1 day). Total transit: 13–15 days vs. 28 days all-sea, and 40–50% cheaper than all-air. Dubai, Singapore, and Colombo are the most common Sea-Air transhipment hubs.</p>

<blockquote>For our client exporting pharmaceutical components from Kolkata to Frankfurt, a Sea-Air route via Dubai saved 38% on freight costs while meeting a 16-day delivery requirement.</blockquote>

<h2>Land-Air Routing for South Asia</h2>
<p>For Nepal and Bhutan-bound cargo that needs to clear India quickly, a Land-Air combination moves goods by road to the nearest international airport (Kolkata or Delhi), then flies to the destination or to a connecting hub. This is particularly useful for time-sensitive retail and pharma shipments.</p>

<h2>Choosing the Right Combination</h2>
<p>The right multimodal route depends on:</p>
<ul>
  <li>Delivery deadline and transit time tolerance</li>
  <li>Cargo type (hazardous, temperature-sensitive, high-value)</li>
  <li>Origin and destination pairs</li>
  <li>Current carrier availability and rates</li>
</ul>

<h2>How Empire Logistics Plans Your Route</h2>
<p>Our routing desk runs cost-time optimisation across our carrier network before recommending a solution. We factor in hub transit times, airline schedules, and border congestion forecasts to give you a realistic, executable plan — not just a quote.</p>

<p>Talk to our multimodal team to explore how we can reshape your supply chain economics.</p>
'
            ],
        ];

        $stmt = $pdo->prepare("
            INSERT INTO blog_posts (title, slug, tag, excerpt, content, read_time, cover_image, status, published_date, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, 'published', ?, NOW())
        ");

        foreach ($blogs as $b) {
            $stmt->execute([
                $b['title'], $b['slug'], $b['tag'], $b['excerpt'],
                trim($b['content']), $b['read_time'], $b['cover_image'], $b['published_date']
            ]);
        }
        $messages[] = "3 dummy blog posts inserted.";
    } else {
        $messages[] = "Blog posts already exist ($count rows). Skipping dummy insert.";
    }

    // 4. Ensure settings table has CBM keys
    $ins = $pdo->prepare("INSERT IGNORE INTO settings (setting_key, setting_value) VALUES (?,?)");
    foreach (['rate_air_cbm','rate_ocean_cbm','rate_road_cbm'] as $k) {
        $ins->execute([$k, '0']);
    }
    $messages[] = "CBM rate settings initialised.";

} catch (PDOException $e) {
    $errors[] = $e->getMessage();
}
?>
<!DOCTYPE html>
<html>
<head>
<title>Seed Data</title>
<style>
body { font-family: sans-serif; max-width: 640px; margin: 60px auto; padding: 0 20px; }
.ok  { color: #16a34a; }
.err { color: #dc2626; }
a    { color: #0c328e; }
</style>
</head>
<body>
<h2>Empire Logistics — Database Seed</h2>
<?php foreach ($messages as $m): ?>
<p class="ok">✓ <?= htmlspecialchars($m) ?></p>
<?php endforeach; ?>
<?php foreach ($errors as $e): ?>
<p class="err">✗ <?= htmlspecialchars($e) ?></p>
<?php endforeach; ?>
<?php if (empty($errors)): ?>
<h3>Done!</h3>
<p><a href="admin/blog.php">→ Manage Blog Posts</a></p>
<p><a href="admin/index.php">→ Admin Dashboard</a></p>
<?php endif; ?>
</body>
</html>
