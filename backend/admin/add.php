<?php
// backend/admin/add.php
session_start();
require_once '../db.php';
require_once 'layout.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = preg_replace('/[^a-z0-9-]/', '', strtolower($_POST['id']));
    $title = trim($_POST['title']);
    $shortDesc = trim($_POST['shortDesc']);
    $fullDesc = trim($_POST['fullDesc']);
    $icon = trim($_POST['icon']);
    $color = trim($_POST['color']);
    $features = isset($_POST['features']) ? $_POST['features'] : [];

    // Basic Validation
    if (empty($id) || empty($title)) {
        $_SESSION['error'] = "Service ID and Title are required.";
    } else {
        try {
            // Check if ID exists
            $stmt = $pdo->prepare("SELECT COUNT(*) FROM services WHERE id = ?");
            $stmt->execute([$id]);
            if ($stmt->fetchColumn() > 0) {
                $_SESSION['error'] = "Service ID already exists.";
            } else {
                $pdo->beginTransaction();

                $stmt = $pdo->prepare("INSERT INTO services (id, title, shortDesc, fullDesc, icon, color) VALUES (?, ?, ?, ?, ?, ?)");
                $stmt->execute([$id, $title, $shortDesc, $fullDesc, $icon, $color]);

                if (!empty($features)) {
                    $featureStmt = $pdo->prepare("INSERT INTO service_features (service_id, feature) VALUES (?, ?)");
                    foreach ($features as $feature) {
                        $feature = trim($feature);
                        if (!empty($feature)) {
                            $featureStmt->execute([$id, $feature]);
                        }
                    }
                }

                $pdo->commit();
                $_SESSION['success'] = "Service added successfully!";
                header("Location: index.php");
                exit;
            }
        } catch (PDOException $e) {
            $pdo->rollBack();
            $_SESSION['error'] = "Error adding service: " . $e->getMessage();
        }
    }
}

renderHeader('Add New Service');
?>

<div class="mb-6 flex items-center justify-between">
    <div>
        <h3 class="text-2xl font-bold text-slate-800">Add Service</h3>
        <p class="text-slate-500 mt-1">Create a new logistics service offering.</p>
    </div>
    <a href="index.php" class="px-4 py-2 text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 flex items-center gap-2 transition-colors focus:ring-2 focus:ring-slate-200">
        <i class="fas fa-arrow-left text-sm"></i> Back
    </a>
</div>

<?php if (isset($_SESSION['error'])): ?>
    <div class="bg-red-50 text-red-700 border border-red-200 px-4 py-3 rounded-lg mb-6 flex items-center gap-3">
        <i class="fas fa-exclamation-circle text-red-500 text-lg"></i>
        <span><?= htmlspecialchars($_SESSION['error']) ?></span>
        <?php unset($_SESSION['error']); ?>
    </div>
<?php endif; ?>

