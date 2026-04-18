import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaClock, FaTag, FaArrowLeft, FaArrowRight, FaCalendarAlt, FaShare, FaLinkedin, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import Button from '../components/ui/Button';

export default function BlogDetailPage() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [related, setRelated] = useState([]);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [readProgress, setReadProgress] = useState(0);

    useEffect(() => {
        setLoading(true);
        setPost(null);
        setNotFound(false);
        fetch(`${import.meta.env.VITE_API_BASE_URL || 'https://ihwtest.kyleinfotech.co.in'}/api/get_blog.php?slug=${encodeURIComponent(slug)}`)
            .then(r => {
                if (r.status === 404) { setNotFound(true); setLoading(false); return null; }
                return r.json();
            })
            .then(data => {
                if (data && !data.error) setPost(data);
                else if (data?.error) setNotFound(true);
                setLoading(false);
            })
            .catch(() => { setNotFound(true); setLoading(false); });
    }, [slug]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BASE_URL || 'https://ihwtest.kyleinfotech.co.in'}/api/get_blogs.php`)
            .then(r => r.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setRelated(data.filter(b => b.slug !== slug).slice(0, 3));
                }
            })
            .catch(() => {});
    }, [slug]);

    useEffect(() => {
        const handleScroll = () => {
            const el = document.getElementById('blog-content');
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const total = el.offsetHeight;
            const scrolled = Math.max(0, -rect.top);
            setReadProgress(Math.min(100, (scrolled / total) * 100));
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-soft-gray">
            <div className="flex flex-col items-center gap-4">
                <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <span className="text-text-muted text-sm font-accent">Loading article...</span>
            </div>
        </div>
    );

    if (notFound || !post) return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-soft-gray">
            <div className="text-center">
                <div className="text-7xl font-heading font-extrabold text-primary/10 mb-2">404</div>
                <h2 className="font-heading font-bold text-2xl text-text-primary mb-2">Post not found</h2>
                <p className="text-text-muted text-sm mb-6">This article may have been removed or the link is incorrect.</p>
                <div className="flex gap-3 justify-center">
                    <Button variant="outline" icon={<FaArrowLeft />} onClick={() => navigate('/blogs')}>All Stories</Button>
                    <Button variant="primary" onClick={() => navigate('/')}>Go Home</Button>
                </div>
            </div>
        </div>
    );

    return (
        <>
            {/* Reading Progress Bar */}
            <div className="fixed top-0 left-0 right-0 z-[100] h-0.5 bg-border-soft">
                <motion.div
                    className="h-full bg-accent"
                    style={{ width: `${readProgress}%` }}
                    transition={{ duration: 0.1 }}
                />
            </div>

            {/* Hero */}
            <section className="relative min-h-[55vh] flex items-end overflow-hidden -mt-20 pt-20">
                {post.cover_image ? (
                    <img src={post.cover_image} alt={post.title}
                        className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-dark-navy via-primary to-accent/40" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/65 to-slate-900/20" />

                <div className="container-empire relative z-10 pb-14">
                    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        {/* Back */}
                        <button onClick={() => navigate('/blogs')}
                            className="flex items-center gap-2 text-white/60 hover:text-white text-sm mb-5 transition-colors cursor-pointer group">
                            <FaArrowLeft className="text-xs group-hover:-translate-x-0.5 transition-transform" /> Back to All Stories
                        </button>

                        {/* Tag */}
                        {post.tag && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-pill text-xs font-accent uppercase tracking-wider bg-accent/20 border border-accent/30 text-accent mb-4">
                                <FaTag className="text-[10px]" />{post.tag}
                            </span>
                        )}

                        {/* Title */}
                        <h1 className="font-heading font-extrabold text-3xl md:text-5xl lg:text-6xl text-white max-w-4xl leading-tight mb-5">
                            {post.title}
                        </h1>

                        {/* Meta */}
                        <div className="flex flex-wrap items-center gap-4 text-white/50 text-sm">
                            {post.published_date && (
                                <span className="flex items-center gap-1.5">
                                    <FaCalendarAlt className="text-xs text-accent" />{post.published_date}
                                </span>
                            )}
                            {post.read_time && (
                                <span className="flex items-center gap-1.5">
                                    <FaClock className="text-xs text-accent" />{post.read_time}
                                </span>
                            )}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Content Layout */}
            <section className="bg-white section-padding" id="blog-content">
                <div className="container-empire">
                    <div className="grid lg:grid-cols-[1fr_300px] gap-12 max-w-6xl mx-auto">

                        {/* Main Content */}
                        <div>
                            {/* Excerpt / Lead */}
                            {post.excerpt && (
                                <motion.p
                                    initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                                    className="text-text-muted text-lg md:text-xl leading-relaxed border-l-4 border-accent pl-5 mb-10 italic font-heading"
                                >
                                    {post.excerpt}
                                </motion.p>
                            )}

                            {/* HTML Content */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                                className="prose prose-slate max-w-none
                                    prose-headings:font-heading prose-headings:text-text-primary prose-headings:font-bold
                                    prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-border-soft
                                    prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                                    prose-p:mb-5 prose-p:text-base prose-p:text-text-muted prose-p:leading-relaxed
                                    prose-ul:pl-5 prose-ul:mb-5 prose-li:mb-2 prose-li:text-text-muted
                                    prose-ol:pl-5 prose-ol:mb-5
                                    prose-strong:text-text-primary prose-strong:font-semibold
                                    prose-blockquote:border-l-4 prose-blockquote:border-accent prose-blockquote:pl-5 prose-blockquote:italic prose-blockquote:text-text-muted prose-blockquote:bg-soft-gray prose-blockquote:py-2 prose-blockquote:rounded-r-general
                                    prose-img:rounded-card prose-img:shadow-standard
                                    prose-a:text-primary prose-a:font-medium hover:prose-a:text-accent"
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />

                            {/* Share */}
                            <div className="mt-12 pt-8 border-t border-border-soft">
                                <p className="text-text-muted text-xs font-accent uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <FaShare className="text-accent" /> Share this article
                                </p>
                                <div className="flex gap-2 flex-wrap">
                                    <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                                        target="_blank" rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-pill bg-[#0077B5]/10 text-[#0077B5] text-sm font-medium hover:bg-[#0077B5]/20 transition-colors border border-[#0077B5]/20">
                                        <FaLinkedin /> LinkedIn
                                    </a>
                                    <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`}
                                        target="_blank" rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-pill bg-black/5 text-black text-sm font-medium hover:bg-black/10 transition-colors border border-black/10">
                                        <FaTwitter /> X / Twitter
                                    </a>
                                    <a href={`https://wa.me/?text=${encodeURIComponent(post.title + ' ' + shareUrl)}`}
                                        target="_blank" rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-pill bg-[#25D366]/10 text-[#25D366] text-sm font-medium hover:bg-[#25D366]/20 transition-colors border border-[#25D366]/20">
                                        <FaWhatsapp /> WhatsApp
                                    </a>
                                </div>
                            </div>

                            {/* CTA */}
                            <div className="mt-8 flex flex-wrap gap-3">
                                <Button variant="primary" icon={<FaArrowRight />} onClick={() => navigate('/contact')}>
                                    Get a Free Quote
                                </Button>
                                <Button variant="outline" icon={<FaArrowLeft />} onClick={() => navigate('/blogs')}>
                                    All Stories
                                </Button>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <aside className="space-y-8">

                            {/* Article Info */}
                            <div className="bg-soft-gray rounded-card p-5 border border-border-soft">
                                <h4 className="font-heading font-bold text-text-primary text-sm mb-3 uppercase tracking-wide">About This Article</h4>
                                <div className="space-y-2 text-sm text-text-muted">
                                    {post.published_date && (
                                        <div className="flex items-center gap-2">
                                            <FaCalendarAlt className="text-accent text-xs flex-shrink-0" />
                                            <span>{post.published_date}</span>
                                        </div>
                                    )}
                                    {post.read_time && (
                                        <div className="flex items-center gap-2">
                                            <FaClock className="text-accent text-xs flex-shrink-0" />
                                            <span>{post.read_time}</span>
                                        </div>
                                    )}
                                    {post.tag && (
                                        <div className="flex items-center gap-2">
                                            <FaTag className="text-accent text-xs flex-shrink-0" />
                                            <span>{post.tag}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* CTA Box */}
                            <div className="rounded-card p-5 border border-primary/20 overflow-hidden relative"
                                style={{ background: 'linear-gradient(135deg, #05102e 0%, #0c328e 100%)' }}>
                                <div className="relative z-10">
                                    <p className="font-accent text-xs text-accent uppercase tracking-wider mb-2">Empire Logistics</p>
                                    <h4 className="font-heading font-bold text-white text-base mb-3 leading-snug">
                                        Need a cross-border logistics solution?
                                    </h4>
                                    <p className="text-white/60 text-xs leading-relaxed mb-4">
                                        From India to Nepal, Bhutan, Bangladesh and beyond — we move your cargo with precision.
                                    </p>
                                    <button onClick={() => navigate('/contact')}
                                        className="w-full py-2.5 px-4 rounded-pill bg-accent text-dark-navy text-sm font-bold font-heading hover:bg-accent/90 transition-colors cursor-pointer">
                                        Contact Us Today
                                    </button>
                                </div>
                            </div>

                            {/* Related Posts */}
                            {related.length > 0 && (
                                <div>
                                    <h4 className="font-heading font-bold text-text-primary text-sm mb-4 uppercase tracking-wide">More Stories</h4>
                                    <div className="space-y-4">
                                        {related.map((r) => (
                                            <motion.div
                                                key={r.id || r.slug}
                                                whileHover={{ x: 4 }}
                                                transition={{ duration: 0.2 }}
                                                onClick={() => navigate(`/blog/${r.slug}`)}
                                                className="flex gap-3 cursor-pointer group"
                                            >
                                                <div className="w-16 h-16 rounded-general overflow-hidden flex-shrink-0">
                                                    <img src={r.cover_image || '/svc-freight-forwarding.png'} alt={r.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-xs text-text-muted mb-1">{r.published_date}</p>
                                                    <h5 className="font-heading font-semibold text-text-primary text-xs leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                                                        {r.title}
                                                    </h5>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                    <button onClick={() => navigate('/blogs')}
                                        className="mt-4 text-primary text-xs font-semibold flex items-center gap-1 hover:gap-2 transition-all cursor-pointer">
                                        View all stories <FaArrowRight className="text-[10px]" />
                                    </button>
                                </div>
                            )}
                        </aside>
                    </div>
                </div>
            </section>
        </>
    );
}
