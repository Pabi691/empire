<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') { exit(0); }
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); echo json_encode(['error'=>'Method not allowed']); exit; }

require_once '../db.php';

$body = json_decode(file_get_contents('php://input'), true);

$name        = trim($body['name'] ?? '');
$email       = trim($body['email'] ?? '');
$phone       = trim($body['phone'] ?? '');
$quotationNo = trim($body['quotationNo'] ?? '');
$calcType    = trim($body['calcType'] ?? '');     // 'cft' or 'cbm'
$transport   = trim($body['transportMode'] ?? '');
$packages    = intval($body['packages'] ?? 0);
$totalCft    = floatval($body['totalCft'] ?? 0);
$totalCbm    = floatval($body['totalCbm'] ?? 0);
$chargedWeight = floatval($body['chargedWeight'] ?? 0);
$rate        = floatval($body['rate'] ?? 0);

if (!$name || !$email || !$phone) {
    http_response_code(400);
    echo json_encode(['error' => 'Name, email and phone are required.']);
    exit;
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email address.']);
    exit;
}

try {
    $stmt = $pdo->prepare("
        INSERT INTO quotation_requests
            (quotation_no, name, email, phone, calc_type, transport_mode, packages, total_cft, total_cbm, charged_weight, rate, created_at)
        VALUES (?,?,?,?,?,?,?,?,?,?,?, NOW())
    ");
    $stmt->execute([$quotationNo, $name, $email, $phone, $calcType, $transport, $packages, $totalCft, $totalCbm, $chargedWeight, $rate]);
    echo json_encode(['success' => true, 'id' => $pdo->lastInsertId()]);
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>
