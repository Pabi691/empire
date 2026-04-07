<?php
// backend/admin/delete.php
session_start();
require_once '../db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['id'])) {
    $id = $_POST['id'];
    
    try {
        $stmt = $pdo->prepare("DELETE FROM services WHERE id = ?");
        $stmt->execute([$id]);
        
        $_SESSION['success'] = "Service deleted successfully!";
    } catch(PDOException $e) {
        $_SESSION['error'] = "Error deleting service: " . $e->getMessage();
    }
} else if (isset($_GET['id'])) {
    // If somehow accessed directly via GET
    $id = $_GET['id'];
    
    try {
        $stmt = $pdo->prepare("DELETE FROM services WHERE id = ?");
        $stmt->execute([$id]);
        
        $_SESSION['success'] = "Service deleted successfully!";
    } catch(PDOException $e) {
        $_SESSION['error'] = "Error deleting service: " . $e->getMessage();
    }
}

header("Location: index.php");
exit;
?>
