import React, { forwardRef } from 'react';

const DotVariants = forwardRef<HTMLDivElement>((_, ref) => {
    return (
        <div ref={ref} className="mb-16">
            <h2 className="text-3xl font-semibold mb-6">Dot Variants</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-100 dark:bg-neutral-900 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">ParaDots</h3>
                    <p className="mb-4">Parallelizable dots for high-performance computing:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Automatic parallelization</li>
                        <li>Resource optimization</li>
                        <li>Cross-dot communication</li>
                    </ul>
                </div>
                <div className="bg-gray-100 dark:bg-neutral-900 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">DataDots</h3>
                    <p className="mb-4">Dots that act as schemas and data sources:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Schema validation</li>
                        <li>Data transformation</li>
                        <li>Real-time updates</li>
                    </ul>
                </div>
                <div className="bg-gray-100 dark:bg-neutral-900 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">UILinks</h3>
                    <p className="mb-4">Auto-bound UI components to dots:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Automatic UI generation</li>
                        <li>Real-time updates</li>
                        <li>Responsive design</li>
                    </ul>
                </div>
            </div>
        </div>
    );
});

DotVariants.displayName = 'DotVariants';

export default DotVariants; 