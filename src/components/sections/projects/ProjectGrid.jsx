import React from 'react';
import SectionTitle from '../../ui/SectionTitle';
import ProjectCard from '../../ui/ProjectCard';
import projects from '../../../data/projects';

export default function ProjectGrid() {
    return (
        <section className="section-padding bg-soft-gray">
            <div className="container-empire">
                <SectionTitle
                    label="Case Studies"
                    title="Featured Projects"
                    subtitle="Discover how Empire Logistics delivers results across diverse trade corridors."
                />
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, i) => (
                        <ProjectCard key={project.id} project={project} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
