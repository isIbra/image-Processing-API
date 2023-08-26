import { processImage } from '../../utilities/imageHandler';
import path from 'path';

describe('image handler', () => {
  it('should process an image', async () => {
    const imagePath = path.join(__dirname, '../../../images/original/palmtunnel.jpg');
    console.log('Image Path:', imagePath); // Added this line for debugging
    const width = 200;
    const height = 150;

    const processedImageBuffer = await processImage(imagePath, width, height);

    expect(processedImageBuffer).toBeDefined();
    expect(processedImageBuffer instanceof Buffer).toBeTrue();
  });
});
