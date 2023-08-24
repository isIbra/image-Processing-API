# Project README

This README provides information about the setup, testing, and functionality of the project.

## Scripts

You can use the following scripts to test, start, and build your application:

1. To run tests:
   ```sh
   npm test
   ```

2. To start the application:
   ```sh
   npm start
   ```

3. To build the application:
   ```sh
   npm run build
   ```

## Endpoints

The project includes the following API endpoint:

### Process Image Endpoint

**Endpoint:** `/process-image`

This endpoint processes and serves images based on the provided parameters.

#### Request Parameters

- `filename` (required): The name of the image file to process.
- `width` (optional): The desired width of the processed image. Default: 300 pixels.
- `height` (optional): The desired height of the processed image. Default: 200 pixels.

#### Example Usage

```http
GET /process-image?filename=image.jpg&width=200&height=150
```

This will process the `image.jpg` with the specified dimensions and respond with the processed image.

## Functionality

The project includes functionality to process and serve images using the `/process-image` endpoint. When a valid request is made, the image is resized, and the processed image is sent as a response. Additionally, the processed image is saved to a designated output directory.
