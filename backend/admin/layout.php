<?php
// backend/admin/layout.php
function renderHeader($title) {
    echo '<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>' . htmlspecialchars($title) . ' - Empire Admin</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        body { font-family: "Inter", system-ui, sans-serif; background-color: #f8fafc; }
    </style>
</head>
<body class="flex h-screen overflow-hidden text-slate-800">

    <!-- Sidebar -->
    <aside class="w-64 bg-slate-900 text-white flex flex-col hidden md:flex shadow-xl z-20">
        <div class="p-6 border-b border-slate-800 flex items-center justify-center">
            <h1 class="text-2xl font-bold text-white tracking-wide">Empire<span class="text-orange-500">Admin</span></h1>
        </div>
        <nav class="flex-1 px-4 py-6 space-y-2">
            <a href="index.php" class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-300 font-medium transition-colors border border-transparent hover:border-slate-700">
                <i class="fas fa-cubes w-5 text-center"></i> Services
            </a>
            <a href="settings.php" class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-300 font-medium transition-colors border border-transparent hover:border-slate-700">
                <i class="fas fa-cog w-5 text-center"></i> Settings & Rates
            </a>
            <a href="blog.php" class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-300 font-medium transition-colors border border-transparent hover:border-slate-700">
                <i class="fas fa-newspaper w-5 text-center"></i> Blog Posts
            </a>
            <a href="quotations.php" class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-300 font-medium transition-colors border border-transparent hover:border-slate-700">
                <i class="fas fa-file-invoice w-5 text-center"></i> Quotation Requests
            </a>
            <div class="pt-4 mt-4 border-t border-slate-800">
                <a href="../../index.html" class="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors border border-transparent" target="_blank">
                    <i class="fas fa-external-link-alt w-5 text-center"></i> View Website
                </a>
            </div>
        </nav>
        <div class="p-6 text-sm text-slate-500 border-t border-slate-800">
            &copy; ' . date("Y") . ' Empire Logistics
        </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col overflow-hidden relative">
        <!-- Top header -->
        <header class="bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200 h-16 flex items-center justify-between px-8 z-10 sticky top-0">
            <div class="flex items-center gap-4">
                <button class="md:hidden text-slate-500 hover:text-slate-700">
                    <i class="fas fa-bars text-xl"></i>
                </button>
                <h2 class="text-xl font-semibold text-slate-800">' . htmlspecialchars($title) . '</h2>
            </div>
            <div class="flex items-center gap-4">
                <div class="w-9 h-9 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 text-white flex items-center justify-center font-bold shadow-md">
                    EL
                </div>
            </div>
        </header>

        <!-- Content Area -->
        <div class="flex-1 overflow-auto p-4 md:p-8 bg-slate-50 w-full relative">
            <div class="max-w-6xl mx-auto">
';
}

function renderFooter() {
    echo '
            </div>
        </div>
    </main>
</body>
</html>';
}
?>
