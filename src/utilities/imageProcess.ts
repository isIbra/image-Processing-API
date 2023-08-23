import sharp from 'sharp';

export async function processImage(
  inputPath: string,
  width: number,
  height: number,
): Promise<Buffer> {
  const processedImageBuffer = await sharp(inputPath).resize(width, height).toBuffer();

  return processedImageBuffer;
}
