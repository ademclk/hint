import React, { forwardRef } from 'react';

const TechnicalArchitecture = forwardRef<HTMLDivElement>((_, ref) => {
    return (
        <div ref={ref} className="mb-16">
            <h2 className="text-3xl font-semibold mb-6">Technical Architecture</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-100 dark:bg-neutral-900 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">DOTVM (Dotlanth Virtual Machine)</h3>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Custom bytecode interpreter for efficient dot execution</li>
                        <li>Built-in concurrency support with actor model</li>
                        <li>Hot-reloading capabilities for instant updates</li>
                        <li>Memory-safe execution environment</li>
                    </ul>
                </div>
                <div className="bg-gray-100 dark:bg-neutral-900 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">DOTDB (Dotlanth Database)</h3>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Distributed key-value store with ACID compliance</li>
                        <li>Built-in versioning and conflict resolution</li>
                        <li>Automatic sharding and replication</li>
                        <li>Zero-configuration setup</li>
                    </ul>
                </div>
            </div>
        </div>
    );
});

TechnicalArchitecture.displayName = 'TechnicalArchitecture';

export default TechnicalArchitecture; 