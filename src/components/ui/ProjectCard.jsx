import React from 'react';
import { motion } from 'framer-motion';

export default function ProjectCard({ project, index = 0 }) {
    const statKeys = Object.keys(project.stats);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="group bg-white rounded-card overflow-hidden shadow-standard hover:shadow-hover transition-all duration-300 hover:-translate-y-1 border border-border-soft"
        >
            {/* Gradient header */}
            <div className="h-2 bg-gradient-to-r from-primary to-accent" />

            <div className="p-7">
                {/* Category badge */}
                <span className="inline-block px-3 py-1 rounded-pill text-xs font-accent font-medium uppercase tracking-wider text-primary bg-primary/10 mb-4">
                    {project.category}
                </span>

                <h3 className="font-heading font-bold text-lg text-text-primary mb-3">
                    {project.title}
                </h3>

                <p className="text-text-muted text-sm leading-relaxed mb-5">
                    {project.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-5">
                    {statKeys.map((key) => (
                        <div key={key} className="text-center p-2 bg-soft-gray rounded-general">
                            <div className="font-display text-lg text-primary">{project.stats[key]}</div>
                            <div className="text-[10px] uppercase tracking-wider text-text-muted font-accent">{key}</div>
                        </div>
                    ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                        <span
                            key={tag}
                            className="text-[11px] px-2.5 py-1 rounded-pill bg-dark-navy/5 text-text-muted font-medium"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
