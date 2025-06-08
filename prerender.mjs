import fs from 'fs';
import path from 'path';

// Dynamically import data using a path relative to the script
const seriesDataPath = path.resolve(process.cwd(), 'src/seriesData.json');
const seriesData = JSON.parse(fs.readFileSync(seriesDataPath, 'utf-8'));

// The root of the project for resolving paths
const root = process.cwd();

// The output directory after build
const distPath = path.resolve(root, 'dist');
const template = fs.readFileSync(path.resolve(distPath, 'index.html'), 'utf-8');

// The base URL of the site
const baseUrl = 'https://hint.synerthink.com';

console.log('Starting prerendering...');

seriesData.forEach((post) => {
	// Determine the primary title (use 'en' as default)
	const title = post.title.en || post.title.tr;
	const postUrl = `${baseUrl}/series/${post.id}`;
	const imageUrl = `${baseUrl}/images/quantum-card.svg`;

	const frameMetadata = {
		version: 'next',
		imageUrl: imageUrl,
		button: {
			title: 'Read on HINT',
			action: {
				type: 'launch_frame',
				url: postUrl,
				name: 'HINT',
				splashImageUrl: `${baseUrl}/logo.svg`,
				splashBackgroundColor: '#131313',
			},
		},
	};

	const metaTags = [
		`<meta property="og:title" content="${title}">`,
		`<meta property="og:image" content="${imageUrl}">`,
		`<meta property="fc:frame" content='${JSON.stringify(frameMetadata)}'>`,
		`<meta property="og:url" content="${postUrl}">`,
		`<meta property="og:type" content="article">`,
		`<meta name="twitter:card" content="summary_large_image">`,
	].join('\n        ');

	const html = template.replace('</head>', `${metaTags}\n    </head>`);

	const dirPath = path.resolve(distPath, 'series', post.id);
	if (!fs.existsSync(dirPath)) {
		fs.mkdirSync(dirPath, { recursive: true });
	}

	fs.writeFileSync(path.resolve(dirPath, 'index.html'), html);
	console.log(`Prerendered: /series/${post.id}`);
});

console.log('Prerendering finished.');
