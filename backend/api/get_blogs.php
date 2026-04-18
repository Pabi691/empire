<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') { exit(0); }

require_once '../db.php';

try {
    $stmt = $pdo->query("SELECT id, title, slug, tag, excerpt, read_time, published_date, cover_image, status FROM blog_posts WHERE status='published' ORDER BY created_at DESC");
    echo json_encode($stmt->fetchAll());
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>
