import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
// import { sdk } from '@farcaster/frame-sdk'; // sdk is unused
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import matter from 'gray-matter';
import { ContributePanel } from '../components/ContributePanel';

// Interface for blog post data (frontmatter + content)
interface BlogPostData {
  slug: string;
  title: string;
  date: string;
  category: string;
  author: string;
  authorRole: string;
  readTime: string;
  excerpt?: string; // Excerpt is optional in frontmatter
  content: string; // This will be the main markdown content
}

// Function to load a blog post from a markdown file
async function loadBlogPost(slug: string): Promise<BlogPostData | null> {
  try {
    console.log(`Attempting to load blog post: /content/blog/${slug}.md`);
    const markdownModule = await import(`../content/blog/${slug}.md?raw`);
    const rawContent = markdownModule.default;

    // Parse frontmatter and content
    const { data, content: mainContent } = matter(rawContent);

    // Construct the BlogPostData object
    const postData: BlogPostData = {
      slug: slug,
      title: data.title || 'Untitled Post',
      date: data.date || new Date().toLocaleDateString(),
      category: data.category || 'Uncategorized',
      author: data.author || 'Anonymous',
      authorRole: data.authorRole || '',
      readTime: data.readTime || 'N/A',
      excerpt: data.excerpt || '',
      content: mainContent,
    };

    console.log('Successfully parsed blog post:', postData.title);
    return postData;
  } catch (error) {
    console.error('Error loading blog post:', error);
    return null;
  }
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) {
        setError('No blog post slug provided.');
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const loadedPostData = await loadBlogPost(slug);
        if (loadedPostData) {
          setPost(loadedPostData);
          setError(null); 
        } else {
          setError(`Blog post "${slug}" not found or failed to load.`);
          setPost(null);
        }
      } catch (e: any) {
        console.error('Error in fetchPost:', e);
        setError(`Failed to load blog post: ${e.message || 'Unknown error'}`);
        setPost(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [slug]);
  const [showContributePanel, setShowContributePanel] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-6rem)] flex items-center justify-center px-6">
        <div className="text-center max-w-xl">
          <h1 className="text-2xl font-medium mb-3">Loading Article...</h1>
          <p className="text-muted-foreground mb-8">
            Please wait while we load the article content.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-6rem)] flex items-center justify-center px-6">
        <div className="text-center max-w-xl bg-destructive/10 text-destructive p-8 rounded-lg">
          <h1 className="text-2xl font-medium mb-3">Error Loading Article</h1>
          <p className="mb-8">
            {error}
          </p>
          <Link 
            to="/blog" 
            className="inline-flex items-center text-destructive-foreground hover:underline"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1">
              <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
            </svg>
            Back to Articles
          </Link>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-[calc(100vh-6rem)] flex items-center justify-center px-6">
        <div className="text-center max-w-xl">
          <h1 className="text-2xl font-medium mb-3">Article Not Found</h1>
          <p className="text-muted-foreground mb-8">
            We couldn't find the article you're looking for.
          </p>
          <Link 
            to="/blog" 
            className="inline-flex items-center text-primary hover:underline"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1">
              <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
            </svg>
            Back to Articles
          </Link>
        </div>
      </div>
    );
  }

  // Markdown rendering function removed as we're using direct HTML now

  return (
    <div className="min-h-screen pb-24">
      {/* Hero section with gradient text title */}
      <div className="relative bg-secondary/30 dark:bg-card/30 pt-16 pb-12">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto animate-[fade-in_0.8s_ease-out_forwards]">
            <span className="text-xs font-medium text-primary/80 uppercase tracking-wider">{post.category}</span>
            
            <h1 className="text-3xl md:text-5xl font-medium tracking-tight mt-3 mb-5 bg-clip-text text-transparent bg-gradient-to-br from-primary via-primary/90 to-primary/70">
              {post.title}
            </h1>
            
            <div className="flex items-center text-sm text-muted-foreground">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium mr-2">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <a href="https://farcaster.xyz/ademclk" target="_blank" rel="noopener noreferrer" className="font-medium text-foreground hover:text-primary">{post.author}</a>
                  <span className="mx-1">·</span>
                  <span>{post.authorRole}</span>
                </div>
              </div>
              <span className="mx-3">|</span>
              <div className="flex items-center">
                <time>{post.date}</time>
                <span className="mx-1">·</span>
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main content */}
          <article className="lg:col-span-8 lg:col-start-3 animate-[fade-in_1s_ease-out_0.3s_forwards]">
            <div className="article-content max-w-none p-8 dark:bg-card/10 dark:rounded-xl dark:shadow-sm">
              <div className="article-markdown prose prose-lg dark:prose-invert max-w-none text-foreground dark:text-foreground">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({node, ...props}) => <h1 className="text-4xl font-bold mt-12 mb-6 text-primary dark:text-primary leading-tight" {...props} />,
                    h2: ({node, ...props}) => <h2 className="text-3xl font-semibold mt-10 mb-5 text-foreground dark:text-foreground leading-snug" {...props} />,
                    h3: ({node, ...props}) => <h3 className="text-2xl font-semibold mt-8 mb-4 text-foreground dark:text-foreground leading-snug" {...props} />,
                    p: ({node, ...props}) => <p className="text-lg text-muted-foreground dark:text-muted-foreground mb-6 leading-relaxed" {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc list-inside mb-6 pl-4 text-lg text-muted-foreground dark:text-muted-foreground space-y-2" {...props} />,
                    li: ({node, ...props}) => <li className="leading-relaxed" {...props} />,
                    blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-primary dark:border-primary pl-6 py-2 my-6 italic text-xl text-foreground dark:text-foreground bg-primary/5 dark:bg-primary/5 rounded-r-md" {...props} />,
                    // You can add more custom renderers for other elements like code, a, etc.
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </div>
            </div>
          </article>
        </div>
        <div className="max-w-3xl mx-auto mt-12">
          {showContributePanel ? (
            <div className="animate-[fade-in_0.3s_ease-out_forwards]">
              <ContributePanel 
                conceptId={post.slug} 
                conceptName={post.title}
                onClose={() => setShowContributePanel(false)}
              />
            </div>
          ) : (
            <div className="bg-secondary/30 dark:bg-card/30 rounded-2xl p-6 md:p-8 text-center">
              <h3 className="text-xl font-medium mb-2">Human In The Loop</h3>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Help improve our quantum explanations by sharing your understanding.
                Your contribution matters in building a better learning experience for everyone.
              </p>
              <button
                onClick={() => setShowContributePanel(true)}
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-medium text-base rounded-full shadow-sm hover:bg-primary/90 transition-all duration-200 ease-in-out hover:scale-[1.02] active:scale-[0.98]"
              >
                Contribute Your Perspective
              </button>
            </div>
          )}
        </div>

        
        <div className="max-w-3xl mx-auto mt-8">
          <button
            onClick={async () => {
              if (!post) return; // Ensure post is defined
              try {
                // Use Farcaster SDK to compose a cast about this article
                // await sdk.actions.composeCast({
                //   text: `I'm reading "${post.title}" on HINT Protocol - a new approach to quantum education where humans help refine explanations through shared understanding.`,
                //   embeds: [`https://ademonurcelik.github.io/hint/blog/${post.slug}`]
                // });
                console.log('Farcaster SDK action call commented out.');
              } catch (error) {
                console.error('Error casting:', error);
              }
            }}
            className="w-full flex items-center justify-center px-5 py-3 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
          >
            Cast about this article
          </button>
        </div>
       
        
        {/* Article footer */}
        <div className="max-w-3xl mx-auto mt-8 pt-8 border-t border-border">
          <div className="flex justify-between items-center">
            <Link 
              to="/blog" 
              className="inline-flex items-center text-primary hover:underline"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1">
                <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
              </svg>
              Back to Articles
            </Link>

            <div className="flex space-x-3">
              <button className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-foreground/70">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185z" />
                </svg>
              </button>
              <button className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-foreground/70">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
