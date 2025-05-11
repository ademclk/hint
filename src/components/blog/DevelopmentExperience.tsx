import React, { forwardRef } from 'react';

const DevelopmentExperience = forwardRef<HTMLDivElement>((_, ref) => {
    return (
        <div ref={ref} className="mb-16">
            <h2 className="text-3xl font-semibold mb-6">Development Experience</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-100 dark:bg-neutral-900 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">Local Development</h3>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Instant local environment setup</li>
                        <li>Hot-reloading development server</li>
                        <li>Built-in debugging tools</li>
                    </ul>
                </div>
                <div className="bg-gray-100 dark:bg-neutral-900 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">Testing</h3>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Automated test generation</li>
                        <li>Property-based testing</li>
                        <li>Performance benchmarking</li>
                    </ul>
                </div>
                <div className="bg-gray-100 dark:bg-neutral-900 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">Deployment</h3>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>One-command deployment</li>
                        <li>Automatic scaling</li>
                        <li>Zero-downtime updates</li>
                    </ul>
                </div>
            </div>
        </div>
    );
});

DevelopmentExperience.displayName = 'DevelopmentExperience';

export default DevelopmentExperience; 