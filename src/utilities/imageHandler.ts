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
    if (!isValidNumber(width) || !isValidNumber(height)) {
      return sendErrorResponse(res, 400, 'Invalid width or height parameters');
    }

    const processedImageBuffer: Buffer = await processImage(imagePath, width, height);

    res.set('Content-Type', 'image/jpeg');
    res.send(processedImageBuffer);

    saveProcessedImage(imagePath, processedImageBuffer);
  } catch (error) {
    console.error('An error occurred:', error);
    sendErrorResponse(res, 500, 'An error occurred');
  }
}

export async function processImage(
  inputPath: string,
  width: number,
  height: number,
): Promise<Buffer> {
  const cacheKey = `${inputPath}_${width}_${height}`;
  if (imageCache[cacheKey]) {
    return imageCache[cacheKey];
  }

  const processedImageBuffer: Buffer = await sharp(inputPath).resize(width, height).toBuffer();
  imageCache[cacheKey] = processedImageBuffer;

  return processedImageBuffer;
}

export function isValidNumber(value: unknown): boolean {
  if (typeof value === 'number') {
    return !isNaN(value) && value > 0;
  }
  return false;
}

async function saveProcessedImage(inputPath: string, buffer: Buffer): Promise<void> {
  const outputFileName: string = `processed_${path.basename(inputPath)}`;
  const outputImagePath: string = path.join(outputFile, outputFileName);

  await sharp(buffer).toFile(outputImagePath);
  console.log('Image saved to:', outputImagePath);
}

function sendErrorResponse(res: Response, statusCode: number, message: string): void {
  res.status(statusCode).send(message);
}
