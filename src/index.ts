import express, { Request, Response } from 'express';
import sharp from 'sharp';
import { processImage } from './utilities/imageProcess';
import path from 'path';

const app = express();
const port = 3000;

const inputFile = './images/original';
const outputFile = './images/processed';

// Mandatory: API endpoint to process and serve images
app.get('/process-image', async (req: Request, res: Response) => {
  try {
    const filename = req.query.filename as string;
    const width = parseInt(req.query.width as string) || 300;
    const height = parseInt(req.query.height as string) || 200;

    // Check if filename parameter is provided
    if (!filename) {
      res.status(400).send('Missing filename parameter');
      return;
    }

    const imagePath = path.join(inputFile, filename);

    // Continue processing the image
    processImageAndRespond(imagePath, width, height, res);
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).send('An error occurred');
  }
});

// Mandatory: Function to process image and respond
async function processImageAndRespond(
  imagePath: string,
  width: number,
  height: number,
  res: Response,
) {
  try {
    const processedImageBuffer = await processImage(imagePath, width, height);

    // Set response content type and send processed image
    res.set('Content-Type', 'image/jpeg');
    res.send(processedImageBuffer);

    const outputFileName = `processed_${path.basename(imagePath)}`;
    const outputImagePath = path.join(outputFile, outputFileName);

    // Save processed image to file
    await sharp(processedImageBuffer).toFile(outputImagePath);
    console.log('Image saved to:', outputImagePath);
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).send('An error occurred');
  }
}

// Start the Express server
app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});

export { app };
