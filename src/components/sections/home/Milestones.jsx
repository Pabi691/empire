import React from 'react';
import SectionTitle from '../../ui/SectionTitle';
import TimelineItem from '../../ui/TimelineItem';
import milestones from '../../../data/milestones';

export default function Milestones() {
    return (
        <section className="section-padding bg-white bg-grain relative">
            <div className="container-empire">
                <SectionTitle
                    label="Our Journey"
                    title="Key Milestones"
                    subtitle="From a startup vision to a multi-country logistics powerhouse — our journey of growth and excellence."
                />
                <div className="max-w-4xl mx-auto">
                    {milestones.map((milestone, i) => (
                        <TimelineItem
                            key={i}
                            milestone={milestone}
                            index={i}
                            isLast={i === milestones.length - 1}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
