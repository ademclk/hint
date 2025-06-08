import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';

// Get the directory name of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

// Paths
const targetImagePath = path.join(root, 'public', 'images', 'series-card.png');

// Check if puppeteer is installed
exec('npm list puppeteer', async (error, stdout) => {
	if (!stdout.includes('puppeteer@')) {
		console.log('Installing puppeteer package...');
		exec('npm install puppeteer', async (err) => {
			if (err) {
				console.error('Failed to install puppeteer:', err);
				return;
			}
			await captureSeriesCard();
		});
	} else {
		await captureSeriesCard();
	}
});

// Capture the series card using puppeteer
async function captureSeriesCard() {
	try {
		console.log('Launching browser to capture series card...');

		const browser = await puppeteer.launch({
			headless: 'new',
			args: ['--no-sandbox', '--disable-setuid-sandbox'],
		});

		const page = await browser.newPage();

		// Set viewport to ensure correct aspect ratio for Farcaster frames (3:2)
		await page.setViewport({
			width: 1200,
			height: 800,
			deviceScaleFactor: 2, // For higher resolution
		});

		// Navigate to the series page
		await page.goto('file://' + path.join(root, 'public', 'aliens-card.html'), {
			waitUntil: 'networkidle0',
		});

		// Take a screenshot
		await page.screenshot({
			path: targetImagePath,
			type: 'png',
			omitBackground: false,
		});

		await browser.close();

		console.log(`Series card captured and saved to: ${targetImagePath}`);
	} catch (error) {
		console.error('Error capturing series card:', error);
	}
}
