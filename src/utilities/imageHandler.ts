import sharp from 'sharp';
import { Response } from 'express';
import path from 'path';

const outputFile = './images/processed';
const imageCache: { [key: string]: Buffer } = {};

export async function processImageAndRespond(
  imagePath: string,
  width: number,
  height: number,
  res: Response,
): Promise<void> {
  try {
    console.log('Processing:', { imagePath, width, height }); //debug

    if (!isValidNumber(width) || !isValidNumber(height)) {
      res.status(400).send('Invalid width or height parameters');
      return;
    }

    const processedImageBuffer: Buffer = await processImage(imagePath, width, height);

    res.set('Content-Type', 'image/jpeg');
    res.send(processedImageBuffer);

    const outputFileName: string = `processed_${path.basename(imagePath)}`;
    const outputImagePath: string = path.join(outputFile, outputFileName);

    await sharp(processedImageBuffer).toFile(outputImagePath);
    console.log('Image saved to:', outputImagePath); //debug
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).send('An error occurred');
  }
}

async function processImage(inputPath: string, width: number, height: number): Promise<Buffer> {
  const cacheKey = `${inputPath}_${width}_${height}`;
  if (imageCache[cacheKey]) {
    return imageCache[cacheKey];
  }

  const processedImageBuffer: Buffer = await sharp(inputPath).resize(width, height).toBuffer();
  imageCache[cacheKey] = processedImageBuffer;

  return processedImageBuffer;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isValidNumber(value: any): boolean {
  return !isNaN(value) && parseInt(value) > 0;
}
