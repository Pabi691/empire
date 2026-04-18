<?php
session_start();
require_once '../db.php';
require_once 'layout.php';

$action = $_GET['action'] ?? 'list';
$id     = intval($_GET['id'] ?? 0);

/* ── helpers ── */
function slugify($text) {
    $text = strtolower(trim($text));
    $text = preg_replace('/[^a-z0-9\s-]/', '', $text);
    $text = preg_replace('/[\s-]+/', '-', $text);
    return trim($text, '-');
}

/* ── DELETE ── */
if ($action === 'delete' && $id) {
    $pdo->prepare("DELETE FROM blog_posts WHERE id=?")->execute([$id]);
    $_SESSION['success'] = 'Post deleted.';
    header("Location: blog.php"); exit;
}

/* ── SAVE (add/edit) ── */
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $title       = trim($_POST['title'] ?? '');
    $tag         = trim($_POST['tag'] ?? '');
    $excerpt     = trim($_POST['excerpt'] ?? '');
    $content     = trim($_POST['content'] ?? '');
    $read_time   = trim($_POST['read_time'] ?? '');
    $cover_image = trim($_POST['cover_image'] ?? '');
    $status      = $_POST['status'] === 'published' ? 'published' : 'draft';
    $pub_date    = trim($_POST['published_date'] ?? date('Y-m-d'));
    $slug        = slugify($title) . '-' . substr(uniqid(), -4);

    if (!$title) { $_SESSION['error'] = 'Title is required.'; }
    else {
        try {
            if ($id) {
                $pdo->prepare("UPDATE blog_posts SET title=?,tag=?,excerpt=?,content=?,read_time=?,cover_image=?,status=?,published_date=? WHERE id=?")
                    ->execute([$title,$tag,$excerpt,$content,$read_time,$cover_image,$status,$pub_date,$id]);
            } else {
                $pdo->prepare("INSERT INTO blog_posts (title,slug,tag,excerpt,content,read_time,cover_image,status,published_date,created_at) VALUES (?,?,?,?,?,?,?,?,?,NOW())")
                    ->execute([$title,$slug,$tag,$excerpt,$content,$read_time,$cover_image,$status,$pub_date]);
            }
            $_SESSION['success'] = $id ? 'Post updated.' : 'Post published.';
            header("Location: blog.php"); exit;
        } catch(PDOException $e) {
            $_SESSION['error'] = $e->getMessage();
        }
    }
}

/* ── FETCH for edit ── */
$post = null;
if (($action === 'edit') && $id) {
    $stmt = $pdo->prepare("SELECT * FROM blog_posts WHERE id=?");
    $stmt->execute([$id]);
    $post = $stmt->fetch();
}

/* ── LIST ── */
$posts = [];
if ($action === 'list') {
    $posts = $pdo->query("SELECT * FROM blog_posts ORDER BY created_at DESC")->fetchAll();
}

renderHeader('Blog Posts');
?>

<?php if (isset($_SESSION['success'])): ?>
<div class="bg-emerald-50 text-emerald-700 border border-emerald-200 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
    <i class="fas fa-check-circle"></i> <?= htmlspecialchars($_SESSION['success']) ?>
    <?php unset($_SESSION['success']); ?>
</div>
<?php endif; ?>
<?php if (isset($_SESSION['error'])): ?>
<div class="bg-red-50 text-red-700 border border-red-200 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
    <i class="fas fa-exclamation-circle"></i> <?= htmlspecialchars($_SESSION['error']) ?>
    <?php unset($_SESSION['error']); ?>
</div>
<?php endif; ?>

<?php if ($action === 'list'): ?>

<!-- LIST VIEW -->
<div class="flex items-center justify-between mb-6">
    <div>
        <h3 class="text-2xl font-bold text-slate-800">Blog Posts</h3>
        <p class="text-slate-500 mt-1"><?= count($posts) ?> post(s)</p>
    </div>
    <a href="blog.php?action=add" class="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold flex items-center gap-2 text-sm transition-all">
        <i class="fas fa-plus"></i> New Post
    </a>
</div>

