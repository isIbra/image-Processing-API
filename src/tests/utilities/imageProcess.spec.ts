/* eslint-disable no-undef */
import { processImage } from '../../utilities/imageProcess';

describe('imageProcess', () => {
  it('should process an image', async () => {
    const imagePath = '../../../images/original/palmtunnel.jpg';
    const width = 200;
    const height = 150;

    const processedImageBuffer = await processImage(imagePath, width, height);

    expect(processedImageBuffer).toBeDefined();
    expect(processedImageBuffer instanceof Buffer).toBeTrue();
  });
});
