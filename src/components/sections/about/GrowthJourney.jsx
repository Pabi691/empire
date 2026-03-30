import React from 'react';
import SectionTitle from '../../ui/SectionTitle';
import TimelineItem from '../../ui/TimelineItem';
import milestones from '../../../data/milestones';

export default function GrowthJourney() {
    return (
        <section className="section-padding bg-white">
            <div className="container-empire">
                <SectionTitle
                    label="Growth Story"
                    title="Our Journey So Far"
                    subtitle="Every milestone marks a step forward in our commitment to logistics excellence."
                />
                <div className="max-w-4xl mx-auto">
                    {milestones.map((milestone, i) => (
                        <TimelineItem key={i} milestone={milestone} index={i} isLast={i === milestones.length - 1} />
                    ))}
                </div>
            </div>
        </section>
    );
}
