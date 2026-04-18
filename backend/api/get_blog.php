<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') { exit(0); }

require_once '../db.php';

$slug = trim($_GET['slug'] ?? '');
if (!$slug) { http_response_code(400); echo json_encode(['error'=>'slug required']); exit; }

try {
    $stmt = $pdo->prepare("SELECT * FROM blog_posts WHERE slug=? AND status='published' LIMIT 1");
    $stmt->execute([$slug]);
    $post = $stmt->fetch();
    if (!$post) { http_response_code(404); echo json_encode(['error'=>'Not found']); exit; }
    echo json_encode($post);
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>
