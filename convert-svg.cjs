const sharp = require('sharp');
const fs = require('fs');

async function convertSvgToPng() {
	try {
		// Read the SVG file
		const svgBuffer = fs.readFileSync('./public/images/episode-2-card.svg');

		// Convert SVG to PNG
		await sharp(svgBuffer)
			.png()
			.resize(1200, 630)
			.toFile('./public/images/episode-2-card.png');

		console.log('✅ Episode 2 PNG card created successfully!');
	} catch (error) {
		console.error('❌ Error converting SVG to PNG:', error);
	}
}

convertSvgToPng();
