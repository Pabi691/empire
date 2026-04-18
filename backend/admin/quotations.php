<?php
session_start();
require_once '../db.php';
require_once 'layout.php';

$rows = $pdo->query("SELECT * FROM quotation_requests ORDER BY created_at DESC")->fetchAll();

renderHeader('Quotation Requests');
?>

<div class="flex items-center justify-between mb-6">
    <div>
        <h3 class="text-2xl font-bold text-slate-800">Quotation Requests</h3>
        <p class="text-slate-500 mt-1"><?= count($rows) ?> total request(s)</p>
    </div>
</div>

<div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
    <?php if (empty($rows)): ?>
    <div class="py-16 text-center text-slate-400">
        <i class="fas fa-file-invoice text-4xl mb-3 block opacity-30"></i>
        No quotation requests yet.
    </div>
    <?php else: ?>
    <div class="overflow-x-auto">
    <table class="w-full text-sm min-w-[900px]">
        <thead class="bg-slate-50 border-b border-slate-200">
            <tr>
                <th class="text-left px-4 py-3 text-slate-600 font-semibold">Quotation No</th>
                <th class="text-left px-4 py-3 text-slate-600 font-semibold">Name</th>
                <th class="text-left px-4 py-3 text-slate-600 font-semibold">Email</th>
                <th class="text-left px-4 py-3 text-slate-600 font-semibold">Phone</th>
                <th class="text-left px-4 py-3 text-slate-600 font-semibold">Type</th>
                <th class="text-left px-4 py-3 text-slate-600 font-semibold">Mode</th>
                <th class="text-left px-4 py-3 text-slate-600 font-semibold">Charged Wt.</th>
                <th class="text-left px-4 py-3 text-slate-600 font-semibold">Date</th>
            </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
            <?php foreach ($rows as $r): ?>
            <tr class="hover:bg-slate-50">
                <td class="px-4 py-3 font-mono text-xs text-blue-700"><?= htmlspecialchars($r['quotation_no']) ?></td>
                <td class="px-4 py-3 font-medium text-slate-800"><?= htmlspecialchars($r['name']) ?></td>
                <td class="px-4 py-3 text-slate-600"><?= htmlspecialchars($r['email']) ?></td>
                <td class="px-4 py-3 text-slate-600"><?= htmlspecialchars($r['phone']) ?></td>
                <td class="px-4 py-3"><span class="px-2 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-700"><?= strtoupper(htmlspecialchars($r['calc_type'])) ?></span></td>
                <td class="px-4 py-3 capitalize text-slate-600"><?= htmlspecialchars($r['transport_mode']) ?></td>
                <td class="px-4 py-3 font-mono text-slate-700"><?= htmlspecialchars($r['charged_weight']) ?> Kg</td>
                <td class="px-4 py-3 text-slate-400 text-xs"><?= htmlspecialchars($r['created_at']) ?></td>
            </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
    </div>
    <?php endif; ?>
</div>

<?php renderFooter(); ?>
