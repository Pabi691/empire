<?php
// backend/setup_rates.php
require_once 'db.php';

try {
    $sqlSettings = "
    CREATE TABLE IF NOT EXISTS settings (
        setting_key VARCHAR(50) PRIMARY KEY,
        setting_value VARCHAR(255)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    ";
    $pdo->exec($sqlSettings);
    echo "Table 'settings' created or already exists.<br>";

    // Default rates
    $defaultRates = [
        'rate_air' => '5.50',
        'rate_ocean' => '2.00',
        'rate_road' => '1.50'
    ];

    $stmt = $pdo->prepare("INSERT IGNORE INTO settings (setting_key, setting_value) VALUES (?, ?)");
    
    foreach ($defaultRates as $key => $value) {
        $stmt->execute([$key, $value]);
    }
    echo "Default rates inserted (if not already existing).<br>";

    // Read the rates back
    $stmt = $pdo->query("SELECT * FROM settings");
    $settings = $stmt->fetchAll(PDO::FETCH_KEY_PAIR);
    echo "<pre>"; print_r($settings); echo "</pre>";

    echo "<p><a href='admin/settings.php'>Go to Settings Dashboard</a></p>";

} catch(PDOException $e) {
    die("Database error: " . $e->getMessage());
}
?>
