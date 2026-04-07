<?php
// backend/api/get_rates.php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

require_once '../db.php';

try {
    $stmt = $pdo->query("SELECT setting_key, setting_value FROM settings WHERE setting_key IN ('rate_air', 'rate_ocean', 'rate_road')");
    $rates = $stmt->fetchAll(PDO::FETCH_KEY_PAIR);
    
    echo json_encode([
        'air' => $rates['rate_air'] ?? '0',
        'ocean' => $rates['rate_ocean'] ?? '0',
        'road' => $rates['rate_road'] ?? '0'
    ]);
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Failed to fetch rates: " . $e->getMessage()]);
}
?>
