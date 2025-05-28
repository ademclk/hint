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
              Articles
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
              Exploring quantum concepts through clear, intuitive explanations.
            </p>
          </header>
        </div>
      </div>

      {/* Featured Article Section */}
      <div className="container mx-auto px-6 -mt-8 relative z-20">
        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 max-w-4xl mx-auto">
          {posts.length > 0 && (
            <article className="animate-[fade-in_0.6s_ease-out_forwards]">
              <Link 
                to={`/blog/${posts[0].slug}`}
                className="block p-8 md:p-10"
              >
                <div className="flex flex-col items-start">
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-6">
                    {posts[0].category}
                    <span className="ml-2 px-2 py-0.5 rounded-full bg-primary/20 text-primary/90">New</span>
                  </div>
                  
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium mb-4">
                    {posts[0].title}
                  </h2>
                  
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
                    <time dateTime={posts[0].date}>{posts[0].date}</time>
                    <span className="inline-block w-1 h-1 rounded-full bg-muted-foreground/50"></span>
                    <span className="text-primary hover:underline">
                      @ademclk
                    </span>
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed mb-6 text-base sm:text-lg max-w-3xl">
                    Discover the HINT Protocol, a framework for quantum education that leverages collective human intelligence to make complex quantum concepts more intuitive and accessible. Unlike traditional educational approaches, HINT incorporates diverse perspectives from learners themselves.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-8 text-base sm:text-lg max-w-3xl">
                    Today, we're launching our Farcaster mini app as the first implementation of HINT Protocol, featuring interactive quantum experiments, community contributions, and personalized learning paths.
                  </p>
                  
                  <div className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-medium text-base rounded-full hover:bg-primary/90 transition-all duration-200 group">
                    <span>Read full article</span>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </Link>
            </article>
          )}
          
          {posts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">
                No articles published yet. Check back soon for updates.
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Connect & Contribute Section */}
      <div className="container mx-auto px-6 mt-16">
        <div className="bg-card border border-border rounded-2xl p-8 max-w-3xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-lg sm:text-xl font-medium mb-3">Stay Updated</h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-6">
                Follow <span className="text-primary">@ademclk</span> on Farcaster for the latest updates on HINT Protocol and quantum computing.
              </p>
              <a 
                href="https://farcaster.xyz/ademclk" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-2.5 bg-primary text-primary-foreground font-medium text-sm rounded-full transition-all duration-200 hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98]"
                onClick={async (e) => {
                  try {
                    const isMiniApp = await sdk.isInMiniApp();
                    if (isMiniApp) {
                      e.preventDefault();
                      // Create a cast about following instead since followUser isn't available
                      await sdk.actions.composeCast({
                        text: "I'm following @ademclk to stay updated on HINT Protocol - a new approach to quantum education!",
                        embeds: ["https://farcaster.xyz/ademclk"]
                      });
                    }
                  } catch (error) {
                    console.error('Error interacting with Farcaster:', error);
                  }
                }}
              >
                Follow on Farcaster
              </a>
            </div>
            
            <div className="text-center md:text-left">
              <h3 className="text-lg sm:text-xl font-medium mb-3">Connect Your Wallet</h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-6">
                Explore quantum experiments and contribute your insights by connecting your wallet. HINT Protocol supports both standard wallet connections and Farcaster authentication.
              </p>
              <button 
                className="inline-flex items-center justify-center px-6 py-2.5 bg-secondary text-secondary-foreground font-medium text-sm rounded-full transition-all duration-200 hover:bg-secondary/90 hover:scale-[1.02] active:scale-[0.98] border border-border"
                onClick={async () => {
                  try {
                    // This button would typically use the ConnectMenu component that integrates with Wagmi
                    // It supports both injected wallets (MetaMask) and Farcaster Frame connector
                    // For now, just alert the user about wallet connection
                    alert('Wallet connection would be implemented using Wagmi with injected and farcasterFrame connectors');
                    
                    // If in Farcaster mini app, we could also try to use the Farcaster authentication
                    const isMiniApp = await sdk.isInMiniApp();
                    if (isMiniApp) {
                      // In a real implementation, this would integrate with the ConnectMenu component
                      console.log('Using Farcaster authentication in mini app environment');
                    }
                  } catch (error) {
                    console.error('Error connecting wallet:', error);
                  }
                }}
              >
                Connect Wallet
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

