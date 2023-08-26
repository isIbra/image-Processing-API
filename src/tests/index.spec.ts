import request from 'supertest';
import { app } from '../index';

describe('Index Suite', () => {
  it('should respond with 400 when filename is missing', async () => {
    const response = await request(app).get('/process-image');
    expect(response.status).toBe(400);
  });

  it('should respond with 400 when width or height is not a valid number', async () => {
    const response = await request(app).get('/process-image?filename=fjord.jpg&width=a&height=200');
    expect(response.status).toBe(400);
  });

  it('should respond with 200 and process image when valid parameters are provided', async () => {
    const response = await request(app).get(
      '/process-image?filename=fjord.jpg&width=300&height=200',
    );
    expect(response.status).toBe(200);
    expect(response.type).toBe('image/jpeg');
  });
});
