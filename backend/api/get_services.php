<?php
// backend/api/get_services.php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

require_once '../db.php';

try {
    $stmt = $pdo->query("SELECT * FROM services");
    $services = $stmt->fetchAll();

    foreach ($services as &$service) {
        $featureStmt = $pdo->prepare("SELECT feature FROM service_features WHERE service_id = ?");
        $featureStmt->execute([$service['id']]);
        $features = $featureStmt->fetchAll(PDO::FETCH_COLUMN);
        $service['features'] = $features;
    }

    echo json_encode($services);
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Failed to fetch services: " . $e->getMessage()]);
}
?>
