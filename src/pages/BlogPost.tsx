import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
// import { sdk } from '@farcaster/frame-sdk'; // sdk is unused
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import blogPostsData from '../blogData.json';
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

// Function to load a blog post from blogData.json
async function loadBlogPost(slug: string): Promise<BlogPostData | null> {
  try {
    const post = blogPostsData.find(p => p.slug === slug);
    if (post) {
      // Format date if needed, though it's already ISO string from script
      const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      return {
        ...post,
        date: formattedDate,
      };
    }
    console.error(`Blog post with slug '${slug}' not found.`);
    return null;
  } catch (error) {
    console.error('Error loading blog post from JSON:', error);
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
      {/* Header Section */}
      <div className="bg-background pt-20 pb-16"> {/* Increased padding, removed background image/gradient classes */}
        {/* Removed absolute positioned div for gradient */}
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-2xl mx-auto text-center animate-[fade-in_0.8s_ease-out_forwards]"> {/* Centered text, narrower width */}
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{post.category}</span> {/* More subtle category */}
            
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mt-4 mb-8 text-foreground"> {/* Increased title font size, solid text color, adjusted margins */}
              {post.title}
            </h1>
            
            <div className="flex items-center justify-center text-xs text-muted-foreground"> {/* Centered, smaller font for author/date */}
              <div className="flex items-center">
                {/* Removed author avatar circle */}
                <div>
                  <a href="https://farcaster.xyz/ademclk" target="_blank" rel="noopener noreferrer" className="font-medium text-foreground hover:text-primary">{post.author}</a>
                  {/* Removed authorRole span, simplifying display */}
                </div>
              </div>
              <span className="mx-2">·</span> {/* Adjusted spacer */}
              <div className="flex items-center">
                <time>{post.date}</time>
                <span className="mx-2">·</span> {/* Adjusted spacer */}
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article content */}
      <div className="container mx-auto px-6 py-16"> {/* Increased py padding */}
        <div className="max-w-2xl mx-auto"> {/* Centered article column */}
          {/* Main content */}
          <article className="animate-[fade-in_1s_ease-out_0.3s_forwards]"> {/* Removed col-span classes */}
            <div className="article-content"> {/* Removed padding and background from here, will be handled by prose styles or direct element styling */}
              <div className="article-markdown prose prose-lg dark:prose-invert max-w-none text-foreground dark:text-foreground">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({node, ...props}) => <h2 className="text-2xl md:text-3xl font-semibold mt-12 mb-6" {...props} />, // h1 in body styled as h2
                    h2: ({node, ...props}) => <h2 className="text-2xl md:text-3xl font-semibold mt-12 mb-6" {...props} />,
                    h3: ({node, ...props}) => <h3 className="text-xl md:text-2xl font-semibold mt-10 mb-5" {...props} />,
                    p: ({node, ...props}) => <p className="text-base md:text-lg mb-6 leading-loose" {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc list-inside mb-6 pl-4 text-base md:text-lg space-y-2" {...props} />,
                    ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-6 pl-4 text-base md:text-lg space-y-2" {...props} />,
                    li: ({node, ...props}) => <li className="leading-relaxed" {...props} />,
                    blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-primary pl-6 py-2 my-8 italic text-lg md:text-xl" {...props} />,
                    a: ({node, ...props}) => <a className="text-primary hover:underline" {...props} />,
                    // TODO: Add styles for code/pre if needed, though prose should handle basic monospace.
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </div>
            </div>
          </article>
          {/* Author/Date/Read Time metadata could be moved here later if desired */}
        </div>
        <div className="max-w-2xl mx-auto mt-12 text-center"> {/* Centered, narrower width for this section */}
          {/* Removed ContributePanel and its logic */}
          <p className="mb-8 text-muted-foreground">
            Have thoughts on this article? <a href="#" className="text-primary hover:underline">Contribute your perspective</a>.
          </p>
        </div>

        
        <div className="max-w-2xl mx-auto mt-8"> {/* Narrower width */}
          {/* Removed "Cast about this article" button */}
        </div>
       
        
        {/* Article footer */}
        <div className="max-w-2xl mx-auto mt-8 pt-8 border-t border-border"> {/* Narrower width */}
          <div className="flex justify-center items-center"> {/* Centered "Back to Articles" link */}
            <Link 
              to="/blog" 
              className="inline-flex items-center text-primary hover:underline"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1">
                <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
              </svg>
              Back to Articles
            </Link>

            {/* Removed social share buttons */}
          </div>
        </div>
      </div>
    </div>
  );
}
