<?php
// backend/admin/settings.php
session_start();
require_once '../db.php';
require_once 'layout.php';

// Fetch current settings
$stmt = $pdo->query("SELECT setting_key, setting_value FROM settings WHERE setting_key IN ('rate_air', 'rate_ocean', 'rate_road')");
$rates = $stmt->fetchAll(PDO::FETCH_KEY_PAIR);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $rate_air = trim($_POST['rate_air']);
    $rate_ocean = trim($_POST['rate_ocean']);
    $rate_road = trim($_POST['rate_road']);

    try {
        $pdo->beginTransaction();
        $updateStmt = $pdo->prepare("REPLACE INTO settings (setting_key, setting_value) VALUES (?, ?)");
        $updateStmt->execute(['rate_air', $rate_air]);
        $updateStmt->execute(['rate_ocean', $rate_ocean]);
        $updateStmt->execute(['rate_road', $rate_road]);
        $pdo->commit();
        
        $_SESSION['success'] = "Freight Transport rates updated successfully!";
        header("Location: settings.php");
        exit;
    } catch(PDOException $e) {
        $pdo->rollBack();
        $_SESSION['error'] = "Error updating rates: " . $e->getMessage();
    }
}

renderHeader('Settings & Rates');
?>

<div class="mb-6 flex items-center justify-between">
    <div>
        <h3 class="text-2xl font-bold text-slate-800">Settings & Rates</h3>
        <p class="text-slate-500 mt-1">Manage core configuration and freight rates for the dashboard.</p>
    </div>
</div>

<?php if (isset($_SESSION['success'])): ?>
    <div class="bg-emerald-50 text-emerald-700 border border-emerald-200 px-4 py-3 rounded-lg mb-6 flex items-center gap-3">
        <i class="fas fa-check-circle text-emerald-500 text-lg"></i>
        <span><?= htmlspecialchars($_SESSION['success']) ?></span>
        <?php unset($_SESSION['success']); ?>
    </div>
<?php endif; ?>
<?php if (isset($_SESSION['error'])): ?>
    <div class="bg-red-50 text-red-700 border border-red-200 px-4 py-3 rounded-lg mb-6 flex items-center gap-3">
        <i class="fas fa-exclamation-circle text-red-500 text-lg"></i>
        <span><?= htmlspecialchars($_SESSION['error']) ?></span>
        <?php unset($_SESSION['error']); ?>
    </div>
<?php endif; ?>

<form method="POST" class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden max-w-2xl">
    <div class="p-6 md:p-8 space-y-6">
        <h4 class="text-lg font-semibold text-slate-800 border-b border-slate-100 pb-2 mb-4">Freight Calculator Rates</h4>
        <p class="text-sm text-slate-500 mb-6">These rates operate per 1 CFT calculation and will be pre-filled dynamically in the frontend Freight Calculator based on the transport mode chosen.</p>

        <div class="grid grid-cols-1 gap-6">
            <!-- Air Freight -->
            <div>
                <label class="block text-sm font-medium text-slate-700 mb-2">Air Freight Rate (1 CFT / Kg)</label>
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-blue-500">
                        <i class="fas fa-plane"></i>
                    </div>
                    <input type="number" step="0.01" name="rate_air" required class="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-slate-400 font-mono text-sm" placeholder="e.g. 5.50" value="<?= htmlspecialchars($rates['rate_air'] ?? '') ?>">
                </div>
            </div>

            <!-- Ocean Freight -->
            <div>
                <label class="block text-sm font-medium text-slate-700 mb-2">Ocean Freight Rate (1 CFT / Kg)</label>
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-cyan-500">
                        <i class="fas fa-ship"></i>
                    </div>
                    <input type="number" step="0.01" name="rate_ocean" required class="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 placeholder-slate-400 font-mono text-sm" placeholder="e.g. 2.00" value="<?= htmlspecialchars($rates['rate_ocean'] ?? '') ?>">
                </div>
            </div>

            <!-- Road Transport -->
            <div>
                <label class="block text-sm font-medium text-slate-700 mb-2">Road Transport Rate (1 CFT / Kg)</label>
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-emerald-500">
                        <i class="fas fa-truck"></i>
                    </div>
                    <input type="number" step="0.01" name="rate_road" required class="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 placeholder-slate-400 font-mono text-sm" placeholder="e.g. 1.50" value="<?= htmlspecialchars($rates['rate_road'] ?? '') ?>">
                </div>
            </div>
        </div>
    </div>
    
    <div class="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-end gap-3 rounded-b-xl">
        <button type="submit" class="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold shadow-md shadow-blue-500/30 transition-all transform hover:-translate-y-0.5 flex items-center gap-2 focus:ring-2 focus:ring-blue-500">
            <i class="fas fa-save"></i> Save Rates
        </button>
    </div>
</form>

<?php renderFooter(); ?>
