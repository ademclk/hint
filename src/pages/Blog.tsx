import React from 'react';
import { Link } from 'react-router-dom';

const Blog: React.FC = () => {
    const blogPosts = [
        {
            title: "Introducing Dotlanth",
            description: "Learn about our vision for simplifying software development with Dotlanth, a new foundation for your software projects.",
            date: "May 2025",
            slug: "introducing-dotlanth"
        }
        // Add more blog posts here as they are created
    ];

    return (
        <>
            <title>Blog | Synerthink</title>
            <meta name="description" content="Explore our latest insights, updates, and thoughts on software development, technology, and innovation at Synerthink." />
            <meta name="keywords" content="Synerthink, blog, software development, technology, innovation, Dotlanth" />
            <meta property="og:title" content="Blog | Synerthink" />
            <meta property="og:description" content="Explore our latest insights, updates, and thoughts on software development, technology, and innovation at Synerthink." />
            <meta property="og:type" content="website" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Blog | Synerthink" />
            <meta name="twitter:description" content="Explore our latest insights, updates, and thoughts on software development, technology, and innovation at Synerthink." />

            <div className="max-w-4xl mx-auto px-4 py-8 min-h-[calc(100vh-4rem)]">
                <h1 className="text-4xl font-bold mb-8">Blog</h1>
                <div className="space-y-8">
                    {blogPosts.map((post) => (
                        <article key={post.slug} className="border-b border-gray-200 dark:border-gray-700 pb-8">
                            <Link
                                to={`/blog/${post.slug}`}
                                className="group"
                            >
                                <h2 className="text-2xl font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {post.title}
                                </h2>
                            </Link>
                            <p className="text-gray-600 dark:text-gray-400 mb-2">{post.date}</p>
                            <p className="text-gray-700 dark:text-gray-300">{post.description}</p>
                            <Link
                                to={`/blog/${post.slug}`}
                                className="inline-block mt-4 text-blue-600 dark:text-blue-400 hover:underline"
                            >
                                Read more →
                            </Link>
                        </article>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Blog; 