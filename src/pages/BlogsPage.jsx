import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight, FaClock, FaTag } from 'react-icons/fa';

export default function BlogsPage() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BASE_URL || 'https://ihwtest.kyleinfotech.co.in'}/api/get_blogs.php`)
            .then(r => r.json())
            .then(data => { if (Array.isArray(data)) setBlogs(data); })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    return (
        <>
            {/* Hero */}
            <section className="relative py-24 -mt-20 pt-36 overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #05102e 0%, #0a1a50 60%, #0c328e 100%)' }}>
                <div className="absolute inset-0 pointer-events-none opacity-[0.05]"
                    style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
                <div className="container-empire relative z-10 text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <span className="inline-block font-accent text-xs uppercase tracking-[2px] text-accent font-medium mb-4 px-4 py-1.5 rounded-pill bg-white/10 border border-white/20">
                            Stories in Transit
                        </span>
                        <h1 className="font-heading font-extrabold text-4xl md:text-6xl text-white mb-4">Blogs</h1>
                        <p className="text-white/55 text-lg max-w-xl mx-auto">
                            Insights, guides, and stories from the world of cross-border logistics — written by the team that lives it every day.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Grid */}
            <section className="section-padding bg-soft-gray">
                <div className="container-empire">
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                        </div>
                    ) : blogs.length === 0 ? (
                        <div className="text-center py-20 text-text-muted text-sm">No posts published yet. Check back soon.</div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {blogs.map((blog, i) => (
                                <motion.article
                                    key={blog.id || i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.07 }}
                                    onClick={() => navigate(`/blog/${blog.slug}`)}
                                    className="group bg-white rounded-card overflow-hidden border border-border-soft shadow-standard hover:shadow-hover transition-all duration-300 cursor-pointer"
                                >
                                    <div className="aspect-[16/9] overflow-hidden relative">
                                        <img src={blog.cover_image || '/svc-freight-forwarding.png'} alt={blog.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
                                        {blog.tag && (
                                            <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-pill bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-accent uppercase tracking-wider">
                                                <FaTag className="text-accent text-[10px]" />{blog.tag}
                                            </span>
                                        )}
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center gap-3 text-text-muted text-xs mb-3">
                                            <span>{blog.published_date}</span>
                                            {blog.read_time && <><span>·</span><span className="flex items-center gap-1"><FaClock className="text-[10px]" />{blog.read_time}</span></>}
                                        </div>
                                        <h3 className="font-heading font-bold text-text-primary text-base leading-snug mb-3 group-hover:text-primary transition-colors duration-200">
                                            {blog.title}
                                        </h3>
                                        <p className="text-text-muted text-sm leading-relaxed line-clamp-3 mb-4">{blog.excerpt}</p>
                                        <div className="flex items-center gap-1.5 text-primary text-sm font-semibold group-hover:gap-3 transition-all duration-200">
                                            Read more <FaArrowRight className="text-xs" />
                                        </div>
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
