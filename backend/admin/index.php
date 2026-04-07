<?php
// backend/admin/index.php
session_start();
require_once '../db.php';
require_once 'layout.php';

$stmt = $pdo->query("SELECT * FROM services ORDER BY title ASC");
$services = $stmt->fetchAll();

renderHeader('Manage Services');
?>

<div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
    <div>
        <h3 class="text-xl font-bold text-slate-800">All Services</h3>
        <p class="text-sm text-slate-500 mt-1">Manage the services displayed on your website.</p>
    </div>
    <a href="add.php" class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-all shadow-md shadow-blue-500/30 flex items-center gap-2 transform hover:-translate-y-0.5">
        <i class="fas fa-plus"></i> Add New Service
    </a>
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

<div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
    <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
            <thead>
                <tr class="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-200">
                    <th class="px-6 py-4 font-semibold">Service Info</th>
                    <th class="px-6 py-4 font-semibold">Description</th>
                    <th class="px-6 py-4 font-semibold">Color</th>
                    <th class="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
                <?php if (count($services) > 0): ?>
                    <?php foreach ($services as $service): ?>
                    <tr class="hover:bg-slate-50/80 transition-colors group">
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="flex items-center gap-4">
                                <div class="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-sm" style="background-color: <?= htmlspecialchars($service['color']) ?>">
                                    <?php 
                                        $iconClass = strtolower(preg_replace('/([a-z])([A-Z])/', '$1-$2', $service['icon']));
                                        if ($service['icon'] == 'FaFileAlt') $iconClass = 'fa-file-alt';
                                        if ($service['icon'] == 'FaBoxes') $iconClass = 'fa-boxes';
                                        if ($service['icon'] == 'FaGlobeAmericas') $iconClass = 'fa-globe-americas';
                                        if (strpos($iconClass, 'fa-') !== 0) {
                                           $iconClass = 'fa-' . substr(strtolower($service['icon']), 2);
                                        }
                                    ?>
                                    <i class="fas <?= htmlspecialchars($iconClass) ?> text-xl"></i>
                                </div>
                                <div>
                                    <div class="font-bold text-slate-800 text-base"><?= htmlspecialchars($service['title']) ?></div>
                                    <div class="text-xs text-slate-500 font-mono mt-0.5 px-2 py-0.5 bg-slate-100 rounded inline-block border border-slate-200" title="Service ID"><?= htmlspecialchars($service['id']) ?></div>
                                </div>
                            </div>
                        </td>
                        <td class="px-6 py-4 text-sm text-slate-600 max-w-xs truncate" title="<?= htmlspecialchars($service['shortDesc']) ?>">
                            <?= htmlspecialchars($service['shortDesc']) ?>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="flex items-center gap-2">
                                <div class="w-5 h-5 rounded hover:scale-110 transition-transform cursor-help border border-slate-300 shadow-sm" style="background-color: <?= htmlspecialchars($service['color']) ?>" title="<?= htmlspecialchars($service['color']) ?>"></div>
                                <span class="text-xs font-mono text-slate-500"><?= htmlspecialchars($service['color']) ?></span>
                            </div>
                        </td>
                        <td class="px-6 py-4 text-right whitespace-nowrap">
                            <div class="flex items-center justify-end gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                                <a href="edit.php?id=<?= urlencode($service['id']) ?>" class="p-2 text-blue-600 bg-blue-50 border border-blue-100 hover:bg-blue-600 hover:text-white rounded-lg transition-colors focus:ring-2 focus:ring-blue-500" title="Edit Service">
                                    <i class="fas fa-edit w-4"></i>
                                </a>
                                <form action="delete.php" method="POST" class="inline" onsubmit="return confirm('WARNING: Are you sure you want to delete this service? This action cannot be undone.');">
                                    <input type="hidden" name="id" value="<?= htmlspecialchars($service['id']) ?>">
                                    <button type="submit" class="p-2 text-red-600 bg-red-50 border border-red-100 hover:bg-red-600 hover:text-white rounded-lg transition-colors focus:ring-2 focus:ring-red-500" title="Delete Service">
                                        <i class="fas fa-trash-alt w-4"></i>
                                    </button>
                                </form>
                            </div>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                <?php else: ?>
                    <tr>
                        <td colspan="4" class="px-6 py-12 text-center">
                            <div class="flex flex-col items-center justify-center gap-3">
                                <div class="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                                    <i class="fas fa-ghost text-2xl"></i>
                                </div>
                                <p class="text-slate-600 font-medium">No services found.</p>
                                <a href="add.php" class="text-blue-600 hover:text-blue-700 font-medium border-b border-blue-600/30 hover:border-blue-600 transition-colors">Create your first service now</a>
                            </div>
                        </td>
                    </tr>
                <?php endif; ?>
            </tbody>
        </table>
    </div>
</div>

<?php renderFooter(); ?>
