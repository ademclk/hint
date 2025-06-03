import { Link } from 'react-router-dom';
// import { sdk } from '@farcaster/frame-sdk'; // No longer used
import blogPostsData from '../blogData.json'; // Import the generated blog data

interface BlogPostEntry {
  slug: string;
  title: string;
  date: string; // Dates are already formatted as ISO strings in JSON
  category: string;
  author: string;
  authorRole?: string;
  readTime?: string;
  excerpt: string;
}

const posts: BlogPostEntry[] = blogPostsData.map(post => ({
  ...post,
  // Format date for display
  date: new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }),
}));

export default function Blog() {
  return (
    <div className="min-h-screen bg-background pb-24">
      {/* New Minimalist Header */}
      <div className="py-16 text-center max-w-3xl mx-auto px-6">
        <h1 className="text-4xl md:text-6xl font-medium tracking-tight mb-4">
          Articles
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Thoughts and updates on quantum education and related topics.
        </p>
      </div>

      {/* Blog Post Listing */}
      <div className="max-w-2xl mx-auto px-6 py-12">
        {posts.length > 0 ? (
          posts.map((post) => (
            <Link key={post.slug} to={`/blog/${post.slug}`} className="block group">
              <article className="mb-12 md:mb-16">
                <h2 className="text-2xl md:text-3xl font-medium mb-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                <div className="text-sm text-muted-foreground mb-3">
                  <span>{post.author}</span>
                  <span className="mx-2">·</span>
                  <time dateTime={new Date(post.date).toISOString()}>{post.date}</time>
                  {/* Ensure date is in a machine-readable format for dateTime if it's not already */}
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {post.excerpt}
                </p>
              </article>
            </Link>
          ))
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              No articles published yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