<div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
    <?php if (empty($posts)): ?>
    <div class="py-16 text-center text-slate-400">
        <i class="fas fa-newspaper text-4xl mb-3 block opacity-30"></i>
        No blog posts yet. <a href="blog.php?action=add" class="text-blue-600 underline">Create one</a>.
    </div>
    <?php else: ?>
    <table class="w-full text-sm">
        <thead class="bg-slate-50 border-b border-slate-200">
            <tr>
                <th class="text-left px-5 py-3 text-slate-600 font-semibold">Title</th>
                <th class="text-left px-5 py-3 text-slate-600 font-semibold">Tag</th>
                <th class="text-left px-5 py-3 text-slate-600 font-semibold">Status</th>
                <th class="text-left px-5 py-3 text-slate-600 font-semibold">Date</th>
                <th class="px-5 py-3"></th>
            </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
            <?php foreach ($posts as $p): ?>
            <tr class="hover:bg-slate-50 transition-colors">
                <td class="px-5 py-3.5 font-medium text-slate-800"><?= htmlspecialchars($p['title']) ?></td>
                <td class="px-5 py-3.5"><span class="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold"><?= htmlspecialchars($p['tag']) ?></span></td>
                <td class="px-5 py-3.5">
                    <span class="px-2 py-0.5 rounded-full text-xs font-semibold <?= $p['status']==='published' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500' ?>">
                        <?= ucfirst($p['status']) ?>
                    </span>
                </td>
                <td class="px-5 py-3.5 text-slate-400"><?= htmlspecialchars($p['published_date']) ?></td>
                <td class="px-5 py-3.5 flex gap-2 justify-end">
                    <a href="blog.php?action=edit&id=<?= $p['id'] ?>" class="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors">
                        <i class="fas fa-edit mr-1"></i>Edit
                    </a>
                    <a href="blog.php?action=delete&id=<?= $p['id'] ?>" onclick="return confirm('Delete this post?')"
                       class="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-semibold transition-colors">
                        <i class="fas fa-trash mr-1"></i>Delete
                    </a>
                </td>
            </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
    <?php endif; ?>
</div>

<?php else: ?>

<!-- ADD / EDIT FORM -->
<div class="flex items-center gap-3 mb-6">
    <a href="blog.php" class="text-slate-400 hover:text-slate-600"><i class="fas fa-arrow-left"></i></a>
    <h3 class="text-2xl font-bold text-slate-800"><?= $id ? 'Edit Post' : 'New Post' ?></h3>
</div>

<form method="POST" class="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl">

    <!-- Main content -->
    <div class="lg:col-span-2 space-y-5">
        <div class="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
            <div>
                <label class="block text-sm font-semibold text-slate-700 mb-1.5">Post Title *</label>
                <input type="text" name="title" required class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm" placeholder="Enter post title" value="<?= htmlspecialchars($post['title'] ?? '') ?>">
            </div>
            <div>
                <label class="block text-sm font-semibold text-slate-700 mb-1.5">Excerpt (short summary)</label>
                <textarea name="excerpt" rows="3" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm resize-none" placeholder="Brief description shown on the blog card..."><?= htmlspecialchars($post['excerpt'] ?? '') ?></textarea>
            </div>
            <div>
                <label class="block text-sm font-semibold text-slate-700 mb-1.5">Full Content (HTML supported)</label>
                <textarea name="content" rows="14" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm font-mono resize-y" placeholder="Full article content. You can use basic HTML tags like <p>, <h2>, <ul>, <li>, <strong>, <em>..."><?= htmlspecialchars($post['content'] ?? '') ?></textarea>
                <p class="text-xs text-slate-400 mt-1">Basic HTML tags supported: &lt;p&gt;, &lt;h2&gt;, &lt;h3&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;blockquote&gt;</p>
            </div>
        </div>
    </div>

    <!-- Sidebar options -->
    <div class="space-y-5">
        <div class="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
            <h4 class="font-bold text-slate-700 text-sm border-b border-slate-100 pb-2">Post Settings</h4>
            <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1">Status</label>
                <select name="status" class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500">
                    <option value="draft" <?= ($post['status'] ?? '') === 'draft' ? 'selected' : '' ?>>Draft</option>
                    <option value="published" <?= ($post['status'] ?? '') === 'published' ? 'selected' : '' ?>>Published</option>
                </select>
            </div>
            <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1">Category / Tag</label>
                <input type="text" name="tag" class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" placeholder="e.g. Cross-Border" value="<?= htmlspecialchars($post['tag'] ?? '') ?>">
            </div>
            <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1">Read Time</label>
                <input type="text" name="read_time" class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" placeholder="5 min read" value="<?= htmlspecialchars($post['read_time'] ?? '') ?>">
            </div>
            <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1">Published Date</label>
                <input type="date" name="published_date" class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" value="<?= htmlspecialchars($post['published_date'] ?? date('Y-m-d')) ?>">
            </div>
            <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1">Cover Image URL</label>
                <input type="text" name="cover_image" class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono" placeholder="/svc-freight-forwarding.png" value="<?= htmlspecialchars($post['cover_image'] ?? '') ?>">
                <p class="text-xs text-slate-400 mt-1">Path relative to /public or full URL</p>
            </div>
        </div>

        <div class="flex flex-col gap-2">
            <button type="submit" class="w-full px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all">
                <i class="fas fa-save"></i> <?= $id ? 'Update Post' : 'Publish Post' ?>
            </button>
            <a href="blog.php" class="w-full px-5 py-2.5 border border-slate-300 text-slate-600 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 hover:bg-slate-50 transition-all">
                Cancel
            </a>
        </div>
    </div>
</form>

<?php endif; ?>

<?php renderFooter(); ?>
