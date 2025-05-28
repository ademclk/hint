import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Define __dirname for ES modules
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, '..'); // assuming scripts is one level down from root
const blogDir = path.join(projectRoot, 'src', 'content', 'blog');
const outputFilePath = path.join(projectRoot, 'src', 'blogData.json');

function getBlogPostData() {
  if (!fs.existsSync(blogDir)) {
    console.error(`Error: Blog directory not found at ${blogDir}`);
    process.exit(1);
  }
  const filenames = fs.readdirSync(blogDir);
  const posts = filenames
    .filter(filename => filename.endsWith('.md'))
    .map(filename => {
      const slug = filename.replace(/\.md$/, '');
      const filePath = path.join(blogDir, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);

      let postDate = new Date().toISOString();
      if (data.date) {
        const parsedDate = new Date(data.date);
        if (!isNaN(parsedDate.getTime())) {
          postDate = parsedDate.toISOString();
        }
      }

      return {
        slug,
        title: data.title || 'Untitled Post',
        date: postDate,
        category: data.category || 'Uncategorized',
        author: data.author || 'Anonymous',
        authorRole: data.authorRole || '',
        readTime: data.readTime || 'N/A',
        excerpt: data.excerpt || content.substring(0, 150) + (content.length > 150 ? '...' : ''), // Auto-generate excerpt if missing
        content: content,
      };
    });
  return posts.sort((post1, post2) => (new Date(post2.date).getTime() - new Date(post1.date).getTime()));
}

function generateBlogDataFile() {
  try {
    const srcDir = path.join(projectRoot, 'src');
    if (!fs.existsSync(srcDir)) {
      fs.mkdirSync(srcDir, { recursive: true });
    }
    
    const posts = getBlogPostData();
    fs.writeFileSync(outputFilePath, JSON.stringify(posts, null, 2));
    console.log(`Successfully generated blog data at ${outputFilePath}`);
  } catch (error) {
    console.error('Error generating blog data:', error);
    process.exit(1);
  }
}

generateBlogDataFile();