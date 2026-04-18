import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SectionTitle from '../../ui/SectionTitle';
import Button from '../../ui/Button';
import { FaArrowRight, FaClock, FaTag } from 'react-icons/fa';

export default function StoriesInTransit() {
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
        <section className="section-padding bg-soft-gray relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle, rgba(12,50,142,0.04) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

            <div className="container-empire relative z-10">
                <SectionTitle
                    label="Stories in Transit"
                    title="Blogs"
                    subtitle="Insights, guides, and stories from the world of cross-border logistics — written by the team that lives it every day."
                />

                {loading ? (
                    <div className="flex justify-center py-16">
                        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : blogs.length === 0 ? (
                    <div className="text-center py-16 text-text-muted text-sm">No posts published yet. Check back soon.</div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {blogs.slice(0, 3).map((blog, i) => (
                            <motion.article
                                key={blog.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                onClick={() => navigate(`/blog/${blog.slug}`)}
                                className="group bg-white rounded-card overflow-hidden border border-border-soft shadow-standard hover:shadow-hover transition-all duration-300 cursor-pointer"
                            >
                                <div className="aspect-[16/9] overflow-hidden relative">
                                    <img
                                        src={blog.cover_image || '/svc-freight-forwarding.png'}
                                        alt={blog.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
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
                                        {blog.read_time && (
                                            <><span>·</span><span className="flex items-center gap-1"><FaClock className="text-[10px]" />{blog.read_time}</span></>
                                        )}
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

                {!loading && blogs.length > 0 && (
                    <motion.div className="text-center mt-10" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                        <Button variant="outline" icon={<FaArrowRight />} onClick={() => navigate('/blogs')}>
                            View All Stories
                        </Button>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
