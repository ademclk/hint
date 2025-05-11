import React, { forwardRef } from 'react';

const FutureGoals = forwardRef<HTMLDivElement>((_, ref) => {
    return (
        <div ref={ref} className="mb-16">
            <h2 className="text-3xl font-semibold mb-6">Future Goals</h2>
            <div className="space-y-6">
                <div className="bg-gray-100 dark:bg-neutral-900 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">AI-Powered Development</h3>
                    <p className="mb-4">We're working on integrating AI capabilities to assist developers:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Automated code generation from natural language</li>
                        <li>Intelligent test case generation</li>
                        <li>Performance optimization suggestions</li>
                        <li>Security vulnerability detection</li>
                    </ul>
                </div>
                <div className="bg-gray-100 dark:bg-neutral-900 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">Zero-Knowledge Integration</h3>
                    <p className="mb-4">Advanced privacy features in development:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Private computation capabilities</li>
                        <li>Secure multi-party computation</li>
                        <li>Privacy-preserving analytics</li>
                    </ul>
                </div>
            </div>
        </div>
    );
});

FutureGoals.displayName = 'FutureGoals';

export default FutureGoals; 