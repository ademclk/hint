import fs from 'fs';
import path from 'path';

const root = process.cwd();
const distPath = path.resolve(root, 'dist');
const template = fs.readFileSync(path.resolve(distPath, 'index.html'), 'utf-8');
const baseUrl = 'https://hint.synerthink.com';

// Function to get episode-specific image
const getEpisodeImage = (post, pathPrefix) => {
	// For series posts, try to find episode-specific images
	if (pathPrefix === 'series') {
		const id = post.id || post.slug;

		// Map specific episodes to their custom images
		const episodeImageMap = {
			'do-aliens-use-computers': 'series-card.png',
			'imaginary-and-complex-numbers': 'episode-2-card.png',
			// Add more episodes as needed
		};

		if (episodeImageMap[id]) {
			return `${baseUrl}/images/${episodeImageMap[id]}`;
		}

		// For episodes with part numbers, try to find episode-specific images
		if (post.part) {
			const episodeSpecificImage = `episode-${post.part}-card.png`;
			// Check if the file exists (we could make this more robust with actual file checking)
			if (post.part === 2) {
				return `${baseUrl}/images/${episodeSpecificImage}`;
			}
		}
	}

	// Default fallback images
	return pathPrefix === 'series'
		? `${baseUrl}/images/series-card.png`
		: `${baseUrl}/images/series-card.png`; // You might want a different default for blog
};

// Function to create meta tags
const createMetaTags = (title, url, imageUrl) => {
	const frameMetadata = {
		version: 'next',
		imageUrl: imageUrl,
		button: {
			title: 'Read on HINT',
			action: {
				type: 'launch_frame',
				url: url,
				name: 'HINT',
				splashImageUrl: `${baseUrl}/logo.svg`,
				splashBackgroundColor: '#131313',
			},
		},
	};

	return [
		`<meta property="og:title" content="${title}">`,
		`<meta property="og:image" content="${imageUrl}">`,
		`<meta property="fc:frame" content='${JSON.stringify(frameMetadata)}'>`,
		`<meta property="og:url" content="${url}">`,
		`<meta property="og:type" content="article">`,
		`<meta name="twitter:card" content="summary_large_image">`,
	].join('\n        ');
};

// Function to prerender a set of posts
const prerenderPosts = (posts, pathPrefix) => {
	posts.forEach((post) => {
		const id = post.id || post.slug;
		const title = post.title.en || post.title.tr || post.title;
		const postUrl = `${baseUrl}/${pathPrefix}/${id}`;
		const imageUrl = getEpisodeImage(post, pathPrefix);

		// Fix asset paths for nested routes
		// For a path like /series/foo, assets need to be loaded from ../../
		const depth = pathPrefix.split('/').filter(Boolean).length + 1;
		const relativePath = '../'.repeat(depth);
		const fixedTemplate = template.replace(
			/(src|href)="\//g,
			`$1="${relativePath}`
		);

		const metaTags = createMetaTags(title, postUrl, imageUrl);
		const html = fixedTemplate.replace('</head>', `${metaTags}\n    </head>`);

		const dirPath = path.resolve(distPath, pathPrefix, id);
		if (!fs.existsSync(dirPath)) {
			fs.mkdirSync(dirPath, { recursive: true });
		}

		fs.writeFileSync(path.resolve(dirPath, 'index.html'), html);
		console.log(`Prerendered: /${pathPrefix}/${id} with image: ${imageUrl}`);
	});
};

console.log('Starting prerendering...');

// Prerender Series posts
const seriesDataPath = path.resolve(root, 'src/seriesData.json');
const seriesData = JSON.parse(fs.readFileSync(seriesDataPath, 'utf-8'));
prerenderPosts(seriesData, 'series');

// Prerender Blog posts
const blogDataPath = path.resolve(root, 'src/blogData.json');
const blogData = JSON.parse(fs.readFileSync(blogDataPath, 'utf-8'));
prerenderPosts(blogData, 'blog');

console.log('Prerendering finished.');
