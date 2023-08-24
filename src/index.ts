import express, { Request, Response } from 'express';
import { processImageAndRespond } from './utilities/imageHandler';
import path from 'path';

const app = express();
const port = 3000;

const inputFile = './images/original';

app.get('/process-image', async (req: Request, res: Response): Promise<void> => {
  try {
    const filename: string = req.query.filename as string;
    const width: number = parseInt(req.query.width as string, 10);
    const height: number = parseInt(req.query.height as string, 10);

    console.log('Received:', { filename, width, height }); //debug

    if (!filename) {
      res.status(400).send('Missing filename parameter');
      return;
    }

    const imagePath: string = path.join(inputFile, filename);

    console.log('Image path:', imagePath); //debug

    await processImageAndRespond(imagePath, width, height, res);
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).send('An error occurred');
  }
});

app.listen(port, (): void => {
  console.log(`App listening on http://localhost:${port}`);
});

export { app };