<form method="POST" class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
    <div class="p-6 md:p-8 space-y-8">
        
        <!-- Basic Info Section -->
        <div>
            <h4 class="text-lg font-semibold text-slate-800 border-b border-slate-100 pb-2 mb-4">Basic Information</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label class="block text-sm font-medium text-slate-700 mb-2">Service ID <span class="text-red-500">*</span></label>
                    <input type="text" name="id" required class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm placeholder-slate-400 bg-slate-50 focus:bg-white transition-colors" placeholder="e.g. freight-forwarding" value="<?= htmlspecialchars($_POST['id'] ?? '') ?>">
                    <p class="text-xs text-slate-500 mt-1">Lowercase alphanumeric dash-separated key.</p>
                </div>
                <div>
                    <label class="block text-sm font-medium text-slate-700 mb-2">Title <span class="text-red-500">*</span></label>
                    <input type="text" name="title" required class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-slate-400" placeholder="e.g. Freight Forwarding" value="<?= htmlspecialchars($_POST['title'] ?? '') ?>">
                </div>
            </div>
            
            <div class="mt-6">
                <label class="block text-sm font-medium text-slate-700 mb-2">Short Description</label>
                <input type="text" name="shortDesc" class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-slate-400" placeholder="Brief summary (1 sentence)" value="<?= htmlspecialchars($_POST['shortDesc'] ?? '') ?>">
            </div>

            <div class="mt-6">
                <label class="block text-sm font-medium text-slate-700 mb-2">Full Description</label>
                <textarea name="fullDesc" rows="4" class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-y placeholder-slate-400"><?= htmlspecialchars($_POST['fullDesc'] ?? '') ?></textarea>
            </div>
        </div>

        <!-- Design Section -->
        <div>
            <h4 class="text-lg font-semibold text-slate-800 border-b border-slate-100 pb-2 mb-4">Design Attributes</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label class="block text-sm font-medium text-slate-700 mb-2">React Icon Component</label>
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-blue-500">
                            <i class="fab fa-react disabled"></i>
                        </div>
                        <input type="text" name="icon" class="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-slate-400 font-mono text-sm" placeholder="e.g. FaShip" value="<?= htmlspecialchars($_POST['icon'] ?? '') ?>">
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-medium text-slate-700 mb-2">Theme Color</label>
                    <div class="flex items-center gap-3">
                        <input type="color" name="color" class="h-10 w-16 p-1 bg-white border border-slate-300 rounded-lg cursor-pointer hover:border-blue-400 focus:ring-2 focus:ring-blue-500" value="<?= htmlspecialchars($_POST['color'] ?? '#0c328e') ?>">
                        <span class="text-xs font-mono text-slate-500">Select accent color</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Features Section -->
        <div>
            <div class="flex items-center justify-between border-b border-slate-100 pb-2 mb-4">
                <h4 class="text-lg font-semibold text-slate-800">Features Checklist</h4>
                <button type="button" onclick="addFeature()" class="text-sm px-3 py-1.5 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 border border-blue-200 transition-colors flex items-center gap-2 font-medium">
                    <i class="fas fa-plus w-3"></i> Add Feature
                </button>
            </div>
            
            <div id="features-container" class="space-y-3">
                <?php 
                $postFeatures = $_POST['features'] ?? ['']; 
                foreach ($postFeatures as $feat):
                ?>
                <div class="flex items-center gap-2 feature-row group">
                    <div class="flex-none flex items-center justify-center p-2 text-slate-300 group-focus-within:text-blue-500 transition-colors">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <input type="text" name="features[]" class="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-slate-300" placeholder="e.g. FCL & LCL Shipments" value="<?= htmlspecialchars($feat) ?>">
                    <button type="button" class="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors" onclick="this.parentElement.remove()" title="Remove Feature">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <?php endforeach; ?>
            </div>
        </div>
    </div>
    
    <div class="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-end gap-3 rounded-b-xl">
        <a href="index.php" class="px-5 py-2.5 text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 font-medium transition-colors focus:ring-2 focus:ring-slate-200">Cancel</a>
        <button type="submit" class="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold shadow-md shadow-blue-500/30 transition-all transform hover:-translate-y-0.5 flex items-center gap-2 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <i class="fas fa-save"></i> Save Service
        </button>
    </div>
</form>

<script>
function addFeature() {
    const container = document.getElementById('features-container');
    const div = document.createElement('div');
    div.className = 'flex items-center gap-2 feature-row group hide-opacity scale-95 transition-all duration-300';
    div.innerHTML = `
        <div class="flex-none flex items-center justify-center p-2 text-slate-300 group-focus-within:text-blue-500 transition-colors">
            <i class="fas fa-check-circle"></i>
        </div>
        <input type="text" name="features[]" class="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-slate-300" placeholder="New Feature" autofocus>
        <button type="button" class="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors" onclick="this.parentElement.remove()" title="Remove Feature">
            <i class="fas fa-times"></i>
        </button>
    `;
    container.appendChild(div);
    
    // Animate in
    setTimeout(() => {
        div.classList.remove('hide-opacity', 'scale-95');
        div.classList.add('opacity-100', 'scale-100');
    }, 10);
}
</script>

<?php renderFooter(); ?>
