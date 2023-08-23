"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const sharp_1 = __importDefault(require("sharp"));
const imageProcess_1 = require("./utilities/imageProcess");
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
exports.app = app;
const port = 3000;
const inputFile = './images/original';
const outputFile = './images/processed';
// Mandatory: API endpoint to process and serve images
app.get('/process-image', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filename = req.query.filename;
        const width = parseInt(req.query.width) || 300;
        const height = parseInt(req.query.height) || 200;
        // Check if filename parameter is provided
        if (!filename) {
            res.status(400).send('Missing filename parameter');
            return;
        }
        const imagePath = path_1.default.join(inputFile, filename);
        // Continue processing the image
        processImageAndRespond(imagePath, width, height, res);
    }
    catch (error) {
        console.error('An error occurred:', error);
        res.status(500).send('An error occurred');
    }
}));
// Mandatory: Function to process image and respond
function processImageAndRespond(imagePath, width, height, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const processedImageBuffer = yield (0, imageProcess_1.processImage)(imagePath, width, height);
            // Set response content type and send processed image
            res.set('Content-Type', 'image/jpeg');
            res.send(processedImageBuffer);
            const outputFileName = `processed_${path_1.default.basename(imagePath)}`;
            const outputImagePath = path_1.default.join(outputFile, outputFileName);
            // Save processed image to file
            yield (0, sharp_1.default)(processedImageBuffer).toFile(outputImagePath);
            console.log('Image saved to:', outputImagePath);
        }
        catch (error) {
            // console.error('An error occurred:', error);
            res.status(500).send('An error occurred');
        }
    });
}
// Start the Express server
app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
});
