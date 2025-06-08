import { Link } from 'react-router-dom';
import { sdk } from '@farcaster/frame-sdk';
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
  coverImage?: string;
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
    <div className="min-h-screen pb-24">
      {/* Hero section with subtle gradient */}
      <div className="relative overflow-hidden bg-secondary/50 dark:bg-card/50 pt-12 pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent"></div>
        <div className="container mx-auto px-6 relative z-10">
          <header className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight mb-4">
              Blog
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
              News and insights about quantum computing and related technologies.
            </p>
          </header>
        </div>
      </div>

      {/* Blog posts grid */}
      <div className="container mx-auto px-6 -mt-8 relative z-20">
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group animate-[fade-in_0.6s_ease-out_forwards]"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  opacity: 0
                }}
              >
                <article className="h-full bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
                  {post.coverImage ? (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="h-32 bg-gradient-to-r from-primary/20 to-secondary/20 flex items-center justify-center">
                      <span className="text-primary/70 text-lg font-medium">{post.category}</span>
                    </div>
                  )}

                  <div className="p-5 flex-grow flex flex-col">
                    <div className="flex justify-between items-start mb-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {post.category}
                      </span>
                      {post.readTime && (
                        <span className="text-xs text-muted-foreground">
                          {post.readTime}
                        </span>
                      )}
                    </div>

                    <h2 className="text-xl font-medium mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h2>

                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-grow">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-border/50">
                      <div className="flex items-center">
                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs text-primary mr-2">
                          {post.author.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-xs font-medium">
                          @{post.author}
                        </span>
                      </div>
                      <time className="text-xs text-muted-foreground">
                        {post.date}
                      </time>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-card border border-border rounded-xl p-10 text-center max-w-md mx-auto">
            <p className="text-muted-foreground">
              No articles published yet. Check back soon for updates.
            </p>
          </div>
        )}
      </div>

      {/* Subscribe section */}
      <div className="container mx-auto px-6 mt-16">
        <div className="bg-card border border-border rounded-2xl p-8 max-w-2xl mx-auto">
          <div className="text-center">
            <h3 className="text-xl font-medium mb-3">Subscribe to Updates</h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
              Follow me on Farcaster to get notified when new articles are published.
            </p>

            <a
              href="https://farcaster.xyz/ademclk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-medium text-sm rounded-full hover:bg-primary/90 transition-all duration-200 group"
              onClick={async (e) => {
                try {
                  const isMiniApp = await sdk.isInMiniApp();
                  if (isMiniApp) {
                    e.preventDefault();
                    await sdk.actions.composeCast({
                      text: "I'm following @ademclk to stay updated on quantum computing insights and news!",
                      embeds: ["https://farcaster.xyz/ademclk"]
                    });
                  }
                } catch (error) {
                  console.error('Error interacting with Farcaster:', error);
                }
              }}
            >
              <span>Follow on Farcaster</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

