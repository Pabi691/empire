<?php
// backend/admin/settings.php
session_start();
require_once '../db.php';
require_once 'layout.php';

$allKeys = ['rate_air','rate_ocean','rate_road','rate_air_cbm','rate_ocean_cbm','rate_road_cbm'];
$placeholders = implode(',', array_fill(0, count($allKeys), '?'));
$stmt = $pdo->prepare("SELECT setting_key, setting_value FROM settings WHERE setting_key IN ($placeholders)");
$stmt->execute($allKeys);
$rates = $stmt->fetchAll(PDO::FETCH_KEY_PAIR);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $fields = ['rate_air','rate_ocean','rate_road','rate_air_cbm','rate_ocean_cbm','rate_road_cbm'];
    try {
        $pdo->beginTransaction();
        $updateStmt = $pdo->prepare("REPLACE INTO settings (setting_key, setting_value) VALUES (?, ?)");
        foreach ($fields as $key) {
            $updateStmt->execute([$key, trim($_POST[$key] ?? '')]);
        }
        $pdo->commit();
        $_SESSION['success'] = "Rates updated successfully!";
        header("Location: settings.php");
        exit;
    } catch(PDOException $e) {
        $pdo->rollBack();
        $_SESSION['error'] = "Error: " . $e->getMessage();
    }
}

renderHeader('Settings & Rates');
?>

<div class="mb-6">
    <h3 class="text-2xl font-bold text-slate-800">Settings & Rates</h3>
    <p class="text-slate-500 mt-1">Set separate rates for CFT and CBM calculators. Leave blank or 0 to hide that transport mode button on the frontend.</p>
</div>

<?php if (isset($_SESSION['success'])): ?>
    <div class="bg-emerald-50 text-emerald-700 border border-emerald-200 px-4 py-3 rounded-lg mb-6 flex items-center gap-3">
        <i class="fas fa-check-circle text-emerald-500"></i>
        <span><?= htmlspecialchars($_SESSION['success']) ?></span>
        <?php unset($_SESSION['success']); ?>
    </div>
<?php endif; ?>
<?php if (isset($_SESSION['error'])): ?>
    <div class="bg-red-50 text-red-700 border border-red-200 px-4 py-3 rounded-lg mb-6 flex items-center gap-3">
        <i class="fas fa-exclamation-circle text-red-500"></i>
        <span><?= htmlspecialchars($_SESSION['error']) ?></span>
        <?php unset($_SESSION['error']); ?>
    </div>
<?php endif; ?>

<form method="POST" class="space-y-6 max-w-3xl">

    <!-- CFT Rates -->
    <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div class="px-6 py-4 border-b border-slate-100 bg-blue-50 flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center text-sm"><i class="fas fa-ruler-combined"></i></div>
            <div>
                <h4 class="font-bold text-slate-800">CFT Calculator Rates</h4>
                <p class="text-xs text-slate-500">Rate per 1 CFT → Charged Weight (Kg). Leave 0 or blank to hide that mode button.</p>
            </div>
        </div>
        <div class="p-6 grid grid-cols-1 sm:grid-cols-3 gap-5">
            <?php foreach ([
                ['rate_air',   'Air Freight',   'fa-plane',  'blue',    '#0ea5e9'],
                ['rate_ocean', 'Ocean Freight', 'fa-ship',   'cyan',    '#2563eb'],
                ['rate_road',  'Road Transport','fa-truck',  'emerald', '#f59e0b'],
            ] as [$key, $label, $icon, $color, $hex]): ?>
            <div>
                <label class="block text-sm font-medium text-slate-700 mb-2"><?= $label ?></label>
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" style="color:<?= $hex ?>">
                        <i class="fas <?= $icon ?>"></i>
                    </div>
                    <input type="number" step="0.01" min="0" name="<?= $key ?>"
                           class="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                           placeholder="0.00"
                           value="<?= htmlspecialchars($rates[$key] ?? '') ?>">
                </div>
                <p class="text-xs text-slate-400 mt-1">0 or blank = button hidden</p>
            </div>
            <?php endforeach; ?>
        </div>
    </div>

    <!-- CBM Rates -->
    <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div class="px-6 py-4 border-b border-slate-100 bg-orange-50 flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-orange-500 text-white flex items-center justify-center text-sm"><i class="fas fa-cube"></i></div>
            <div>
                <h4 class="font-bold text-slate-800">CBM Calculator Rates</h4>
                <p class="text-xs text-slate-500">Rate per 1 CFT → Charged Weight (Kg) for CBM tab. Leave 0 or blank to hide that mode button.</p>
            </div>
        </div>
        <div class="p-6 grid grid-cols-1 sm:grid-cols-3 gap-5">
            <?php foreach ([
                ['rate_air_cbm',   'Air Freight',   'fa-plane', '#0ea5e9'],
                ['rate_ocean_cbm', 'Ocean Freight', 'fa-ship',  '#2563eb'],
                ['rate_road_cbm',  'Road Transport','fa-truck', '#f59e0b'],
            ] as [$key, $label, $icon, $hex]): ?>
            <div>
                <label class="block text-sm font-medium text-slate-700 mb-2"><?= $label ?></label>
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" style="color:<?= $hex ?>">
                        <i class="fas <?= $icon ?>"></i>
                    </div>
                    <input type="number" step="0.01" min="0" name="<?= $key ?>"
                           class="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 font-mono text-sm"
                           placeholder="0.00"
                           value="<?= htmlspecialchars($rates[$key] ?? '') ?>">
                </div>
                <p class="text-xs text-slate-400 mt-1">0 or blank = button hidden</p>
            </div>
            <?php endforeach; ?>
        </div>
    </div>

    <div class="flex justify-end">
        <button type="submit" class="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold shadow-md transition-all flex items-center gap-2">
            <i class="fas fa-save"></i> Save All Rates
        </button>
    </div>
</form>

<?php renderFooter(); ?>
