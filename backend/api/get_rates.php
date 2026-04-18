<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') { exit(0); }

require_once '../db.php';

try {
    $keys = ['rate_air','rate_ocean','rate_road','rate_air_cbm','rate_ocean_cbm','rate_road_cbm'];
    $placeholders = implode(',', array_fill(0, count($keys), '?'));
    $stmt = $pdo->prepare("SELECT setting_key, setting_value FROM settings WHERE setting_key IN ($placeholders)");
    $stmt->execute($keys);
    $rows = $stmt->fetchAll(PDO::FETCH_KEY_PAIR);

    // Helper: treat '0', '', null as null (hidden)
    $v = fn($k) => (isset($rows[$k]) && $rows[$k] !== '' && floatval($rows[$k]) > 0) ? $rows[$k] : null;

    echo json_encode([
        'cft' => ['air' => $v('rate_air'),     'ocean' => $v('rate_ocean'),     'road' => $v('rate_road')],
        'cbm' => ['air' => $v('rate_air_cbm'), 'ocean' => $v('rate_ocean_cbm'), 'road' => $v('rate_road_cbm')],
    ]);
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}
?>
