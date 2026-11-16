const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const sharp = require('sharp');

const pdfPath = '/home/lloyd/.gemini/antigravity/brain/7646d03d-25fb-4210-997f-dfabab74ce62/.user_uploaded/media_1794810160633_0f5f5057.pdf';
const logoSrc = '/home/lloyd/.gemini/antigravity/brain/7646d03d-25fb-4210-997f-dfabab74ce62/.user_uploaded/media_1794809886427_f61288ba.png';
const publicDir = path.resolve(__dirname, '../public');

async function main() {
  console.log('Extracting logo and generating favicons...');
  // Copy original logo
  fs.copyFileSync(logoSrc, path.join(publicDir, 'assets/brand/salama-logo.png'));

  // Generate WebP logo
  await sharp(logoSrc)
    .webp({ quality: 90 })
    .toFile(path.join(publicDir, 'assets/brand/salama-logo.webp'));

  // Generate favicon 32x32, 192x192, 512x512, apple-touch-icon
  await sharp(logoSrc)
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(publicDir, 'favicon.png'));

  await sharp(logoSrc)
    .resize(192, 192, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(publicDir, 'icon-192.png'));

  await sharp(logoSrc)
    .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(publicDir, 'icon-512.png'));

  await sharp(logoSrc)
    .resize(180, 180, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));

  console.log('Favicons and brand icons generated.');

  // Extract PDF streams
  const pdfBuffer = fs.readFileSync(pdfPath);
  const pdfStr = pdfBuffer.toString('latin1');
  const streamRegex = /stream[\r\n]+([\s\S]*?)[\r\n]+endstream/g;

  let match;
  let streamIndex = 0;
  let slideIndex = 1;

  const productNames = [
    'alcef-sb-and-alcef',
    'alphaclav-ds-and-625',
    'glauconil',
    'fixim-400',
    'flucoz-150',
    'glimmet-2',
    'costan-50',
    'costan-h',
    'melkam-15',
    'muscoleve',
    'ketomusc-25'
  ];

  while ((match = streamRegex.exec(pdfStr)) !== null) {
    const streamStart = match.index;
    const header = pdfStr.substring(Math.max(0, streamStart - 400), streamStart);

    if (header.includes('/Subtype /Image') || header.includes('/Image')) {
      const isCMYK = header.includes('/DeviceCMYK');
      const streamData = pdfBuffer.subarray(match.index + match[0].indexOf('\n') + 1, match.index + match[0].lastIndexOf('endstream'));

      try {
        let decompressed;
        if (header.includes('/FlateDecode')) {
          decompressed = zlib.inflateSync(streamData);
        } else {
          decompressed = streamData;
        }

        const outSlidePath = path.join(publicDir, `assets/slides/slide-${String(slideIndex).padStart(2, '0')}.jpg`);
        const outSlideWebp = path.join(publicDir, `assets/slides/slide-${String(slideIndex).padStart(2, '0')}.webp`);

        if (isCMYK) {
          // Sharp converts CMYK JPEG to sRGB automatically!
          await sharp(decompressed)
            .toColourspace('srgb')
            .jpeg({ quality: 85 })
            .toFile(outSlidePath);

          await sharp(decompressed)
            .toColourspace('srgb')
            .webp({ quality: 85 })
            .toFile(outSlideWebp);
        } else {
          await sharp(decompressed)
            .jpeg({ quality: 85 })
            .toFile(outSlidePath);

          await sharp(decompressed)
            .webp({ quality: 85 })
            .toFile(outSlideWebp);
        }

        console.log(`Saved slide-${String(slideIndex).padStart(2, '0')} (CMYK: ${isCMYK})`);

        // If it's one of the product slides (slides 12 to 22)
        if (slideIndex >= 12 && slideIndex <= 22) {
          const prodIdx = slideIndex - 12;
          const prodSlug = productNames[prodIdx];
          
          // Crop the product box (on the left ~50% of the slide)
          // The image is 3508 x 2480 or similar
          const meta = await sharp(outSlidePath).metadata();
          const cropWidth = Math.round(meta.width * 0.48);
          const cropHeight = Math.round(meta.height * 0.85);
          const cropTop = Math.round(meta.height * 0.12);
          const cropLeft = Math.round(meta.width * 0.04);

          await sharp(outSlidePath)
            .extract({ left: cropLeft, top: cropTop, width: cropWidth, height: cropHeight })
            .webp({ quality: 90 })
            .toFile(path.join(publicDir, `assets/products/${prodSlug}.webp`));

          console.log(`  Extracted product box: ${prodSlug}.webp`);
        }

        slideIndex++;
      } catch (err) {
        console.error(`Error processing stream ${streamIndex}:`, err.message);
      }
    }
    streamIndex++;
  }

  console.log(`Successfully extracted ${slideIndex - 1} slides and product assets!`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
