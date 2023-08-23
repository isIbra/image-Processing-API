/* eslint-disable no-undef */
import request from 'supertest';
import { app } from '../index';

describe('index', () => {
  it('should respond with processed image', async () => {
    const response = await request(app).get(
      '/process-image?filename=encenadaport.jpg&width=200&height=150',
    );

    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toContain('image/jpeg');
    expect(response.body instanceof Buffer).toBeTrue();
  });

  it('should respond with 400 if filename parameter is missing', async () => {
    const response = await request(app).get('/process-image');

    expect(response.status).toBe(400);
    expect(response.text).toContain('Missing filename parameter');
  });

  it('should respond with 500 on processing error', async () => {
    const response = await request(app).get(
      '/process-image?filename=nonexistent.jpg&width=200&height=150',
    );

    expect(response.status).toBe(500);
    expect(response.text).toContain('An error occurred');
  });
});
